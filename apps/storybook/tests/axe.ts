import type { Page } from "@playwright/test";
import type axe from "axe-core";
import type { AxeResults, RunOptions } from "axe-core";
import { createRequire } from "node:module";

// Shared by the browser suites that run axe against a story in a real browser.

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
// decision O-04 (see packages/tokens/reports/contrast-report.md).
const REPORTED_ONLY_RULES = new Set(["color-contrast"]);

export type AxeViolations = AxeResults["violations"];

export function formatViolations(violations: AxeViolations): string {
  return violations
    .flatMap((violation) =>
      violation.nodes.map(
        (node) =>
          `[${violation.id}] ${node.target.join(" ")}\n  ${node.failureSummary?.replaceAll("\n", "\n  ") ?? violation.help}`,
      ),
    )
    .join("\n");
}

/** Runs axe on the whole page and splits the violations into enforced and reported-only ones. */
export async function runAxe(
  page: Page,
): Promise<{ enforced: AxeViolations; reported: AxeViolations }> {
  await page.addScriptTag({ path: AXE_SCRIPT });
  const results = await page.evaluate(
    (options) => (window as unknown as { axe: typeof axe }).axe.run(document, options),
    AXE_OPTIONS,
  );
  return {
    enforced: results.violations.filter((violation) => !REPORTED_ONLY_RULES.has(violation.id)),
    reported: results.violations.filter((violation) => REPORTED_ONLY_RULES.has(violation.id)),
  };
}
