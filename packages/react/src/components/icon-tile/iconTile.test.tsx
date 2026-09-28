import { render } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { IconTile } from "./IconTile.js";

function tile(container: HTMLElement) {
  return container.querySelector('[data-slot="icon-tile"]');
}

describe("IconTile", () => {
  it("renders a decorative blue soft tile by default", () => {
    const { container } = render(<IconTile>★</IconTile>);

    expect(tile(container)).toHaveAttribute("aria-hidden", "true");
    expect(tile(container)).toHaveClass("bg-primary-soft", "text-primary", "size-7", "sm:size-8");
  });

  it.each([
    ["soft", "purple", ["bg-purple-50", "text-purple-600"]],
    ["soft", "primary", ["bg-primary-soft", "text-primary"]],
    ["muted", "emerald", ["bg-emerald-100", "text-emerald-600"]],
    ["tint", "amber", ["bg-amber-500/10", "text-amber-500"]],
    ["muted", "primary", ["bg-primary-soft-hover", "text-primary"]],
    ["tint", "primary", ["bg-primary/10", "text-primary"]],
    ["tint", "blue", ["bg-blue-600/10"]],
    ["gradient", "primary", ["from-primary", "to-primary-hover"]],
    ["gradient", "blue", ["from-blue-500", "to-blue-600"]],
    ["gradient", "rose", ["bg-gradient-to-br", "from-rose-500", "to-pink-600", "text-white"]],
    ["gradient", "amber", ["from-amber-500", "to-orange-500"]],
    ["gradient", "slate", ["from-slate-600", "to-slate-700"]],
  ] as const)("renders %s / %s", (variant, tone, expected) => {
    const { container } = render(<IconTile variant={variant} tone={tone} />);

    expect(tile(container)).toHaveClass(...expected);
  });

  it.each([
    ["sm", ["size-8", "rounded-xl"]],
    ["md", ["size-8", "sm:size-9", "rounded-lg"]],
    ["lg", ["size-8", "sm:size-10"]],
    ["xl", ["size-10", "sm:size-12"]],
    ["padded", ["p-3", "rounded-xl"]],
  ] as const)("applies the %s size", (size, expected) => {
    const { container } = render(<IconTile size={size} />);

    expect(tile(container)).toHaveClass(...expected);
  });

  it("forwards refs and merges className", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<IconTile ref={ref} className="rounded-2xl" />);

    expect(ref.current).toHaveClass("rounded-2xl");
    expect(ref.current).not.toHaveClass("rounded-lg");
  });

  it("renders on the server", () => {
    expect(renderToString(<IconTile tone="emerald" />)).toContain("bg-emerald-50");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <p>
        <IconTile>★</IconTile> دوره‌ها
      </p>,
    );

    await expectNoAxeViolations(container);
  });
});
