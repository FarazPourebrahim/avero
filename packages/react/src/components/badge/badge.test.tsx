import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Badge } from "./Badge.js";

describe("Badge", () => {
  it("renders a neutral status badge by default", () => {
    render(<Badge>آنلاین</Badge>);
    const badge = screen.getByText("آنلاین");

    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveAttribute("data-slot", "badge");
    expect(badge).toHaveClass("rounded-full", "bg-gray-100", "text-gray-600");
  });

  it.each([
    ["status", "success", ["bg-green-100", "text-green-700"]],
    ["status", "danger", ["bg-red-100", "text-red-700"]],
    ["outline", "neutral", ["border-slate-100", "bg-slate-50"]],
    ["outline", "indigo", ["border-indigo-100", "text-indigo-600"]],
    ["outline", "emerald", ["border-emerald-100", "text-emerald-700"]],
    ["outline", "amber", ["border-amber-100", "text-amber-700"]],
    ["overlay", "neutral", ["bg-black/60", "backdrop-blur-sm"]],
    ["overlay", "dark", ["bg-black/60"]],
    ["overlay", "blue", ["bg-blue-600/90", "rounded-xl"]],
    ["solid", "danger", ["bg-red-500", "text-white"]],
    ["solid", "success", ["bg-green-600"]],
  ] as const)("renders %s / %s", (variant, tone, expected) => {
    render(
      <Badge variant={variant} tone={tone}>
        badge
      </Badge>,
    );

    expect(screen.getByText("badge")).toHaveClass(...expected);
  });

  it.each([
    ["counter", "bg-gray-50"],
    ["premium", "gradient-premium"],
    ["label", "gradient-label"],
  ] as const)("renders the %s variant", (variant, expected) => {
    render(<Badge variant={variant}>badge</Badge>);

    expect(screen.getByText("badge")).toHaveClass(expected);
  });

  it("merges className and forwards refs", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Badge ref={ref} className="py-1">
        9 جای خالی
      </Badge>,
    );

    expect(ref.current).toHaveClass("py-1");
    expect(ref.current).not.toHaveClass("py-0.5");
  });

  it("renders on the server", () => {
    expect(renderToString(<Badge tone="success">منتشر شده</Badge>)).toContain("bg-green-100");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <p>
        <Badge tone="success">منتشر شده</Badge> <Badge variant="counter">0</Badge>
      </p>,
    );

    await expectNoAxeViolations(container);
  });
});
