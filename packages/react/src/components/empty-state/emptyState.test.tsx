import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { EmptyState } from "./EmptyState.js";

const icon = <svg data-testid="icon" aria-hidden="true" />;

describe("EmptyState", () => {
  it("renders the inline comment message by default", () => {
    const { container } = render(<EmptyState>هنوز نظری ثبت نشده است.</EmptyState>);

    expect(container.firstElementChild).toHaveClass("py-8", "text-sm", "text-gray-400");
    expect(screen.getByText("هنوز نظری ثبت نشده است.")).toBeInTheDocument();
    expect(container.querySelector('[data-slot="empty-state-icon"]')).toBeNull();
  });

  it.each([
    ["slate", "text-slate-400"],
    ["icon", "text-gray-300"],
    ["circle", "py-12"],
  ] as const)("renders the %s variant", (variant, expected) => {
    const { container } = render(
      <EmptyState variant={variant} icon={icon}>
        داده‌ای برای نمایش وجود ندارد
      </EmptyState>,
    );

    expect(container.firstElementChild).toHaveClass(expected);
  });

  it("puts the icon in a disc for the circle variant", () => {
    const { container } = render(
      <EmptyState variant="circle" icon={icon}>
        داده‌ای برای نمایش وجود ندارد
      </EmptyState>,
    );

    expect(container.querySelector('[data-slot="empty-state-icon"]')).toHaveClass(
      "rounded-full",
      "bg-gray-100",
      "size-12",
    );
  });

  it("fades the icon for the icon variant", () => {
    const { container } = render(
      <EmptyState variant="icon" icon={icon}>
        به‌زودی
      </EmptyState>,
    );

    expect(container.querySelector('[data-slot="empty-state-icon"]')).toHaveClass("opacity-30");
    expect(screen.getByText("به‌زودی")).toHaveClass("text-xs");
  });

  it("ignores an icon on the text-only variants", () => {
    const { container } = render(<EmptyState icon={icon}>متن</EmptyState>);

    expect(screen.queryByTestId("icon")).toBeNull();
    expect(container.querySelector('[data-slot="empty-state-icon"]')).toBeNull();
  });

  it("renders a next action", () => {
    render(
      <EmptyState action={<button type="button">افزودن خدمت</button>}>
        هنوز خدمتی ندارید.
      </EmptyState>,
    );

    expect(screen.getByRole("button", { name: "افزودن خدمت" })).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<EmptyState ref={ref}>x</EmptyState>);

    expect(ref.current).toHaveAttribute("data-slot", "empty-state");
  });

  it("renders on the server", () => {
    expect(renderToString(<EmptyState>خالی</EmptyState>)).toContain("خالی");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <EmptyState>هنوز نظری ثبت نشده است.</EmptyState>
        <EmptyState variant="circle" icon={icon} action={<button type="button">افزودن</button>}>
          داده‌ای برای نمایش وجود ندارد
        </EmptyState>
      </div>,
    );

    await expectNoAxeViolations(container);
  });
});
