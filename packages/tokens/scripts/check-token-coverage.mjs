// Phase 2 coverage gate: every design value extracted from the reference must map to an Avero token,
// a default Tailwind theme value, or a documented exclusion (a reference defect or a layout one-off).
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PACKAGE_DIR = join(dirname(fileURLToPath(import.meta.url)), "..");
const extracted = JSON.parse(
  readFileSync(join(PACKAGE_DIR, "reference", "tokens.extracted.json"), "utf8"),
);
const themeCss = readFileSync(join(PACKAGE_DIR, "src", "theme.css"), "utf8");
const compatCss = readFileSync(join(PACKAGE_DIR, "src", "compat.css"), "utf8");
const utilitiesCss = readFileSync(join(PACKAGE_DIR, "src", "utilities.css"), "utf8");

// Utility groups whose arbitrary values are one-off layout measurements, not design tokens.
const LAYOUT_GROUPS = new Set([
  "h",
  "w",
  "min-h",
  "min-w",
  "max-h",
  "max-w",
  "p",
  "px",
  "right",
  "aspect",
  "grid-rows",
  "scale",
  "stroke",
  "transition",
  "grayscale",
]);

// Values that are invalid in the reference and render as nothing (plan §6.1).
const DEFECTS = new Map([
  ["shadow|0 0 20px 0 (--shadow)", "R-02: invalid shadow colour, renders no shadow"],
  ["shadow|0 0 20 0 (--shadow)", "R-02: unitless shadow, renders no shadow"],
  ["shadow|0px 2px 20x 0px var(--shadow)", "R-03: `20x` typo, renders no shadow"],
  ["shadow|0 20px 0 0 (--shadow)", "R-02: invalid shadow colour, renders no shadow"],
  ["font|15px", "R-04: invalid font-weight, ignored by the browser"],
]);

const TAILWIND_TEXT_PX = {
  12: "xs",
  14: "sm",
  16: "base",
  18: "lg",
  20: "xl",
  24: "2xl",
  30: "3xl",
};

function normalize(value) {
  return value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*,\s*/g, ",")
    .replace(/\(\s*/g, "(")
    .replace(/\s*\)/g, ")")
    .replace(/\b0px\b/g, "0")
    .replace(/\b0\.(\d)/g, ".$1")
    .trim();
}

function customProperties(css) {
  const properties = new Map();
  for (const match of css.matchAll(/(--[\w.-]+)\s*:\s*([^;]+);/g)) {
    properties.set(match[1], match[2].trim());
  }
  return properties;
}

const avero = customProperties(themeCss);
const compat = customProperties(compatCss);
const tailwindDefaults = new Map(Object.entries(extracted.themeDefaults));
const averoValues = new Set([...avero.values()].map(normalize));
const defaultValues = new Set([...tailwindDefaults.values()].map(normalize));

function resolveReferenceVar(name) {
  const alias = compat.get(name);
  return alias ? alias.replace(/^var\((--[\w-]+)\)$/, "$1") : null;
}

function isColorCovered(color) {
  const value = normalize(color);
  if (value.startsWith("--") || value.startsWith("var(") || value.startsWith("(")) {
    const name = value.replace(/^var\(|^\(|\)$/g, "");
    return avero.has(name) || compat.has(name);
  }
  return averoValues.has(value) || defaultValues.has(value);
}

const zLayerValues = new Set(
  [...avero.entries()].filter(([name]) => name.startsWith("--z-")).map(([, value]) => value),
);

function substituteReferenceVars(value) {
  return value.replace(/var\((--[\w-]+)\)/g, (whole, name) => {
    const target = resolveReferenceVar(name);
    return target ? `var(${target})` : whole;
  });
}

function isShadowCovered(value) {
  const normalized = normalize(substituteReferenceVars(value));
  return averoValues.has(normalized) || defaultValues.has(normalized);
}

function pxToRem(px) {
  return `${Number(px) / 16}rem`;
}

function isTextSizeCovered(value) {
  const px = value.match(/^(\d+(?:\.\d+)?)px$/)?.[1];
  if (!px) return false;
  if (TAILWIND_TEXT_PX[px]) return true;
  return averoValues.has(normalize(pxToRem(px)));
}

const failures = [];
const exclusions = [];
let covered = 0;

function record(ok, label) {
  if (ok) covered += 1;
  else failures.push(label);
}

// 1. Brand and hero variables: every reference variable has a compat alias whose target holds the same value.
for (const [name, value] of Object.entries({ ...extracted.brand, ...extracted.hero })) {
  const target = resolveReferenceVar(name);
  const targetValue = target ? avero.get(target) : undefined;
  record(
    Boolean(targetValue) && normalize(targetValue) === normalize(value),
    `reference var ${name}: ${value} (alias -> ${target ?? "missing"}, value ${targetValue ?? "missing"})`,
  );
}

// 2. Keyframes: every custom keyframe is defined by Avero (Tailwind defaults ship with Tailwind).
for (const name of Object.keys(extracted.keyframes)) {
  if (["spin", "ping", "pulse", "bounce"].includes(name)) {
    covered += 1;
    continue;
  }
  record(new RegExp(`@keyframes ${name}\\s*\\{`).test(themeCss), `keyframe ${name}`);
}

// 3. Custom animation, scrollbar and effect classes map to Avero utilities.
const CUSTOM_CLASS_MAP = {
  ".animate-slide-up": "--animate-slide-up",
  ".animate-fade-in": "--animate-fade-in",
  ".animate-fade": "--animate-fade",
  ".animate-blink": "--animate-blink",
  ".animate-sway": "--animate-sway",
  ".typing-effect,.animate-blink-caret": "--animate-blink-caret",
  ".animate-typing-left": "--animate-typing-left",
  ".animate-typing-right": "--animate-typing-right",
  ".animate-steam": "--animate-steam",
  ".animate-leaf-sway": "--animate-leaf-sway",
  ".animate-leaf-sway-alt": "--animate-leaf-sway-alt",
  ".animate-monitor-glow": "--animate-monitor-glow",
  ".fancy-scroll": "@utility scrollbar-fancy",
  ".comment-scroll::-webkit-scrollbar": "@utility scrollbar-slim",
  ".scrollbar-hide": "@utility scrollbar-hidden",
  ".no-scrollbar": "@utility scrollbar-hidden",
  ".skeleton-shimmer": "@utility skeleton-shimmer",
  ".premium-glow-ring": "@utility glow-ring",
};
for (const [selector, token] of Object.entries(CUSTOM_CLASS_MAP)) {
  const exists = token.startsWith("@utility") ? utilitiesCss.includes(token) : avero.has(token);
  record(
    Boolean(extracted.customRules[selector]) && exists,
    `custom class ${selector} -> ${token}`,
  );
}

// 4. Arbitrary values.
for (const [group, values] of Object.entries(extracted.arbitraryValues)) {
  for (const value of values) {
    const key = `${group}|${value}`;
    if (DEFECTS.has(key)) {
      exclusions.push(`${key} (${DEFECTS.get(key)})`);
      continue;
    }
    if (LAYOUT_GROUPS.has(group)) {
      exclusions.push(`${key} (layout one-off)`);
      continue;
    }

    const bare = value.replace(/ \/ \d+%$/, "");
    let ok;
    switch (group) {
      case "shadow":
        // `shadow-(--primary)/20` sets the shadow colour, not the shadow itself.
        ok = bare.startsWith("--") ? isColorCovered(bare) : isShadowCovered(bare);
        break;
      case "drop-shadow":
        ok = averoValues.has(normalize(bare));
        break;
      case "blur":
      case "backdrop-blur":
        ok = averoValues.has(normalize(bare)) || defaultValues.has(normalize(bare));
        break;
      case "leading":
        ok = averoValues.has(normalize(bare)) || defaultValues.has(normalize(bare));
        break;
      case "rounded":
      case "rounded-br":
      case "rounded-tl":
        ok = averoValues.has(normalize(pxToRem(bare.replace("px", ""))));
        break;
      case "z":
        ok = zLayerValues.has(bare);
        break;
      case "text":
        ok = isTextSizeCovered(bare) || isColorCovered(bare);
        break;
      case "border":
        ok = /^\d+px$/.test(bare)
          ? (exclusions.push(`${key} (border width)`), null)
          : isColorCovered(bare);
        break;
      case "bg":
        ok = bare.startsWith("radial-gradient")
          ? (exclusions.push(`${key} (one-off decorative gradient)`), null)
          : isColorCovered(bare);
        break;
      default:
        ok = isColorCovered(bare);
    }
    if (ok === null) continue;
    record(ok, `arbitrary ${key}`);
  }
}

// 5. Font faces: every reference weight is declared by @avero/font.
const fontCss = readFileSync(join(PACKAGE_DIR, "..", "font", "src", "lahzeh.css"), "utf8");
const WEIGHT_NAMES = { normal: "400", bold: "700" };
for (const face of extracted.fontFaces) {
  const weight = WEIGHT_NAMES[face.weight] ?? face.weight;
  record(new RegExp(`font-weight:\\s*${weight};`).test(fontCss), `font weight ${face.weight}`);
}

const total = covered + failures.length;
console.log(
  `Token coverage: ${covered}/${total} values mapped (${exclusions.length} documented exclusions).`,
);
if (process.argv.includes("--verbose")) {
  console.log(`Exclusions:\n  ${exclusions.join("\n  ")}`);
}
if (failures.length > 0) {
  console.error(`Unmapped values:\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
