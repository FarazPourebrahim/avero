import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ActionTile } from "../../components/action-tile/index.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { QuickActions } from "./QuickActions.js";

const ICON = <svg aria-hidden="true" viewBox="0 0 24 24" />;

function tiles() {
  return (
    <>
      <ActionTile icon={ICON}>افزودن دوره</ActionTile>
      <ActionTile icon={ICON} tone="purple">
        افزودن جلسه
      </ActionTile>
    </>
  );
}

describe("QuickActions", () => {
  it("lays six tiles out per row by default", () => {
    const { container } = render(<QuickActions>{tiles()}</QuickActions>);

    expect(container.querySelector('[data-slot="quick-actions"]')).toHaveClass(
      "grid-cols-2",
      "sm:grid-cols-3",
      "lg:grid-cols-6",
    );
  });

  it("takes a narrower row", () => {
    const { container } = render(<QuickActions columns={4}>{tiles()}</QuickActions>);

    expect(container.querySelector('[data-slot="quick-actions"]')).toHaveClass("lg:grid-cols-4");
  });

  it("becomes a named group when labelled", () => {
    render(<QuickActions label="دسترسی سریع">{tiles()}</QuickActions>);

    expect(screen.getByRole("group", { name: "دسترسی سریع" })).toBeInTheDocument();
  });

  it("stays a plain grid without a label", () => {
    const { container } = render(<QuickActions>{tiles()}</QuickActions>);

    expect(container.querySelector('[data-slot="quick-actions"]')).not.toHaveAttribute("role");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<QuickActions ref={ref}>{tiles()}</QuickActions>);

    expect(ref.current).toHaveAttribute("data-slot", "quick-actions");
  });

  it("renders on the server", () => {
    expect(renderToString(<QuickActions>{tiles()}</QuickActions>)).toContain("افزودن دوره");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<QuickActions label="دسترسی سریع">{tiles()}</QuickActions>);

    await expectNoAxeViolations(container);
  });
});
