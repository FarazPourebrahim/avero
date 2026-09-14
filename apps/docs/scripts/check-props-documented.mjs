#!/usr/bin/env node
// Every public prop documented on the site must carry a TSDoc description (Avero-plan.md, Phase 11).
// Props tables are generated from source, so an undocumented prop renders as an empty cell rather
// than failing anything. This turns that silence into a build failure.
//
//   node scripts/check-props-documented.mjs          report every undocumented prop
//   node scripts/check-props-documented.mjs --list   also list the props that are documented

import { createGenerator } from "fumadocs-typescript";
import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const DOCS_ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const CONTENT_DIR = join(DOCS_ROOT, "content/docs");
const REPO_ROOT = resolve(DOCS_ROOT, "../..");

// Mirrors components/PropsTable.tsx: one generator per package, because a generator resolves types
// through exactly one tsconfig.
const PACKAGES = {
  react: "packages/react",
  charts: "packages/charts",
  editor: "packages/editor",
};

const PROPS_TABLE = /<PropsTable\s+([^>]*?)\/>/gs;
const ATTRIBUTE = /(\w+)=(?:"([^"]*)"|\{"([^"]*)"\})/g;

async function* walk(dir) {
  for (const entry of await readdir(dir)) {
    const path = join(dir, entry);
    if ((await stat(path)).isDirectory()) {
      yield* walk(path);
    } else if (entry.endsWith(".mdx")) {
      yield path;
    }
  }
}

/** Collects every `<PropsTable>` call on the site, with the page that asks for it. */
async function collectTables() {
  const tables = [];

  for await (const path of walk(CONTENT_DIR)) {
    const contents = await readFile(path, "utf8");

    for (const [, rawAttributes] of contents.matchAll(PROPS_TABLE)) {
      const attributes = {};
      for (const [, key, quoted, braced] of rawAttributes.matchAll(ATTRIBUTE)) {
        attributes[key] = quoted ?? braced;
      }

      if (!attributes.file || !attributes.name) {
        tables.push({ page: relative(CONTENT_DIR, path), invalid: rawAttributes.trim() });
        continue;
      }

      tables.push({
        page: relative(CONTENT_DIR, path),
        file: attributes.file,
        name: attributes.name,
        package: attributes.package ?? "react",
      });
    }
  }

  return tables;
}

function generatorFor(packageName) {
  const packageDir = PACKAGES[packageName];
  if (!packageDir) {
    return null;
  }

  return createGenerator({ tsconfigPath: join(REPO_ROOT, packageDir, "tsconfig.json") });
}

async function main() {
  const listAll = process.argv.includes("--list");
  const tables = await collectTables();
  const generators = new Map();
  const problems = [];
  let checkedTables = 0;
  let checkedProps = 0;

  for (const table of tables) {
    if (table.invalid) {
      problems.push({ page: table.page, detail: `malformed <PropsTable ${table.invalid} />` });
      continue;
    }

    if (!generators.has(table.package)) {
      generators.set(table.package, generatorFor(table.package));
    }
    const generator = generators.get(table.package);

    if (!generator) {
      problems.push({
        page: table.page,
        detail: `unknown package "${table.package}" (expected one of ${Object.keys(PACKAGES).join(", ")})`,
      });
      continue;
    }

    const sourcePath = join(REPO_ROOT, PACKAGES[table.package], "src", table.file);
    let docs;
    try {
      docs = await generator.generateTypeTable({ path: sourcePath, name: table.name });
    } catch (error) {
      problems.push({
        page: table.page,
        detail: `could not read ${table.name} from ${table.file}: ${error.message}`,
      });
      continue;
    }

    if (docs.length === 0) {
      problems.push({
        page: table.page,
        detail: `${table.name} is not exported from ${table.file}`,
      });
      continue;
    }

    checkedTables += 1;

    for (const doc of docs) {
      for (const entry of doc.entries) {
        checkedProps += 1;
        if (entry.description.trim().length > 0) {
          if (listAll) {
            console.log(`  ok  ${table.name}.${entry.name}`);
          }
          continue;
        }
        problems.push({
          page: table.page,
          detail: `${table.name}.${entry.name} has no TSDoc description (${table.file})`,
        });
      }
    }
  }

  if (problems.length > 0) {
    console.error(`${problems.length} undocumented or unreadable prop(s):\n`);
    const byPage = new Map();
    for (const problem of problems) {
      byPage.set(problem.page, [...(byPage.get(problem.page) ?? []), problem.detail]);
    }
    for (const [page, details] of [...byPage].sort()) {
      console.error(page);
      for (const detail of details) {
        console.error(`  - ${detail}`);
      }
      console.error("");
    }
    console.error("Add a TSDoc comment above each prop in its source file.");
    process.exitCode = 1;
    return;
  }

  console.log(`${checkedProps} props across ${checkedTables} generated tables are documented.`);
}

await main();
