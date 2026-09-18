#!/usr/bin/env node
// Validates every component page against the documentation page template (Avero-plan.md, Phase 11).
// A page is complete only when it carries all twelve template sections; run it before writing a new
// page, and as a gate once every page passes.
//
//   node scripts/check-doc-sections.mjs            report every incomplete page
//   node scripts/check-doc-sections.mjs --rules    report the totals per rule only

import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const DOCS_ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const PAGES_DIR = join(DOCS_ROOT, "content/docs/components");
const REPO_ROOT = resolve(DOCS_ROOT, "../..");

// Packages whose pages need an installation section, because they carry peer dependencies of their
// own (template section 3 is conditional on exactly that).
const PACKAGES_WITH_PEERS = ["@averoui/charts", "@averoui/editor"];

/**
 * The template's sections, in the order it lists them. `heading` is the `##` a page must carry;
 * `rules` are the extra structural checks that section implies.
 */
const TEMPLATE = [
  {
    section: "1. Title and description",
    rules: [
      { id: "title", describe: "frontmatter `title`", test: (page) => Boolean(page.title) },
      {
        id: "description",
        describe: "frontmatter `description`",
        test: (page) => Boolean(page.description),
      },
      {
        id: "view-source",
        describe: "a `[View source](…)` link to a path that exists in the repository",
        test: (page) => page.source.exists,
      },
      {
        id: "import",
        describe: "an import line for the package",
        test: (page) => page.importedPackages.length > 0,
      },
    ],
  },
  {
    section: "2. Primary example",
    rules: [
      {
        id: "primary-demo",
        describe: "a `<ComponentPreview>` above the first section",
        test: (page) => page.previews > 0 && page.previewBeforeFirstHeading,
      },
    ],
  },
  {
    section: "3. Installation",
    rules: [
      {
        id: "installation",
        describe: "an `## Installation` section, because the package has peer dependencies",
        appliesTo: (page) =>
          page.importedPackages.some((name) => PACKAGES_WITH_PEERS.includes(name)),
        test: (page) => page.headings.includes("Installation"),
      },
    ],
  },
  { section: "4. Anatomy", heading: "Anatomy" },
  {
    section: "5. Examples",
    rules: [
      {
        id: "examples",
        describe: "more than one demo, so variants, sizes and states are each shown live",
        test: (page) => page.previews > 1,
      },
    ],
  },
  { section: "6. RTL and locale", heading: "Right-to-left" },
  { section: "7. Composition", heading: "Composition" },
  { section: "8. Accessibility", heading: "Accessibility" },
  {
    section: "9. API reference",
    heading: "API reference",
    rules: [
      {
        id: "props-table",
        describe: "a generated `<PropsTable>` for the props it adds, not a hand-written list",
        // A component that only passes its primitive's props straight through has nothing of its
        // own to generate — a table of one would be hundreds of rows of DOM attributes — so its
        // page describes the underlying props in prose instead.
        appliesTo: (page) => page.source.ownProps,
        test: (page) => /<PropsTable\b/.test(page.body),
      },
    ],
  },
  { section: "10. Theming", heading: "Theming" },
  { section: "11. Do and don't", heading: "Do and don't" },
  { section: "12. Related", heading: "Related" },
];

const REQUIRED_HEADINGS = TEMPLATE.flatMap((entry) => (entry.heading ? [entry.heading] : []));

/** Fenced code can hold anything, `## ` and `<PropsTable>` included, so it never counts as content. */
function withoutCodeFences(body) {
  return body.replace(/^```[\s\S]*?^```/gm, "");
}

/** What a page's "View source" link points at, and whether that component adds props of its own. */
async function readSource(link) {
  const path = link?.split("/tree/dev/")[1];
  if (!path) return { exists: false, ownProps: false };

  const target = join(REPO_ROOT, path);
  const stats = await stat(target).catch(() => undefined);
  if (!stats) return { exists: false, ownProps: false };

  const files = stats.isDirectory()
    ? (await readdir(target)).map((name) => join(target, name))
    : [target];

  for (const file of files.filter((name) => name.endsWith(".tsx"))) {
    if (/export type \w+OwnProps\b/.test(await readFile(file, "utf8"))) {
      return { exists: true, ownProps: true };
    }
  }

  return { exists: true, ownProps: false };
}

async function parsePage(path, source) {
  const frontmatter = /^---\n([\s\S]*?)\n---\n/.exec(source);
  const fields = frontmatter?.[1] ?? "";
  const body = frontmatter ? source.slice(frontmatter[0].length) : source;
  const prose = withoutCodeFences(body);
  const firstHeading = prose.search(/^## /m);
  const firstPreview = prose.search(/<ComponentPreview\b/);

  return {
    path,
    source: await readSource(/\[View source\]\(([^)]+)\)/.exec(prose)?.[1]),
    title: /^title:\s*(\S.*)$/m.exec(fields)?.[1]?.trim(),
    description: /^description:\s*(\S.*)$/m.exec(fields)?.[1]?.trim(),
    body: prose,
    headings: [...prose.matchAll(/^## (.+)$/gm)].map((match) => match[1].trim()),
    previews: [...prose.matchAll(/<ComponentPreview\b/g)].length,
    previewBeforeFirstHeading:
      firstPreview !== -1 && (firstHeading === -1 || firstPreview < firstHeading),
    importedPackages: [...source.matchAll(/from "(@averoui\/[a-z]+)"/g)].map((match) => match[1]),
  };
}

/** Every way the page falls short of the template, in the template's own order. */
function findGaps(page) {
  const gaps = [];

  for (const entry of TEMPLATE) {
    if (entry.heading && !page.headings.includes(entry.heading)) {
      gaps.push({ id: entry.heading, message: `${entry.section}: no \`## ${entry.heading}\`` });
    }

    for (const rule of entry.rules ?? []) {
      if (rule.appliesTo && !rule.appliesTo(page)) continue;
      if (!rule.test(page)) {
        gaps.push({ id: rule.id, message: `${entry.section}: needs ${rule.describe}` });
      }
    }
  }

  const present = REQUIRED_HEADINGS.filter((heading) => page.headings.includes(heading));
  const order = page.headings.filter((heading) => present.includes(heading));
  if (order.join("\n") !== present.join("\n")) {
    gaps.push({
      id: "order",
      message: `Sections are out of template order: ${order.join(" → ")}`,
    });
  }

  return gaps;
}

async function main() {
  const rulesOnly = process.argv.includes("--rules");
  const files = (await readdir(PAGES_DIR)).filter((name) => name.endsWith(".mdx")).sort();

  const incomplete = [];
  const totals = new Map();

  for (const file of files) {
    const path = join(PAGES_DIR, file);
    const page = await parsePage(path, await readFile(path, "utf8"));
    const gaps = findGaps(page);
    if (gaps.length === 0) continue;

    incomplete.push({ page, gaps });
    for (const gap of gaps) {
      totals.set(gap.id, (totals.get(gap.id) ?? 0) + 1);
    }
  }

  if (!rulesOnly) {
    for (const { page, gaps } of incomplete) {
      console.log(`\n${relative(REPO_ROOT, page.path).replaceAll("\\", "/")}`);
      for (const gap of gaps) {
        console.log(`  ✗ ${gap.message}`);
      }
    }
  }

  const complete = files.length - incomplete.length;
  console.log(`\n${complete}/${files.length} component pages match the template.`);

  if (totals.size > 0) {
    console.log("\nGaps by rule:");
    for (const [id, count] of [...totals].sort((a, b) => b[1] - a[1])) {
      console.log(`  ${String(count).padStart(3)}  ${id}`);
    }
  }

  process.exitCode = incomplete.length === 0 ? 0 : 1;
}

await main();
