import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Rating } from "./Rating.js";

describe("Rating", () => {
  it("renders a filled star and the score with two fraction digits", () => {
    const { container } = render(<Rating value={4.5} />);

    expect(screen.getByRole("img", { name: "امتیاز ۴٫۵۰" })).toHaveTextContent("۴٫۵۰");
    expect(container.querySelector("svg")).toHaveClass(
      "fill-amber-400",
      "text-amber-400",
      "size-4",
    );
  });

  it("renders a visible label and a small star", () => {
    const { container } = render(<Rating value={0} label="امتیاز:" size="sm" fractionDigits={0} />);

    expect(screen.getByRole("img")).toHaveTextContent("امتیاز:۰");
    expect(container.querySelector("svg")).toHaveClass("size-3.5");
  });

  it("uses the English dictionary under an English provider", () => {
    render(
      <AveroProvider locale="en-US">
        <Rating value={3} fractionDigits={1} />
      </AveroProvider>,
    );

    expect(screen.getByRole("img", { name: "Rating 3.0" })).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Rating ref={ref} value={1} />);

    expect(ref.current).toHaveAttribute("data-slot", "rating");
  });

  it("renders on the server", () => {
    expect(renderToString(<Rating value={5} />)).toContain("۵٫۰۰");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Rating value={4.8} label="امتیاز:" />);

    await expectNoAxeViolations(container);
  });
});
