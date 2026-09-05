import { expect, test, type Locator, type Page } from "@playwright/test";
import { formatViolations, runAxe } from "./axe";
import { DIRECTIONS, storyUrl, type StoryEntry } from "./stories";

// Phase 6 exit gate: on a page containing every overlay, each one opens in turn and passes axe, and
// nested overlays stack in the documented order (§4.8, D-21).

const STORY: StoryEntry = {
  id: "internal-overlay-stack--default",
  title: "Internal/Overlay Stack",
  name: "Default",
  type: "story",
};

type Overlay = {
  name: string;
  open: (page: Page) => Promise<void>;
  panel: (page: Page) => Locator;
};

function clickOpens(testId: string, panel: (page: Page) => Locator, name: string): Overlay {
  return { name, open: (page) => page.getByTestId(testId).click(), panel };
}

const OVERLAYS: Overlay[] = [
  clickOpens("dialog-trigger", (page) => page.getByRole("dialog", { name: "Dialog" }), "dialog"),
  clickOpens("confirm-trigger", (page) => page.getByRole("alertdialog"), "confirm dialog"),
  clickOpens("drawer-trigger", (page) => page.getByRole("dialog", { name: "Drawer" }), "drawer"),
  clickOpens("popover-trigger", (page) => page.getByRole("dialog", { name: "Filters" }), "popover"),
  clickOpens("menu-trigger", (page) => page.getByRole("menu"), "dropdown menu"),
  clickOpens("toast-trigger", (page) => page.locator('[data-slot="toast"]'), "toast"),
  clickOpens("lightbox-trigger", (page) => page.locator('[data-slot="lightbox"]'), "lightbox"),
  {
    name: "tooltip",
    // Focus opens a tooltip immediately; hover would wait for the delay.
    open: (page) => page.getByTestId("tooltip-trigger").focus(),
    panel: (page) => page.locator('[data-slot="tooltip"]'),
  },
];

async function zIndexOf(locator: Locator): Promise<number> {
  return locator.evaluate((element) => Number(getComputedStyle(element).zIndex));
}

for (const { dir, locale } of DIRECTIONS) {
  test.describe(`overlays (${dir})`, () => {
    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(storyUrl(STORY, dir, locale));
      await page.getByTestId("dialog-trigger").waitFor();
    });

    for (const overlay of OVERLAYS) {
      test(`the ${overlay.name} opens and passes axe`, async ({ page }) => {
        await overlay.open(page);
        await expect(overlay.panel(page)).toBeVisible();

        const { enforced } = await runAxe(page);

        expect(enforced, formatViolations(enforced)).toEqual([]);
      });
    }

    test("a popover opened inside a drawer is drawn above it", async ({ page }) => {
      await page.getByTestId("drawer-trigger").click();
      const drawer = page.locator('[data-slot="drawer-content"]');
      await expect(drawer).toBeVisible();

      await page.getByTestId("drawer-popover-trigger").click();
      const popover = page.getByRole("dialog", { name: "Filters" });
      await expect(popover).toBeVisible();

      // Radix copies the panel's z-index onto the positioned wrapper, which is what stacks.
      const wrapper = page.locator("[data-radix-popper-content-wrapper]");
      expect(await zIndexOf(wrapper)).toBeGreaterThan(await zIndexOf(drawer));
    });

    test("a toast raised from a dialog is drawn above it", async ({ page }) => {
      await page.getByTestId("dialog-trigger").click();
      const dialog = page.locator('[data-slot="dialog-content"]');
      await expect(dialog).toBeVisible();

      await page.getByTestId("dialog-toast-trigger").click();
      await expect(page.locator('[data-slot="toast"]')).toBeVisible();

      const viewport = page.locator('[data-slot="toast-viewport"]');
      expect(await zIndexOf(viewport)).toBeGreaterThan(await zIndexOf(dialog));
    });
  });
}
