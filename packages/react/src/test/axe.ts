import axe from "axe-core";

/**
 * Runs axe-core against a rendered container and throws a readable error on any violation.
 * The `region` rule is disabled because isolated components are not rendered inside landmarks.
 */
export async function expectNoAxeViolations(container: Element): Promise<void> {
  const results = await axe.run(container, {
    rules: { region: { enabled: false } },
  });
  if (results.violations.length === 0) return;

  const report = results.violations
    .map((violation) => {
      const targets = violation.nodes.map((node) => node.target.join(" ")).join(", ");
      return `[${violation.id}] ${violation.help} -> ${targets}`;
    })
    .join("\n");
  throw new Error(`Accessibility violations:\n${report}`);
}
