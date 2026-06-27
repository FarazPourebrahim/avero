import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Chip } from "./Chip.js";

describe("Chip", () => {
  it("renders a category chip by default", () => {
    render(<Chip>سئو</Chip>);
    const chip = screen.getByText("سئو");

    expect(chip.tagName).toBe("SPAN");
    expect(chip).toHaveAttribute("data-slot", "chip");
    expect(chip).toHaveClass("rounded-full", "bg-gray-100", "px-2", "py-1", "text-xs");
  });

  it("renders the small category chip", () => {
    render(<Chip size="sm">remote</Chip>);

    expect(screen.getByText("remote")).toHaveClass("py-0.5", "text-3xs");
  });

  it.each([
    ["link", "hover:bg-indigo-100"],
    ["tag", "border-slate-200/90"],
    ["footer", "border-text-chrome/15"],
    ["mini", "text-3xs"],
    ["skill", "bg-blue-50"],
  ] as const)("applies the %s variant", (variant, expected) => {
    render(<Chip variant={variant}>chip</Chip>);

    expect(screen.getByText("chip")).toHaveClass(expected);
  });

  it("renders a link when asChild is set", () => {
    render(
      <Chip asChild variant="link">
        <a href="/blog?category=frylnsry">فریلنسری</a>
      </Chip>,
    );
    const link = screen.getByRole("link", { name: "فریلنسری" });

    expect(link).toHaveAttribute("href", "/blog?category=frylnsry");
    expect(link).toHaveClass("bg-gray-50");
  });

  it("merges className and forwards refs", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Chip ref={ref} className="text-gray-500">
        freelance
      </Chip>,
    );

    expect(ref.current).toHaveClass("text-gray-500");
    expect(ref.current).not.toHaveClass("text-gray-600");
  });

  it("renders on the server", () => {
    expect(renderToString(<Chip variant="skill">WordPress</Chip>)).toContain("bg-blue-50");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <Chip>سئو</Chip>
        <Chip asChild variant="tag">
          <a href="/project?category=PHP">PHP</a>
        </Chip>
      </div>,
    );

    await expectNoAxeViolations(container);
  });
});
