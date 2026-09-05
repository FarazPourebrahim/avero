import { expect, test } from "@playwright/test";
import { formatViolations, runAxe } from "./axe";
import { DIRECTIONS, storiesFor, storyUrl } from "./stories";

// Global DoD item 5: axe reports 0 violations for every story, in RTL/fa and LTR/en, in a real
// browser — which, unlike the jsdom unit checks, can measure colour contrast.
// Stories tagged `!a11y` and internal stories are skipped.

for (const story of storiesFor("a11y")) {
  for (const { dir, locale } of DIRECTIONS) {
    test(`${story.title} › ${story.name} (${dir})`, { tag: "@a11y" }, async ({ page }) => {
      // Entrance animations would otherwise be measured mid-fade.
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(storyUrl(story, dir, locale));
      await page.locator("#storybook-root").waitFor();
      await page.evaluate(() => document.fonts.ready);

      const { enforced, reported } = await runAxe(page);

      // Colour contrast findings stay visible in the report as a warning (D-19).
      if (reported.length > 0) {
        test.info().annotations.push({ type: "warning", description: formatViolations(reported) });
      }

      expect(enforced, formatViolations(enforced)).toEqual([]);
    });
  }
}
