#!/usr/bin/env node
// Every live example on the site is a real .tsx file under demos/, which the docs tsconfig compiles
// and CI type-checks (Avero-plan.md, Phase 11). That guarantee only holds while the registry, the
// files on disk and the pages agree, so this checks all three.
//
//   node scripts/check-demos.mjs

import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const DOCS_ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const DEMOS_DIR = join(DOCS_ROOT, "demos");
const CONTENT_DIR = join(DOCS_ROOT, "content/docs");
const REGISTRY = join(DEMOS_DIR, "registry.ts");

const REGISTRY_ENTRY = /^\s*"([^"]+)":\s*\w+,?\s*$/gm;
const PREVIEW = /<ComponentPreview\s+name="([^"]+)"/g;

async function* walk(dir, extension) {
  for (const entry of await readdir(dir)) {
    const path = join(dir, entry);
    if ((await stat(path)).isDirectory()) {
      yield* walk(path, extension);
    } else if (entry.endsWith(extension)) {
      yield path;
    }
  }
}

async function main() {
  const registry = new Set(
    [...(await readFile(REGISTRY, "utf8")).matchAll(REGISTRY_ENTRY)].map(([, name]) => name),
  );

  const files = new Set();
  for await (const path of walk(DEMOS_DIR, ".tsx")) {
    files.add(
      relative(DEMOS_DIR, path)
        .split(sep)
        .join("/")
        .replace(/\.tsx$/, ""),
    );
  }

  const used = new Map();
  for await (const page of walk(CONTENT_DIR, ".mdx")) {
    const contents = await readFile(page, "utf8");
    for (const [, name] of contents.matchAll(PREVIEW)) {
      used.set(name, relative(CONTENT_DIR, page));
    }
  }

  const problems = [];

  for (const name of registry) {
    if (!files.has(name)) {
      problems.push(`registry entry "${name}" has no demos/${name}.tsx`);
    }
  }
  for (const name of files) {
    if (!registry.has(name)) {
      problems.push(`demos/${name}.tsx is not in the registry, so nothing renders it`);
    }
  }
  for (const [name, page] of used) {
    if (!registry.has(name)) {
      problems.push(`${page} previews "${name}", which is not in the registry`);
    }
  }

  if (problems.length > 0) {
    console.error(`${problems.length} demo registry problem(s):\n`);
    for (const problem of problems.sort()) {
      console.error(`  - ${problem}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `${registry.size} live demos are registered, present on disk and type-checked with the app.`,
  );
}

await main();
