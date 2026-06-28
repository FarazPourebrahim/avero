// Phase 2 contrast report: computes WCAG 2.2 contrast ratios for every text/background pairing the
// reference uses (plan §5, §7) and writes packages/tokens/reference/contrast-report.md.
// Translucent colors are composited over their backdrop before measuring.
// Failures are reported, not fatal: decision O-04 keeps the reference look and documents them.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PACKAGE_DIR = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_FILE = join(PACKAGE_DIR, "reference", "contrast-report.md");

const extracted = JSON.parse(
  readFileSync(join(PACKAGE_DIR, "reference", "tokens.extracted.json"), "utf8"),
);
const themeCss = readFileSync(join(PACKAGE_DIR, "src", "theme.css"), "utf8");

const averoColors = new Map(
  [...themeCss.matchAll(/(--color-[\w-]+)\s*:\s*([^;]+);/g)].map((match) => [
    match[1],
    match[2].trim(),
  ]),
);

// WCAG thresholds.
const REQUIRED = { normal: 4.5, large: 3, ui: 3 };

/** Every foreground/background pairing used by Tier A components, with where it appears. */
const PAIRS = [
  // Page chrome
  { fg: "foreground", bg: "background", size: "normal", where: "Body text on the page background" },
  { fg: "text-chrome", bg: "background", size: "normal", where: "Footer link chips" },
  { fg: "text-chrome", bg: "surface-muted", size: "normal", where: "Footer accordions" },
  { fg: "text-subtle", bg: "surface-muted", size: "normal", where: "Footer about strip" },
  { fg: "text-strong", bg: "background", size: "large", where: "Footer headings" },
  { fg: "icon-muted", bg: "surface-muted", size: "ui", where: "Footer social icons (resting)" },
  { fg: "accent-social", bg: "surface-muted", size: "ui", where: "Footer social icons (hover)" },
  { fg: "gray-600", bg: "white", size: "normal", where: "Header navigation links" },
  // Cards and content
  { fg: "gray-700", bg: "white", size: "normal", where: "Article body text" },
  { fg: "gray-800", bg: "white", size: "large", where: "Card headings" },
  { fg: "gray-500", bg: "white", size: "normal", where: "Meta text, descriptions" },
  { fg: "gray-500", bg: "gray-50", size: "normal", where: "Article meta bar" },
  { fg: "text-muted", bg: "white", size: "normal", where: "Muted meta text (gray-400)" },
  { fg: "slate-400", bg: "white", size: "normal", where: "Profile meta text" },
  { fg: "slate-500", bg: "white", size: "normal", where: "Stat tile labels" },
  { fg: "slate-600", bg: "slate-100", size: "normal", where: "Social icon buttons, location pill" },
  { fg: "zinc-600", bg: "zinc-50", size: "ui", where: "Dashboard chrome icon buttons" },
  { fg: "zinc-600", bg: "white", size: "normal", where: "Dashboard sidebar items" },
  { fg: "indigo-600", bg: "white", size: "normal", where: "Prose links" },
  { fg: "primary", bg: "white", size: "normal", where: "Listing titles, price" },
  {
    fg: "primary",
    bg: "surface-glass",
    backdrop: "background",
    size: "normal",
    where: "Glass listing card title",
  },
  {
    fg: "gray-500",
    bg: "surface-glass",
    backdrop: "background",
    size: "normal",
    where: "Glass listing card excerpt",
  },
  // Buttons
  { fg: "white", bg: "primary", size: "normal", where: "Primary button" },
  { fg: "white", bg: "primary-hover", size: "normal", where: "Primary button (hover)" },
  { fg: "white", bg: "secondary", size: "normal", where: "Secondary (orange) button" },
  { fg: "white", bg: "warning", size: "normal", where: "Warning button" },
  { fg: "slate-700", bg: "slate-100", size: "normal", where: "Soft neutral button" },
  { fg: "sky-600", bg: "sky-50", size: "normal", where: "Soft sky button (Telegram)" },
  { fg: "emerald-600", bg: "emerald-50", size: "normal", where: "Soft emerald button (WhatsApp)" },
  { fg: "blue-600", bg: "blue-50", size: "normal", where: "Soft blue button / icon tile" },
  { fg: "rose-600", bg: "rose-50", size: "normal", where: "Soft rose button (report)" },
  { fg: "red-600", bg: "red-50", size: "normal", where: "Soft red button (like)" },
  { fg: "purple-700", bg: "purple-50", size: "normal", where: "Soft purple button (certificate)" },
  { fg: "white", bg: "blue-600", size: "normal", where: "Active profile tab" },
  // Badges and chips
  { fg: "green-700", bg: "green-100", size: "normal", where: "Success status badge" },
  { fg: "red-700", bg: "red-100", size: "normal", where: "Danger status badge" },
  { fg: "gray-600", bg: "gray-100", size: "normal", where: "Category chip" },
  { fg: "indigo-600", bg: "indigo-50", size: "normal", where: "Outline indigo badge" },
  { fg: "emerald-700", bg: "emerald-50", size: "normal", where: "Outline emerald badge" },
  { fg: "amber-700", bg: "amber-50", size: "normal", where: "Outline amber badge" },
  { fg: "blue-700", bg: "blue-50", size: "normal", where: "Skill chip" },
  { fg: "slate-600", bg: "slate-100", size: "normal", where: "Mini technology chip" },
  { fg: "white", bg: "red-500", size: "normal", where: "Solid danger badge" },
  // Dark surfaces
  { fg: "cyan-400", bg: "slate-900", size: "normal", where: "Eyebrow on the dark banner" },
  { fg: "slate-300", bg: "slate-900", size: "normal", where: "Body text on the dark banner" },
  {
    fg: "white",
    bg: "black/60",
    backdrop: "slate-400",
    size: "normal",
    where: "Media overlay badge",
  },
];

function resolveColor(name) {
  if (name === "white") return "#ffffff";
  if (name === "black") return "#000000";
  const [base, alpha] = name.split("/");
  const token = averoColors.get(`--color-${base}`);
  let value = token ?? extracted.themeDefaults[`--color-${base}`];
  if (!value) throw new Error(`Unknown color: ${name}`);
  const reference = value.match(/^var\((--color-[\w-]+)\)$/)?.[1];
  if (reference) value = resolveColor(reference.slice("--color-".length));
  return alpha ? withAlpha(value, Number(alpha) / 100) : value;
}

function parseHex(hex) {
  const digits = hex.replace("#", "");
  const full =
    digits.length <= 4
      ? [...digits].map((char) => char + char).join("")
      : digits.padEnd(8, "f").slice(0, 8);
  const channels = [0, 2, 4, 6].map((index) => parseInt(full.slice(index, index + 2), 16));
  return { r: channels[0], g: channels[1], b: channels[2], a: channels[3] / 255 };
}

function withAlpha(hex, alpha) {
  const { r, g, b } = parseHex(hex);
  const toHex = (value) => Math.round(value).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha * 255)}`;
}

function composite(color, backdrop) {
  const top = parseHex(color);
  const bottom = parseHex(backdrop);
  const mix = (a, b) => a * top.a + b * (1 - top.a);
  return { r: mix(top.r, bottom.r), g: mix(top.g, bottom.g), b: mix(top.b, bottom.b), a: 1 };
}

function luminance({ r, g, b }) {
  const channel = (value) => {
    const srgb = value / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(fg, bg) {
  const [light, dark] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

const rows = PAIRS.map((pair) => {
  const backdrop = resolveColor(pair.backdrop ?? "white");
  const background = composite(resolveColor(pair.bg), backdrop);
  const backgroundHex = withAlpha(
    `#${[background.r, background.g, background.b].map((value) => Math.round(value).toString(16).padStart(2, "0")).join("")}`,
    1,
  );
  const foreground = composite(resolveColor(pair.fg), backgroundHex);
  const ratio = contrast(foreground, background);
  const required = REQUIRED[pair.size];
  return { ...pair, ratio, required, pass: ratio >= required };
});

const failures = rows.filter((row) => !row.pass);
const table = rows
  .map(
    (row) =>
      `| ${row.where} | \`${row.fg}\` on \`${row.bg}\`${row.backdrop ? ` (over \`${row.backdrop}\`)` : ""} | ${row.size} | ${row.ratio.toFixed(2)} | ${row.required} | ${row.pass ? "✅" : "❌"} |`,
  )
  .join("\n");

const report = `# Contrast report

Generated by \`packages/tokens/scripts/contrast-report.mjs\`. Do not edit by hand.

WCAG 2.2 AA thresholds: 4.5:1 for normal text, 3:1 for large text (≥ 24px, or ≥ 18.66px bold) and UI graphics.
Translucent colors are composited over their backdrop before measuring.

**Result:** ${rows.length - failures.length}/${rows.length} pairings pass. ${failures.length} fail AA.

Per decision O-04, Avero keeps the reference's look by default. Consumers who need strict AA can override
\`--color-text-muted\` (and the other tokens below) in their theme.

| Where | Pairing | Size | Ratio | Required | AA |
| --- | --- | --- | --- | --- | --- |
${table}
`;

writeFileSync(OUTPUT_FILE, report);
console.log(
  `Contrast report: ${rows.length - failures.length}/${rows.length} pairings pass AA. ` +
    (failures.length ? `Failing: ${failures.map((row) => row.where).join("; ")}.` : ""),
);
