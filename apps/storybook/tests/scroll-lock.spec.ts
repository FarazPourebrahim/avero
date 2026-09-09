import { expect, test, type Page } from "@playwright/test";
import { DIRECTIONS, storyUrl, type StoryEntry } from "./stories";

// Phase 6: an overlay locks page scrolling without moving the page, in RTL and LTR alike
// (docs/avero-plan D-22). While the lock is on, the viewport keeps the scrollbar's space with
// `scrollbar-gutter: stable` and react-remove-scroll-bar's compensating margin is dropped, so
// neither in-flow nor fixed content shifts, and both are restored on close.

// Headless Chromium hides scrollbars by default, which would remove the very gap this measures.
test.use({ launchOptions: { ignoreDefaultArgs: ["--hide-scrollbars"] } });

const STORY: StoryEntry = {
  id: "internal-scroll-lock--default",
  title: "Internal/Scroll Lock",
  name: "Default",
  type: "story",
};

// Every overlay that takes a scroll lock: the two modal panels, and the floating panels of D-21.
const OVERLAYS = [
  { name: "dialog", trigger: "dialog-trigger", panel: '[data-slot="dialog-content"]' },
  { name: "drawer", trigger: "drawer-trigger", panel: '[data-slot="drawer-content"]' },
  { name: "select", trigger: "select-trigger", panel: '[data-slot="select-content"]' },
  { name: "dropdown menu", trigger: "menu-trigger", panel: '[data-slot="dropdown-menu-content"]' },
] as const;

// Sub-pixel rounding, not a shift anyone can see.
const TOLERANCE = 0.5;

type Layout = {
  bar: { start: number; end: number };
  fixed: { start: number; end: number };
  viewportWidth: number;
  scrollY: number;
};

async function readLayout(page: Page): Promise<Layout> {
  return page.evaluate(() => {
    function edges(testId: string) {
      const element = document.querySelector(`[data-testid="${testId}"]`);
      if (!element) {
        throw new Error(`Missing [data-testid="${testId}"]`);
      }
      const rect = element.getBoundingClientRect();
      return { start: rect.left, end: rect.right };
    }

    return {
      bar: edges("scroll-lock-bar"),
      fixed: edges("scroll-lock-fixed"),
      viewportWidth: document.documentElement.clientWidth,
      scrollY: window.scrollY,
    };
  });
}

function expectUnmoved(after: Layout, before: Layout, when: string) {
  expect(Math.abs(after.bar.start - before.bar.start), `${when}: in-flow bar start`).toBeLessThan(
    TOLERANCE,
  );
  expect(Math.abs(after.bar.end - before.bar.end), `${when}: in-flow bar end`).toBeLessThan(
    TOLERANCE,
  );
  expect(Math.abs(after.fixed.start - before.fixed.start), `${when}: fixed bar start`).toBeLessThan(
    TOLERANCE,
  );
  expect(Math.abs(after.fixed.end - before.fixed.end), `${when}: fixed bar end`).toBeLessThan(
    TOLERANCE,
  );
  expect(after.viewportWidth, `${when}: viewport width`).toBe(before.viewportWidth);
  expect(after.scrollY, `${when}: scroll position`).toBe(before.scrollY);
}

/** Scrolls the way a reader does, and reports where the page ended up. */
async function scrollByWheel(page: Page, delta: number): Promise<number> {
  await page.mouse.move(5, 5);
  await page.mouse.wheel(0, delta);
  // The browser applies a scroll before it paints, so two frames is enough to see one land.
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
  return page.evaluate(() => window.scrollY);
}

async function openStory(page: Page, dir: string, locale: string) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(storyUrl(STORY, dir, locale));
  await expect(page.getByTestId("scroll-lock-bar")).toBeVisible();

  const scrollbarWidth = await page.evaluate(
    () => window.innerWidth - document.documentElement.clientWidth,
  );
  expect(scrollbarWidth, "the page needs a visible scrollbar to measure").toBeGreaterThan(0);
}

for (const { dir, locale } of DIRECTIONS) {
  test.describe(`scroll lock (${dir})`, () => {
    test.beforeEach(async ({ page }) => {
      await openStory(page, dir, locale);
    });

    for (const overlay of OVERLAYS) {
      test(`opening a ${overlay.name} doesn't shift the page`, async ({ page }) => {
        const before = await readLayout(page);

        await page.getByTestId(overlay.trigger).click();
        await expect(page.locator(overlay.panel)).toBeVisible();
        await expect(page.locator("body")).toHaveAttribute("data-scroll-locked", /\d+/);

        expectUnmoved(await readLayout(page), before, `with the ${overlay.name} open`);
      });
    }

    test("the scrollbar's space is kept while an overlay is open", async ({ page }) => {
      await page.getByTestId("dialog-trigger").click();
      await expect(page.locator("body")).toHaveAttribute("data-scroll-locked", /\d+/);

      const styles = await page.evaluate(() => {
        const root = getComputedStyle(document.documentElement);
        const body = getComputedStyle(document.body);
        return {
          gutter: root.scrollbarGutter,
          overflow: body.overflow,
          marginStart: body.marginLeft,
          marginEnd: body.marginRight,
        };
      });

      expect(styles.overflow, "the overlay locks page scrolling").toContain("hidden");
      expect(styles.gutter, "the viewport keeps the scrollbar's space").toBe("stable");
      expect(styles.marginStart, "no compensating margin").toBe("0px");
      expect(styles.marginEnd, "no compensating margin").toBe("0px");
    });

    test("scrolling stops while a dialog is open and works again after it closes", async ({
      page,
    }) => {
      await page.evaluate(() => window.scrollTo(0, 200));
      const before = await readLayout(page);
      expect(before.scrollY, "the page starts scrolled, so a restore is visible").toBe(200);

      await page.getByTestId("dialog-trigger").click();
      await expect(page.locator('[data-slot="dialog-content"]')).toBeVisible();
      expect(await scrollByWheel(page, 400), "the page doesn't scroll behind the overlay").toBe(
        before.scrollY,
      );

      await page.keyboard.press("Escape");
      await expect(page.locator("body")).not.toHaveAttribute("data-scroll-locked");

      expectUnmoved(await readLayout(page), before, "after closing");
      expect(await scrollByWheel(page, 400), "the page scrolls again once closed").toBeGreaterThan(
        before.scrollY,
      );
    });
  });
}
