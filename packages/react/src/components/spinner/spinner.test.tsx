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
    ["glow", "glow-ring"],
  ] as const)("renders the %s variant", (variant, className) => {
    const { container } = render(<Spinner variant={variant} />);

    expect(container.querySelector('[data-slot="spinner"]')).toHaveClass(className);
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

  it("has no axe violations", async () => {
    const { container } = render(<Spinner labelled />);

    await expectNoAxeViolations(container);
  });
});
