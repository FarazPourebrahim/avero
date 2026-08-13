import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Progress } from "./Progress.js";

function indicator(container: HTMLElement) {
  return container.querySelector<HTMLElement>('[data-slot="progress-indicator"]');
}

describe("Progress", () => {
  it("exposes an accessible progressbar with the current value", () => {
    render(<Progress value={3} max={12} aria-label="ظرفیت ثبت‌نام" />);
    const bar = screen.getByRole("progressbar", { name: "ظرفیت ثبت‌نام" });

    expect(bar).toHaveAttribute("aria-valuenow", "3");
    expect(bar).toHaveAttribute("aria-valuemax", "12");
    expect(bar).toHaveClass("h-2", "bg-gray-100", "rounded-full");
  });

  it("sizes the indicator as a percentage of max", () => {
    const { container } = render(<Progress value={3} max={12} aria-label="capacity" />);

    expect(indicator(container)).toHaveStyle({ width: "25%" });
    expect(indicator(container)).toHaveClass("bg-primary");
  });

  it("clamps values to the valid range", () => {
    const { container, rerender } = render(<Progress value={20} max={10} aria-label="c" />);
    expect(indicator(container)).toHaveStyle({ width: "100%" });

    rerender(<Progress value={-5} max={10} aria-label="c" />);
    expect(indicator(container)).toHaveStyle({ width: "0%" });
  });

  it("falls back to a max of 100 for invalid max values", () => {
    const { container } = render(<Progress value={50} max={0} aria-label="c" />);

    expect(indicator(container)).toHaveStyle({ width: "50%" });
  });

  it("renders an indeterminate bar for null values", () => {
    render(<Progress value={null} aria-label="loading" />);

    expect(screen.getByRole("progressbar")).toHaveAttribute("data-state", "indeterminate");
  });

  it("applies size and tone options", () => {
    const { container } = render(<Progress value={100} size="sm" tone="danger" aria-label="c" />);

    expect(screen.getByRole("progressbar")).toHaveClass("h-1.5");
    expect(indicator(container)).toHaveClass("bg-red-500");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Progress ref={ref} value={1} aria-label="c" />);

    expect(ref.current).toHaveAttribute("data-slot", "progress");
  });

  it("renders on the server", () => {
    expect(renderToString(<Progress value={40} aria-label="c" />)).toContain("width:40%");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Progress value={5} max={15} aria-label="ظرفیت" />);

    await expectNoAxeViolations(container);
  });
});
