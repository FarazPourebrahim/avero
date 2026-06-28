import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

// Global DoD item 7: every story is screenshot in RTL/fa and LTR/en at three viewport widths.
// Stories tagged `!visual` and internal stories are skipped.

type IndexEntry = {
  id: string;
  title: string;
  name: string;
  type: "story" | "docs";
  tags?: string[];
};

const index = JSON.parse(
  readFileSync(new URL("../storybook-static/index.json", import.meta.url), "utf8"),
) as { entries: Record<string, IndexEntry> };

const stories = Object.values(index.entries).filter(
  (entry) =>
    entry.type === "story" &&
    !entry.title.startsWith("Internal/") &&
    !entry.tags?.includes("!visual"),
);

const DIRECTIONS = [
  { dir: "rtl", locale: "fa" },
  { dir: "ltr", locale: "en" },
] as const;

const VIEWPORT_WIDTHS = [375, 768, 1280] as const;

for (const story of stories) {
  for (const { dir, locale } of DIRECTIONS) {
    test.describe(`${story.title} › ${story.name} (${dir})`, { tag: "@visual" }, () => {
      for (const width of VIEWPORT_WIDTHS) {
        test(`${width}px`, async ({ page }) => {
          await page.setViewportSize({ width, height: 900 });
          await page.goto(
            `/iframe.html?id=${story.id}&viewMode=story&globals=direction:${dir};locale:${locale}`,
          );
          const root = page.locator("#storybook-root");
          await root.waitFor();
          await page.evaluate(() => document.fonts.ready);

          await expect(root).toHaveScreenshot(`${story.id}--${dir}--${width}.png`);
        });
      }
    });
  }
}
