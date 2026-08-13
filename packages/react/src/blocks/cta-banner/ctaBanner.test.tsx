import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { CtaBanner } from "./CtaBanner.js";

const PROPS = {
  eyebrow: "مأموریت ما",
  title: "یادگیری بدون مرز، برای همه",
  children: "هدف ما فقط برگزاری چند دوره نیست.",
};

describe("CtaBanner", () => {
  it("renders the eyebrow, headline and paragraph", () => {
    render(<CtaBanner {...PROPS} />);

    expect(screen.getByText("مأموریت ما")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /یادگیری بدون مرز/ })).toBeInTheDocument();
    expect(screen.getByText(/هدف ما فقط/)).toBeInTheDocument();
  });

  it("hides the decorative glows from assistive technology", () => {
    const { container } = render(<CtaBanner {...PROPS} />);

    expect(container.querySelector('[data-slot="glow-orbs"]')).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("keeps the content above the glows", () => {
    const { container } = render(<CtaBanner {...PROPS} />);

    expect(container.querySelector('[data-slot="cta-banner"] > div:last-of-type')).toHaveClass(
      "relative",
      "z-10",
    );
  });

  it("takes the heading level the page needs", () => {
    render(<CtaBanner {...PROPS} titleAs="h2" />);

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renders actions only when given", () => {
    const { container, rerender } = render(<CtaBanner {...PROPS} />);
    expect(container.querySelector('[data-slot="cta-banner-actions"]')).toBeNull();

    rerender(<CtaBanner {...PROPS} actions={<button type="button">شروع</button>} />);
    expect(screen.getByRole("button", { name: "شروع" })).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLElement>();
    render(<CtaBanner {...PROPS} ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "cta-banner");
  });

  it("renders on the server", () => {
    expect(renderToString(<CtaBanner {...PROPS} />)).toContain("مأموریت");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CtaBanner {...PROPS} titleAs="h2" />);

    await expectNoAxeViolations(container);
  });
});
