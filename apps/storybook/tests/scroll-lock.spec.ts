import { expect, test, type Page } from "@playwright/test";
import { DIRECTIONS, storyUrl, type StoryEntry } from "./stories";

// Phase 6: opening an overlay locks page scrolling without moving the page sideways, in RTL and
// LTR alike (docs/avero-plan Phase 6, scroll-lock item).

// Headless Chromium hides scrollbars by default, which would remove the very gap this measures.
test.use({ launchOptions: { ignoreDefaultArgs: ["--hide-scrollbars"] } });

const STORY: StoryEntry = {
  id: "internal-scroll-lock--default",
  title: "Internal/Scroll Lock",
  name: "Default",
  type: "story",
};

const OVERLAYS = [
  { name: "dialog", trigger: "dialog-trigger" },
  { name: "drawer", trigger: "drawer-trigger" },
] as const;

async function barEdges(page: Page) {
  return page.getByTestId("scroll-lock-bar").evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { left: rect.left, right: rect.right };
  });
}

for (const { dir, locale } of DIRECTIONS) {
  for (const overlay of OVERLAYS) {
    test(`opening a ${overlay.name} doesn't shift the page (${dir})`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(storyUrl(STORY, dir, locale));
      await expect(page.getByTestId("scroll-lock-bar")).toBeVisible();

      const scrollbarWidth = await page.evaluate(
        () => window.innerWidth - document.documentElement.clientWidth,
      );
      expect(scrollbarWidth, "the page needs a visible scrollbar to measure").toBeGreaterThan(0);

      const before = await barEdges(page);
      await page.getByTestId(overlay.trigger).click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await expect(page.locator("body")).toHaveAttribute("data-scroll-locked", /\d+/);

      const after = await barEdges(page);
      expect(Math.abs(after.left - before.left)).toBeLessThan(0.5);
      expect(Math.abs(after.right - before.right)).toBeLessThan(0.5);
    });
  }
}
