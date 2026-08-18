import { readFileSync } from "node:fs";

// Shared by the browser suites: the stories in the static Storybook build, and the two
// direction/locale pairs every story is checked in.

export type StoryEntry = {
  id: string;
  title: string;
  name: string;
  type: "story" | "docs";
  tags?: string[];
};

const index = JSON.parse(
  readFileSync(new URL("../storybook-static/index.json", import.meta.url), "utf8"),
) as { entries: Record<string, StoryEntry> };

/** Public stories, minus internal ones and any tagged with `!<suite>` (e.g. `!a11y`). */
export function storiesFor(suite: string): StoryEntry[] {
  return Object.values(index.entries).filter(
    (entry) =>
      entry.type === "story" &&
      !entry.title.startsWith("Internal/") &&
      !entry.tags?.includes(`!${suite}`),
  );
}

export const DIRECTIONS = [
  { dir: "rtl", locale: "fa" },
  { dir: "ltr", locale: "en" },
] as const;

// `a11y.manual` stops the Storybook a11y addon from scanning each story on render: the suites run
// their own axe, and two concurrent runs in one page fail with "Axe is already running".
export function storyUrl(story: StoryEntry, dir: string, locale: string): string {
  return `/iframe.html?id=${story.id}&viewMode=story&globals=direction:${dir};locale:${locale};a11y.manual:!true`;
}
