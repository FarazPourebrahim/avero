#!/usr/bin/env node
// Every internal documentation link must resolve (Avero-plan.md, Phase 11). Fumadocs renders a
// broken relative link as ordinary markup, so nothing fails today; this turns that into an error.
// External URLs are not fetched — the build stays offline and deterministic.
//
//   node scripts/check-links.mjs

import { readdir, readFile, stat } from "node:fs/promises";
import { join, posix, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const DOCS_ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const CONTENT_DIR = join(DOCS_ROOT, "content/docs");
const DOCS_ROUTE = "/docs";

const MARKDOWN_LINK = /\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
const JSX_HREF = /href=(?:"([^"]+)"|\{"([^"]+)"\})/g;
const CODE_FENCE = /```[\s\S]*?```|`[^`\n]*`/g;
const HEADING = /^#{1,6}\s+(.+?)\s*$/gm;

/** GitHub-style heading slug, which is what Fumadocs generates for anchors. */
function slugify(heading) {
  return heading
    .replace(/`/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

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

/** Maps a content file to the URL it is served at. */
function urlFor(file) {
  const rel = relative(CONTENT_DIR, file)
    .split(sep)
    .join("/")
    .replace(/\.mdx$/, "");
  return rel === "index" ? DOCS_ROUTE : posix.join(DOCS_ROUTE, rel.replace(/\/index$/, ""));
}

async function loadPages() {
  const pages = new Map();

  for await (const file of walk(CONTENT_DIR)) {
    const contents = await readFile(file, "utf8");
    const anchors = new Set([...contents.matchAll(HEADING)].map(([, heading]) => slugify(heading)));
    pages.set(urlFor(file), { file, anchors });
  }

  return pages;
}

function collectLinks(contents) {
  // Links inside code samples are illustrations, not navigation.
  const prose = contents.replace(CODE_FENCE, "");
  const links = [];

  for (const [, target] of prose.matchAll(MARKDOWN_LINK)) {
    links.push(target);
  }
  for (const [, quoted, braced] of prose.matchAll(JSX_HREF)) {
    links.push(quoted ?? braced);
  }

  return links;
}

function isExternal(target) {
  return /^(?:[a-z]+:|\/\/)/i.test(target);
}

async function main() {
  const pages = await loadPages();
  const problems = [];
  let checked = 0;

  for (const [url, page] of pages) {
    const contents = await readFile(page.file, "utf8");
    const pageDir = posix.dirname(url === DOCS_ROUTE ? `${DOCS_ROUTE}/index` : url);

    for (const target of collectLinks(contents)) {
      if (isExternal(target)) {
        continue;
      }
      checked += 1;

      const [rawPath = "", anchor] = target.split("#");
      const resolved =
        rawPath === ""
          ? url
          : rawPath.startsWith("/")
            ? posix.normalize(rawPath)
            : posix.normalize(posix.join(pageDir, rawPath));
      const destination = resolved.replace(/\/$/, "");

      const targetPage = pages.get(destination);
      if (!targetPage) {
        problems.push({ page: url, detail: `${target} → no page at ${destination}` });
        continue;
      }

      if (anchor && !targetPage.anchors.has(anchor)) {
        problems.push({
          page: url,
          detail: `${target} → ${destination} has no heading #${anchor}`,
        });
      }
    }
  }

  if (problems.length > 0) {
    console.error(`${problems.length} broken internal link(s):\n`);
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
    process.exitCode = 1;
    return;
  }

  console.log(`${checked} internal links across ${pages.size} pages resolve.`);
}

await main();
