import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Container } from "./Container.js";

describe("Container", () => {
  it("centres content in the site column by default", () => {
    const { container } = render(<Container>محتوا</Container>);

    expect(container.firstElementChild).toHaveClass(
      "mx-auto",
      "w-full",
      "max-w-7xl",
      "px-4",
      "sm:px-6",
      "lg:px-8",
    );
  });

  it.each([
    ["prose", "max-w-3xl"],
    ["full", "max-w-none"],
  ] as const)("renders the %s size", (size, expected) => {
    const { container } = render(<Container size={size} />);

    expect(container.firstElementChild).toHaveClass(expected);
  });

  it.each([
    ["tight", "px-3"],
    ["none", "max-w-7xl"],
  ] as const)("renders the %s gutter", (gutter, expected) => {
    const { container } = render(<Container gutter={gutter} />);

    expect(container.firstElementChild).toHaveClass(expected);
  });

  it("drops the gutters entirely when asked", () => {
    const { container } = render(<Container gutter="none" />);

    expect(container.firstElementChild).not.toHaveClass("px-4");
  });

  it("renders a different element", () => {
    render(<Container as="main">محتوا</Container>);

    expect(screen.getByRole("main")).toHaveAttribute("data-slot", "container");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Container ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "container");
  });

  it("renders on the server", () => {
    expect(renderToString(<Container as="section">x</Container>)).toContain("<section");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Container as="main">
        <p>محتوا</p>
      </Container>,
    );

    await expectNoAxeViolations(container);
  });
});
