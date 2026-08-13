import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HighlightPanel, InfoRow } from "../../components/stat/index.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { AchievementsPanel } from "./AchievementsPanel.js";

function contents() {
  return (
    <>
      <HighlightPanel label="رتبه در جدول امتیازها" value="-" />
      <InfoRow label="گواهی‌ها" value="0 عدد" tone="emerald" />
      <InfoRow label="نشان‌ها" value="0 عدد" tone="purple" />
    </>
  );
}

describe("AchievementsPanel", () => {
  it("renders the title above its rows", () => {
    render(<AchievementsPanel title="رتبه و دستاوردها">{contents()}</AchievementsPanel>);

    expect(screen.getByRole("heading", { name: "رتبه و دستاوردها" })).toBeInTheDocument();
    expect(screen.getByText("رتبه در جدول امتیازها")).toBeInTheDocument();
    expect(screen.getAllByText("0 عدد")).toHaveLength(2);
  });

  it("keeps the title icon's own color", () => {
    const { container } = render(
      <AchievementsPanel
        title="رتبه و دستاوردها"
        icon={<svg data-testid="trophy" className="text-amber-500" aria-hidden="true" />}
      >
        {contents()}
      </AchievementsPanel>,
    );

    expect(container.querySelector("h3")?.className).not.toMatch(/svg\]:text-/);
    expect(screen.getByTestId("trophy")).toHaveClass("text-amber-500");
  });

  it("spaces the rows evenly", () => {
    const { container } = render(
      <AchievementsPanel title="رتبه و دستاوردها">{contents()}</AchievementsPanel>,
    );

    expect(container.querySelector('[data-slot="achievements-panel-items"]')).toHaveClass(
      "space-y-2.5",
      "sm:space-y-3",
    );
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLElement>();
    render(
      <AchievementsPanel ref={ref} title="رتبه و دستاوردها">
        {contents()}
      </AchievementsPanel>,
    );

    expect(ref.current).toHaveAttribute("data-slot", "achievements-panel");
  });

  it("renders on the server", () => {
    expect(
      renderToString(<AchievementsPanel title="رتبه و دستاوردها">{contents()}</AchievementsPanel>),
    ).toContain("رتبه در جدول امتیازها");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <AchievementsPanel title="رتبه و دستاوردها">{contents()}</AchievementsPanel>,
    );

    await expectNoAxeViolations(container);
  });
});
