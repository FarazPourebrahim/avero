import { expect, test, type Locator, type Page } from "@playwright/test";
import type axe from "axe-core";
import type { RunOptions } from "axe-core";
import { createRequire } from "node:module";
import { DIRECTIONS, storiesFor, storyUrl } from "./stories";

// Phase 4 exit gate: the Forms demo, with every form control and validation on, is completed with
// the keyboard alone and passes axe in its error and submitted states, in RTL/fa and LTR/en.

const AXE_SCRIPT = createRequire(import.meta.url).resolve("axe-core/axe.min.js");

// Same rules as the a11y suite; colour contrast is reported there, not enforced (D-19).
const AXE_OPTIONS: RunOptions = {
  rules: {
    region: { enabled: false },
    "landmark-one-main": { enabled: false },
    "page-has-heading-one": { enabled: false },
    "color-contrast": { enabled: false },
  },
};

const STORY_ID = "patterns-forms-demo--registration";

// Built-in strings come from the locale's dictionary; the form's own labels stay Persian.
const COPY = {
  fa: { openCalendar: "باز کردن تقویم", remove: "حذف", date: "1405/07/01" },
  en: { openCalendar: "Open calendar", remove: "Remove", date: "2026/09/23" },
} as const;

async function expectNoAxeViolations(page: Page) {
  await page.addScriptTag({ path: AXE_SCRIPT });
  const results = await page.evaluate(
    (options) => (window as unknown as { axe: typeof axe }).axe.run(document, options),
    AXE_OPTIONS,
  );
  const violations = results.violations.flatMap((violation) =>
    violation.nodes.map((node) => `[${violation.id}] ${node.target.join(" ")}`),
  );
  expect(violations).toEqual([]);
}

/** Presses Tab once and checks where focus lands, so the test also pins the tab order. */
async function tabTo(page: Page, target: Locator) {
  await page.keyboard.press("Tab");
  await expect(target).toBeFocused();
}

const story = storiesFor("forms").find((entry) => entry.id === STORY_ID);

for (const { dir, locale } of DIRECTIONS) {
  test(
    `Forms demo is completed with the keyboard only (${dir})`,
    { tag: "@forms" },
    async ({ page }) => {
      expect(story, `Story ${STORY_ID} is missing from the Storybook build`).toBeDefined();
      const copy = COPY[locale];

      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(storyUrl(story!, dir, locale));
      await expect(page.getByRole("form", { name: "ثبت‌نام در دوره" })).toBeVisible();
      await page.evaluate(() => document.fonts.ready);

      // Submitting the empty form shows every error and keeps focus on the first invalid control.
      const name = page.getByRole("textbox", { name: "نام و نام خانوادگی" });
      await tabTo(page, name);
      await page.keyboard.press("Enter");
      await expect(page.getByRole("alert")).toHaveCount(12);
      await expect(name).toHaveAttribute("aria-invalid", "true");
      await expect(name).toBeFocused();
      await expectNoAxeViolations(page);

      await page.keyboard.type("سارا محمدی");

      await tabTo(page, page.getByRole("textbox", { name: "معرفی کوتاه" }));
      await page.keyboard.type("طراح رابط کاربری با پنج سال تجربه");

      const city = page.getByRole("combobox", { name: "شهر" });
      await tabTo(page, city);
      await page.keyboard.press("Enter");
      await expect(page.getByRole("listbox")).toBeVisible();
      await page.keyboard.press("Enter");
      await expect(city).toHaveText(/تهران/);
      await expect(city).toBeFocused();

      const level = page.getByRole("combobox", { name: "سطح" });
      await tabTo(page, level);
      await page.keyboard.press("Enter");
      await expect(page.getByRole("listbox")).toBeVisible();
      await page.keyboard.press("Enter");
      await expect(level).toHaveText(/مقدماتی/);
      await expect(level).toBeFocused();

      const course = page.getByRole("combobox", { name: "دوره" });
      await tabTo(page, course);
      await page.keyboard.type("تحلیل");
      await page.keyboard.press("Enter");
      await expect(course).toHaveValue("تحلیل داده");

      const startDate = page.getByRole("textbox", { name: "تاریخ شروع" });
      await tabTo(page, startDate);
      await page.keyboard.type(copy.date);
      await tabTo(page, page.getByRole("button", { name: copy.openCalendar }));
      await expect(startDate).not.toHaveAttribute("aria-invalid", "true");

      const budget = page.getByRole("textbox", { name: "بودجه" });
      await tabTo(page, budget);
      await page.keyboard.type("2500000");
      await expect(budget).not.toHaveValue("");

      await tabTo(page, page.getByRole("textbox", { name: "مهارت‌ها" }));
      await page.keyboard.type("UX");
      await page.keyboard.press("Enter");
      await expect(page.locator("[data-slot='tag-input-tag']")).toHaveText(["UX"]);

      const code = page.getByRole("textbox", { name: "کد تأیید" });
      await tabTo(page, code);
      await page.keyboard.type("123456");
      await expect(code).toHaveValue("123456");

      // The file picker opens from the keyboard; Playwright answers the chooser it raises.
      await tabTo(page, page.locator("[data-slot='file-input-control']"));
      const chooser = page.waitForEvent("filechooser");
      await page.keyboard.press("Space");
      await (
        await chooser
      ).setFiles({
        name: "resume.pdf",
        mimeType: "application/pdf",
        buffer: Buffer.from("%PDF-1.4 sample"),
      });
      await expect(page.locator("[data-slot='file-input-item']")).toContainText("resume.pdf");
      await tabTo(page, page.getByRole("button", { name: `${copy.remove} resume.pdf` }));

      const terms = page.getByRole("checkbox", { name: "قوانین و مقررات را می‌پذیرم" });
      await tabTo(page, terms);
      await page.keyboard.press("Space");
      await expect(terms).toBeChecked();

      const basicPlan = page.getByRole("radio", { name: "پایه" });
      await tabTo(page, basicPlan);
      await page.keyboard.press("Space");
      await expect(basicPlan).toBeChecked();

      const newsletter = page.getByRole("switch", { name: "دریافت خبرنامه" });
      await tabTo(page, newsletter);
      await page.keyboard.press("Space");
      await expect(newsletter).toBeChecked();

      await tabTo(page, page.getByRole("button", { name: "ثبت‌نام" }));
      await page.keyboard.press("Enter");

      await expect(page.getByRole("status")).toContainText("فرم با موفقیت ارسال شد.");
      await expect(page.getByRole("alert")).toHaveCount(0);
      await expectNoAxeViolations(page);
    },
  );
}
