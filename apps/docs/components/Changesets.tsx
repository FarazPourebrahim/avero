import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const CHANGESET_DIR = join(process.cwd(), "..", "..", ".changeset");

type Bump = "major" | "minor" | "patch";

type Change = {
  packages: ReadonlyArray<{ name: string; bump: Bump }>;
  summary: string;
};

const BUMP_ORDER: Record<Bump, number> = { major: 0, minor: 1, patch: 2 };

const BUMP_STYLES: Record<Bump, string> = {
  major: "bg-fd-primary/10 text-fd-primary",
  minor: "bg-fd-accent text-fd-accent-foreground",
  patch: "bg-fd-muted text-fd-muted-foreground",
};

/** Parses the YAML-ish front matter of a changeset: package names mapped to their bump. */
function parseChangeset(contents: string): Change | null {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(contents.trim());
  if (!match) {
    return null;
  }

  const [, frontMatter = "", summary = ""] = match;
  const packages = frontMatter
    .split(/\r?\n/)
    .map((line) => /^"([^"]+)":\s*(major|minor|patch)\s*$/.exec(line.trim()))
    .filter((entry) => entry !== null)
    .map((entry) => ({ name: entry[1] as string, bump: entry[2] as Bump }));

  if (packages.length === 0) {
    return null;
  }

  return { packages, summary: summary.trim() };
}

async function readChangesets(): Promise<ReadonlyArray<Change>> {
  const entries = await readdir(CHANGESET_DIR);
  const files = entries.filter((name) => name.endsWith(".md") && name !== "README.md");

  const changes = await Promise.all(
    files.map(async (name) => parseChangeset(await readFile(join(CHANGESET_DIR, name), "utf8"))),
  );

  return changes
    .filter((change) => change !== null)
    .sort((a, b) => {
      const byBump = BUMP_ORDER[a.packages[0]!.bump] - BUMP_ORDER[b.packages[0]!.bump];
      return byBump !== 0 ? byBump : a.summary.localeCompare(b.summary);
    });
}

/**
 * Lists the changesets that have not been released yet. Reading the `.changeset` directory keeps
 * this page from drifting away from what the next release will actually contain.
 */
export async function UnreleasedChanges() {
  const changes = await readChangesets();

  if (changes.length === 0) {
    return (
      <p className="text-fd-muted-foreground">Nothing is pending: every change is released.</p>
    );
  }

  return (
    <div className="not-prose flex flex-col gap-4">
      {changes.map((change) => (
        <article
          key={change.summary}
          className="border-fd-border flex flex-col gap-2 rounded-lg border p-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            {change.packages.map((pkg) => (
              <span
                key={pkg.name}
                className={`rounded-md px-2 py-0.5 font-mono text-xs ${BUMP_STYLES[pkg.bump]}`}
              >
                {pkg.name} · {pkg.bump}
              </span>
            ))}
          </div>
          <p className="text-fd-foreground text-sm">{change.summary}</p>
        </article>
      ))}
    </div>
  );
}
