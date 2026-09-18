// Generates token data from the single source of truth, src/theme.css:
//   src/generated/tokens.json  – W3C Design Tokens (DTCG) format
//   src/generated/tokens.js    – flat ES module map for runtime use (e.g. chart colors)
//   src/generated/tokens.d.ts  – types for the module
// With --check, it fails when the committed files are out of date instead of writing them.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PACKAGE_DIR = join(dirname(fileURLToPath(import.meta.url)), "..");
const THEME_FILE = join(PACKAGE_DIR, "src", "theme.css");
const OUTPUT_DIR = join(PACKAGE_DIR, "src", "generated");
const CHECK = process.argv.includes("--check");

const GROUPS = [
  { prefix: "--color-", group: "color", type: "color" },
  { prefix: "--font-", group: "fontFamily", type: "fontFamily" },
  { prefix: "--text-", group: "fontSize", type: "dimension" },
  { prefix: "--leading-", group: "lineHeight", type: "number" },
  { prefix: "--radius-", group: "radius", type: "dimension" },
  { prefix: "--shadow-", group: "shadow", type: "shadow" },
  { prefix: "--drop-shadow-", group: "dropShadow", type: "shadow" },
  { prefix: "--blur-", group: "blur", type: "dimension" },
  { prefix: "--animate-", group: "animation", type: "string" },
  { prefix: "--z-", group: "zIndex", type: "number" },
];

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function readCustomProperties(css) {
  const properties = [];
  const withoutKeyframes = css.replace(/@keyframes[\s\S]*?\n {2}\}\n/g, "");
  for (const match of withoutKeyframes.matchAll(/(--[\w.-]+)\s*:\s*([^;]+);/g)) {
    properties.push([match[1], match[2].replace(/\s+/g, " ").trim()]);
  }
  return properties;
}

function toCamelCase(name) {
  return name.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
}

const UTILITIES_FILE = join(PACKAGE_DIR, "src", "utilities.css");

const properties = readCustomProperties(stripComments(readFileSync(THEME_FILE, "utf8")));
const dtcg = {
  $description: "Avero design tokens. Generated from @averoui/tokens/src/theme.css; do not edit.",
};
const flat = {};
// Class-name suffixes per token group, e.g. fontSize: ["4xs", …] → `text-4xs`. Used by tailwind-merge.
const groups = Object.fromEntries(GROUPS.map(({ group }) => [group, []]));

for (const [name, value] of properties) {
  const spec = GROUPS.find(({ prefix }) => name.startsWith(prefix));
  if (!spec) continue;
  const key = name.slice(spec.prefix.length);
  dtcg[spec.group] ??= { $type: spec.type };
  dtcg[spec.group][key] = { $value: value };
  flat[toCamelCase(`${spec.group}-${key}`)] = { cssVar: name, value };
  groups[spec.group].push(key);
}

groups.utility = [
  ...readFileSync(UTILITIES_FILE, "utf8").matchAll(/@utility\s+([\w-]+)\s*\{/g),
].map((match) => match[1]);

const json = `${JSON.stringify(dtcg, null, 2)}\n`;
const js =
  "// Generated from @averoui/tokens/src/theme.css by scripts/generate-token-data.mjs. Do not edit.\n" +
  `export const tokens = ${JSON.stringify(flat, null, 2)};\n\n` +
  `export const tokenGroups = ${JSON.stringify(groups, null, 2)};\n\n` +
  "/** Returns the CSS `var()` reference for a token, for use in style props. */\n" +
  "export function tokenVar(name) {\n  return `var(${tokens[name].cssVar})`;\n}\n";
const dts =
  "// Generated from @averoui/tokens/src/theme.css by scripts/generate-token-data.mjs. Do not edit.\n" +
  "export type TokenName =\n" +
  Object.keys(flat)
    .map((key) => `  | ${JSON.stringify(key)}`)
    .join("\n") +
  ";\n\n" +
  "export type Token = { readonly cssVar: `--${string}`; readonly value: string };\n\n" +
  "export declare const tokens: Readonly<Record<TokenName, Token>>;\n\n" +
  "/** Class-name suffixes per token group (e.g. `fontSize` → `text-<suffix>`), plus Avero `@utility` names. */\n" +
  "export declare const tokenGroups: Readonly<{\n" +
  [...Object.keys(groups)].map((group) => `  ${group}: readonly string[];`).join("\n") +
  "\n}>;\n\n" +
  "/** Returns the CSS `var()` reference for a token, for use in style props. */\n" +
  "export declare function tokenVar(name: TokenName): string;\n";

const outputs = { "tokens.json": json, "tokens.js": js, "tokens.d.ts": dts };

if (CHECK) {
  const stale = Object.entries(outputs)
    .filter(([file, content]) => {
      const path = join(OUTPUT_DIR, file);
      return !existsSync(path) || readFileSync(path, "utf8") !== content;
    })
    .map(([file]) => file);
  if (stale.length > 0) {
    console.error(
      `Token data is out of date (${stale.join(", ")}). Run \`pnpm --filter @averoui/tokens generate\`.`,
    );
    process.exit(1);
  }
  console.log(`Token data is up to date (${Object.keys(flat).length} tokens).`);
} else {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const [file, content] of Object.entries(outputs)) {
    writeFileSync(join(OUTPUT_DIR, file), content);
  }
  console.log(`Generated ${Object.keys(flat).length} tokens into src/generated/.`);
}
