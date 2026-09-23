import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Spinner } from "./Spinner.js";

describe("Spinner", () => {
  it("is hidden from assistive technology by default", () => {
    const { container } = render(<Spinner />);

    expect(container.querySelector('[data-slot="spinner"]')).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("announces itself when labelled", () => {
    render(<Spinner labelled />);

    expect(screen.getByRole("status")).toHaveAccessibleName("در حال بارگذاری");
  });

  it("takes the label from the active dictionary", () => {
    render(
      <AveroProvider locale="en-US">
        <Spinner labelled />
      </AveroProvider>,
    );

    expect(screen.getByRole("status")).toHaveAccessibleName("Busy");
  });

  it("an explicit label announces without needing the flag", () => {
    render(<Spinner label="در حال ارسال" />);

    expect(screen.getByRole("status")).toHaveAccessibleName("در حال ارسال");
  });

  it.each([
    ["ring", "animate-spin"],
    ["track", "animate-spin"],
    ["glow", "glow-ring"],
  ] as const)("renders the %s variant as a single element", (variant, className) => {
    const { container } = render(<Spinner variant={variant} />);
    const root = container.querySelector('[data-slot="spinner"]');

    expect(root).toHaveClass(className);
    expect(root).toHaveAttribute("data-variant", variant);
    expect(container.querySelectorAll('[data-slot="spinner-part"]')).toHaveLength(0);
  });

  it.each([
    ["dots", 3, "animate-spinner-dot"],
    ["bars", 4, "animate-spinner-bar"],
    ["spokes", 8, "animate-spinner-spoke"],
  ] as const)("renders the %s variant from %i animated parts", (variant, count, animation) => {
    const { container } = render(<Spinner variant={variant} />);
    const parts = container.querySelectorAll('[data-slot="spinner-part"]');

    expect(parts).toHaveLength(count);
    parts.forEach((part) => expect(part).toHaveClass(animation));
  });

  it("offsets the spokes so the bright spoke travels clockwise", () => {
    const { container } = render(<Spinner variant="spokes" />);
    const [first, second] = container.querySelectorAll('[data-slot="spinner-part"]');

    expect(first).toHaveClass("rotate-0", "[animation-delay:-1s]");
    expect(second).toHaveClass("rotate-45", "[animation-delay:-0.875s]");
  });

  it("uses a 1px border only on the smallest bordered spinners", () => {
    const { container, rerender } = render(<Spinner variant="track" size="xs" />);
    const root = () => container.querySelector('[data-slot="spinner"]');

    expect(root()).toHaveClass("border");
    expect(root()).not.toHaveClass("border-2");

    rerender(<Spinner variant="dots" size="xs" />);
    expect(root()).not.toHaveClass("border");
  });

  it("defaults to the ring variant", () => {
    const { container } = render(<Spinner />);

    expect(container.querySelector('[data-slot="spinner"]')).toHaveAttribute(
      "data-variant",
      "ring",
    );
  });

  it.each(["xs", "sm", "md", "lg", "xl"] as const)("renders the %s size", (size) => {
    const { container } = render(<Spinner size={size} />);

    expect(container.querySelector('[data-slot="spinner"]')).toBeInTheDocument();
  });

  it.each(["current", "primary", "muted", "inverse"] as const)("renders the %s tone", (tone) => {
    const { container } = render(<Spinner tone={tone} />);

    expect(container.querySelector('[data-slot="spinner"]')).toBeInTheDocument();
  });

  it("forwards its ref and merges className", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Spinner ref={ref} className="ms-2" />);

    expect(ref.current).toHaveClass("ms-2");
  });

  it("renders on the server", () => {
    expect(renderToString(<Spinner labelled />)).toContain("spinner");
  });

  it.each(["ring", "track", "glow", "dots", "bars", "spokes"] as const)(
    "has no axe violations as %s",
    async (variant) => {
      const { container } = render(<Spinner variant={variant} labelled />);

      await expectNoAxeViolations(container);
    },
  );

  it.each(["dots", "bars", "spokes"] as const)("renders %s on the server", (variant) => {
    expect(renderToString(<Spinner variant={variant} />)).toContain("spinner-part");
  });
});
