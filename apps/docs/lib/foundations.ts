import { tokens } from "@avero/tokens";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

// Data for the Foundations pages. Avero's own tokens come from @avero/tokens; Tailwind's default
// scales are read from the installed tailwindcss/theme.css, so the pages always show what a
// consumer actually gets. Nothing here is written by hand.

export type TokenSource = "avero" | "tailwind";

export type ThemeVariable = {
  /** Name without the group prefix, e.g. `primary` for `--color-primary`. */
  name: string;
  cssVar: string;
  value: string;
  source: TokenSource;
};

const tailwindThemeCss = readFileSync(
  createRequire(join(process.cwd(), "package.json")).resolve("tailwindcss/theme.css"),
  "utf8",
);

function tailwindVariables(prefix: string): ThemeVariable[] {
  const pattern = new RegExp(`^\\s*(--${prefix}-([\\w.-]+))\\s*:\\s*([^;]+);`, "gm");
  return [...tailwindThemeCss.matchAll(pattern)]
    .filter((match) => !match[2]!.includes("--"))
    .map((match) => ({
      name: match[2]!,
      cssVar: match[1]!,
      value: match[3]!.trim(),
      source: "tailwind" as const,
    }));
}

function averoVariables(prefix: string): ThemeVariable[] {
  return Object.values(tokens)
    .filter((token) => token.cssVar.startsWith(`--${prefix}-`))
    .map((token) => ({
      name: token.cssVar.slice(prefix.length + 3),
      cssVar: token.cssVar,
      value: token.value,
      source: "avero" as const,
    }));
}

/** Pixel size of a `rem` value at the default 16px root, or `null` for anything else. */
export function remToPx(value: string): number | null {
  const match = value.match(/^([\d.]+)rem$/);
  return match ? Number(match[1]) * 16 : null;
}

function byPx<T extends ThemeVariable>(items: T[]): T[] {
  return [...items].sort((a, b) => (remToPx(a.value) ?? 0) - (remToPx(b.value) ?? 0));
}

// ---------------------------------------------------------------- Colour and contrast

type Rgba = { r: number; g: number; b: number; a: number };

export type ColorToken = ThemeVariable & {
  /** Resolved sRGB hex, including an alpha pair when translucent. */
  hex: string;
  /** Contrast against white, or `null` when the colour is translucent. */
  onSurface: number | null;
  /** Contrast against the page background, or `null` when the colour is translucent. */
  onBackground: number | null;
};

function parseHex(hex: string): Rgba {
  const digits = hex.slice(1);
  const full = digits.length <= 4 ? [...digits].map((char) => char + char).join("") : digits;
  const channel = (index: number) => parseInt(full.slice(index, index + 2), 16);
  return {
    r: channel(0),
    g: channel(2),
    b: channel(4),
    a: full.length === 8 ? channel(6) / 255 : 1,
  };
}

/** Converts `oklch(L% C H)` to sRGB, clamping out-of-gamut channels. */
function parseOklch(value: string): Rgba | null {
  const match = value.match(/^oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)/);
  if (!match) return null;
  const lightness = Number(match[1]) / 100;
  const chroma = Number(match[2]);
  const hue = (Number(match[3]) * Math.PI) / 180;
  const a = chroma * Math.cos(hue);
  const b = chroma * Math.sin(hue);

  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;

  const toSrgb = (linear: number) => {
    const clamped = Math.min(1, Math.max(0, linear));
    const encoded = clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * clamped ** (1 / 2.4) - 0.055;
    return Math.round(encoded * 255);
  };
  return {
    r: toSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    g: toSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    b: toSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
    a: 1,
  };
}

const tailwindColors = new Map(tailwindVariables("color").map((color) => [color.cssVar, color]));
const averoColors = averoVariables("color");

function resolveColor(value: string): Rgba | null {
  const alias = value.match(/^var\((--[\w-]+)\)$/)?.[1];
  if (alias) {
    const target = averoColors.find((color) => color.cssVar === alias) ?? tailwindColors.get(alias);
    return target ? resolveColor(target.value) : null;
  }
  if (value.startsWith("#")) return parseHex(value);
  return parseOklch(value);
}

function toHex({ r, g, b, a }: Rgba): string {
  const pair = (channel: number) => Math.round(channel).toString(16).padStart(2, "0");
  return `#${pair(r)}${pair(g)}${pair(b)}${a < 1 ? pair(a * 255) : ""}`;
}

function luminance({ r, g, b }: Rgba): number {
  const linear = (channel: number) => {
    const srgb = channel / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

function contrast(foreground: Rgba, background: Rgba): number {
  const [light, dark] = [luminance(foreground), luminance(background)].sort((x, y) => y - x);
  return (light! + 0.05) / (dark! + 0.05);
}

const SURFACE: Rgba = { r: 255, g: 255, b: 255, a: 1 };
const PAGE_BACKGROUND = resolveColor(tokens.colorBackground.value)!;

const COLOR_GROUPS: ReadonlyArray<{ title: string; matches: (name: string) => boolean }> = [
  { title: "Brand", matches: (name) => /^(primary|secondary)/.test(name) },
  {
    title: "Page and surfaces",
    matches: (name) => /^(background|foreground|surface|border)/.test(name),
  },
  { title: "Text and icons", matches: (name) => /^(text|icon|accent)/.test(name) },
  { title: "Status", matches: (name) => name.startsWith("warning") },
  { title: "Shadow colours", matches: (name) => name.startsWith("shadow") },
  { title: "Charts", matches: (name) => name.startsWith("chart") },
];

export function colorGroups(): Array<{ title: string; colors: ColorToken[] }> {
  const colors = averoColors.map((color): ColorToken => {
    const rgba = resolveColor(color.value);
    if (!rgba) throw new Error(`Cannot resolve colour token ${color.cssVar}`);
    const opaque = rgba.a === 1;
    return {
      ...color,
      hex: toHex(rgba),
      onSurface: opaque ? contrast(rgba, SURFACE) : null,
      onBackground: opaque ? contrast(rgba, PAGE_BACKGROUND) : null,
    };
  });

  const groups = COLOR_GROUPS.map((group) => ({
    title: group.title,
    colors: colors.filter((color) => group.matches(color.name)),
  }));
  const grouped = new Set(groups.flatMap((group) => group.colors));
  const ungrouped = colors.filter((color) => !grouped.has(color));
  if (ungrouped.length > 0) groups.push({ title: "Other", colors: ungrouped });
  return groups.filter((group) => group.colors.length > 0);
}

// ---------------------------------------------------------------- Typography

export type SizedVariable = ThemeVariable & { px: number | null };

export function fontFamilies(): ThemeVariable[] {
  return averoVariables("font");
}

export function typeScale(): SizedVariable[] {
  const sizes = [...tailwindVariables("text"), ...averoVariables("text")];
  return byPx(sizes).map((size) => ({ ...size, px: remToPx(size.value) }));
}

export function lineHeights(): ThemeVariable[] {
  return averoVariables("leading");
}

// ---------------------------------------------------------------- Radius, elevation, blur

export function radiusScale(): SizedVariable[] {
  const radii = [...tailwindVariables("radius"), ...averoVariables("radius")];
  return byPx(radii).map((radius) => ({ ...radius, px: remToPx(radius.value) }));
}

export function shadowScale(kind: "shadow" | "drop-shadow"): ThemeVariable[] {
  return [...tailwindVariables(kind), ...averoVariables(kind)];
}

export function blurScale(): ThemeVariable[] {
  return averoVariables("blur");
}

// ---------------------------------------------------------------- Motion

export type AnimationToken = ThemeVariable & { keyframes: string };

export function animationTokens(): AnimationToken[] {
  return averoVariables("animate").map((animation) => ({
    ...animation,
    keyframes: animation.value.split(/\s+/)[0]!,
  }));
}

export function easings(): ThemeVariable[] {
  return tailwindVariables("ease");
}

// ---------------------------------------------------------------- Layers and breakpoints

export function zIndexLayers(): ThemeVariable[] {
  return averoVariables("z").sort((a, b) => Number(a.value) - Number(b.value));
}

export function breakpoints(): SizedVariable[] {
  return byPx(tailwindVariables("breakpoint")).map((breakpoint) => ({
    ...breakpoint,
    px: remToPx(breakpoint.value),
  }));
}
