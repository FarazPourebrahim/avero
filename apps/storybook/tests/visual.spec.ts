import { expect, test } from "@playwright/test";
import { DIRECTIONS, storiesFor, storyUrl } from "./stories";

// Global DoD item 7: every story is screenshot in RTL/fa and LTR/en at three viewport widths.
// Stories tagged `!visual` and internal stories are skipped.

const VIEWPORT_WIDTHS = [375, 768, 1280] as const;

for (const story of storiesFor("visual")) {
  for (const { dir, locale } of DIRECTIONS) {
    test.describe(`${story.title} › ${story.name} (${dir})`, { tag: "@visual" }, () => {
      for (const width of VIEWPORT_WIDTHS) {
        test(`${width}px`, async ({ page }) => {
          await page.setViewportSize({ width, height: 900 });
          await page.goto(storyUrl(story, dir, locale));
          const root = page.locator("#storybook-root");
          await root.waitFor();
          await page.evaluate(() => document.fonts.ready);

          await expect(root).toHaveScreenshot(`${story.id}--${dir}--${width}.png`);
        });
      }
    });
  }
}
