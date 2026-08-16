import { expect, test } from "@playwright/test";
import type axe from "axe-core";
import type { AxeResults, RunOptions } from "axe-core";
import { createRequire } from "node:module";
import { DIRECTIONS, storiesFor, storyUrl } from "./stories";

// Global DoD item 5: axe reports 0 violations for every story, in RTL/fa and LTR/en, in a real
// browser — which, unlike the jsdom unit checks, can measure colour contrast.
// Stories tagged `!a11y` and internal stories are skipped.

const AXE_SCRIPT = createRequire(import.meta.url).resolve("axe-core/axe.min.js");

// Page-structure rules are off: a story renders a component in isolation, so it has no
// landmarks, `<main>` or `<h1>` of its own (`region` is off in the unit helper for the same reason).
const AXE_OPTIONS: RunOptions = {
  rules: {
    region: { enabled: false },
    "landmark-one-main": { enabled: false },
    "page-has-heading-one": { enabled: false },
  },
};

// Colour contrast is reported, not enforced: the default palette keeps some below-AA pairings by
// decision O-04 (see packages/tokens/reports/contrast-report.md). Its findings are attached to
// each test as a warning so they stay visible in the report.
const REPORTED_ONLY_RULES = new Set(["color-contrast"]);

function formatViolations(violations: AxeResults["violations"]): string {
  return violations
    .flatMap((violation) =>
      violation.nodes.map(
        (node) =>
          `[${violation.id}] ${node.target.join(" ")}\n  ${node.failureSummary?.replaceAll("\n", "\n  ") ?? violation.help}`,
      ),
    )
    .join("\n");
}

for (const story of storiesFor("a11y")) {
  for (const { dir, locale } of DIRECTIONS) {
    test(`${story.title} › ${story.name} (${dir})`, { tag: "@a11y" }, async ({ page }) => {
      // Entrance animations would otherwise be measured mid-fade.
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(storyUrl(story, dir, locale));
      await page.locator("#storybook-root").waitFor();
      await page.evaluate(() => document.fonts.ready);
      await page.addScriptTag({ path: AXE_SCRIPT });

      const results = await page.evaluate(
        (options) => (window as unknown as { axe: typeof axe }).axe.run(document, options),
        AXE_OPTIONS,
      );

      const reported = results.violations.filter((violation) =>
        REPORTED_ONLY_RULES.has(violation.id),
      );
      const enforced = results.violations.filter(
        (violation) => !REPORTED_ONLY_RULES.has(violation.id),
      );
      if (reported.length > 0) {
        test.info().annotations.push({ type: "warning", description: formatViolations(reported) });
      }

      expect(enforced, formatViolations(enforced)).toEqual([]);
    });
  }
}
