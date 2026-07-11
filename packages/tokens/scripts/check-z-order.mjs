// Phase 6 DoD: the overlay stack has to layer correctly, so the z tokens must increase strictly in
// this order. The reference itself puts drawers and the sticky header on the same layer (z-50),
// which lets a drawer render under a dropdown; Avero raises `--z-drawer` instead (deviation V-10).
import { readFileSync } from "node:fs";

const ORDER = [
  "raised",
  "sticky",
  "dropdown",
  "drawer",
  "overlay",
  "overlay-content",
  "modal",
  "modal-content",
  "modal-nested",
  "popover",
  "top-layer",
  "top-layer-content",
  "toast",
  "max",
];

const css = readFileSync(new URL("../src/theme.css", import.meta.url), "utf8");
const values = new Map();
for (const [, name, value] of css.matchAll(/--z-([a-z-]+):\s*(-?\d+);/g)) {
  values.set(name, Number(value));
}

const problems = [];
let previous = null;

for (const name of ORDER) {
  if (!values.has(name)) {
    problems.push(`--z-${name} is missing from theme.css`);
    continue;
  }
  const value = values.get(name);
  if (previous && value <= previous.value) {
    problems.push(`--z-${name} (${value}) must be above --z-${previous.name} (${previous.value})`);
  }
  previous = { name, value };
}

const unchecked = [...values.keys()].filter((name) => !ORDER.includes(name));
if (unchecked.length > 0) {
  problems.push(`z tokens missing from the layering order: ${unchecked.join(", ")}`);
}

if (problems.length > 0) {
  console.error(`Z-index layering is wrong:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}

console.log(`Z-index layering verified: ${ORDER.length} layers, toast above modal above drawer.`);
