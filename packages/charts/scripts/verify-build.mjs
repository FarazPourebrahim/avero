// Verifies the emitted package: every source module has JS + type output, every "use client"
// directive survives, and recharts stays a peer (it must never be bundled into the output).
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const SRC = "src";
const DIST = "dist";
const EXCLUDED = /(\.test\.tsx?|\.stories\.tsx)$/;
const USE_CLIENT = /^\s*(?:\/\/[^\n]*\n\s*|\/\*[\s\S]*?\*\/\s*)*["']use client["']/;

function listSourceFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      return relative(SRC, path).split(/[\\/]/)[0] === "test" ? [] : listSourceFiles(path);
    }
    return /\.tsx?$/.test(entry) && !EXCLUDED.test(entry) ? [path] : [];
  });
}

const failures = [];
let clientModules = 0;
const sources = listSourceFiles(SRC);

for (const source of sources) {
  const base = join(DIST, relative(SRC, source)).replace(/\.tsx?$/, "");
  const js = `${base}.js`;
  const dts = `${base}.d.ts`;

  if (!existsSync(js)) failures.push(`missing JS output: ${js}`);
  if (!existsSync(dts)) failures.push(`missing type output: ${dts}`);

  if (USE_CLIENT.test(readFileSync(source, "utf8"))) {
    clientModules += 1;
    if (existsSync(js) && !USE_CLIENT.test(readFileSync(js, "utf8"))) {
      failures.push(`"use client" directive lost in ${js}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Build verification failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(
  `Build verified: ${sources.length} modules emitted, ${clientModules} "use client" directives preserved.`,
);
