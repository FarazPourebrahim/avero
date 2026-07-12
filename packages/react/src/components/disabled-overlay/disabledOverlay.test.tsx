import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { DisabledOverlay } from "./DisabledOverlay.js";

describe("DisabledOverlay", () => {
  it("covers the card with a blurred layer and a reason pill", () => {
    const { container } = render(<DisabledOverlay>تکمیل ظرفیت</DisabledOverlay>);

    expect(container.firstElementChild).toHaveClass(
      "absolute",
      "inset-0",
      "backdrop-blur-[1px]",
      "rounded-xl",
    );
    expect(screen.getByText("تکمیل ظرفیت")).toHaveClass("bg-red-500", "text-white", "rounded-xl");
  });

  it.each([
    ["neutral", "bg-slate-600"],
    ["danger", "bg-red-500"],
  ] as const)("renders the %s tone", (tone, expected) => {
    render(<DisabledOverlay tone={tone}>بسته شد</DisabledOverlay>);

    expect(screen.getByText("بسته شد")).toHaveClass(expected);
  });

  it.each([
    ["2xl", "rounded-2xl"],
    ["3xl", "rounded-3xl"],
  ] as const)("matches the %s container radius", (radius, expected) => {
    const { container } = render(<DisabledOverlay radius={radius}>x</DisabledOverlay>);

    expect(container.firstElementChild).toHaveClass(expected);
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<DisabledOverlay ref={ref}>x</DisabledOverlay>);

    expect(ref.current).toHaveAttribute("data-slot", "disabled-overlay");
  });

  it("renders on the server", () => {
    expect(renderToString(<DisabledOverlay>تکمیل ظرفیت</DisabledOverlay>)).toContain("تکمیل ظرفیت");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div className="relative" aria-disabled="true">
        <p>کارت پروژه</p>
        <DisabledOverlay>تکمیل ظرفیت</DisabledOverlay>
      </div>,
    );

    await expectNoAxeViolations(container);
  });
});
