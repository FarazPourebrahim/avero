import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Eyebrow, Heading, Text } from "./Typography.js";

describe("Heading", () => {
  it("renders a section heading as h2 by default", () => {
    render(<Heading>خدمات فریلنسرها</Heading>);
    const heading = screen.getByRole("heading", { level: 2, name: "خدمات فریلنسرها" });

    expect(heading).toHaveClass("text-xl", "font-bold", "md:text-2xl");
    expect(heading).toHaveAttribute("data-slot", "heading");
  });

  it.each([
    ["display", 1, "font-black"],
    ["article", 1, "md:text-4xl"],
    ["page", 1, "font-extrabold"],
    ["card", 3, "text-lg"],
    ["subsection", 4, "text-base"],
  ] as const)("renders the %s size at level %i", (size, level, expected) => {
    render(<Heading size={size}>title</Heading>);

    expect(screen.getByRole("heading", { level })).toHaveClass(expected);
  });

  it("uses an explicit level", () => {
    render(
      <Heading size="page" as="h2">
        title
      </Heading>,
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveClass("font-extrabold");
  });

  it("supports asChild and forwards refs", () => {
    const ref = createRef<HTMLHeadingElement>();
    render(
      <Heading asChild size="card" ref={ref}>
        <h5>asChild</h5>
      </Heading>,
    );

    expect(screen.getByRole("heading", { level: 5 })).toHaveClass("text-lg");
    expect(ref.current?.tagName).toBe("H5");
  });
});

describe("Text", () => {
  it("renders a body paragraph by default", () => {
    render(<Text>متن</Text>);
    const text = screen.getByText("متن");

    expect(text.tagName).toBe("P");
    expect(text).toHaveClass("text-base", "leading-8", "text-gray-700");
  });

  it.each([
    ["lead", "text-justify"],
    ["muted", "text-gray-500"],
    ["caption", "text-gray-400"],
  ] as const)("applies the %s variant", (variant, expected) => {
    render(<Text variant={variant}>text</Text>);

    expect(screen.getByText("text")).toHaveClass(expected);
  });

  it("renders as another element", () => {
    render(<Text as="span">inline</Text>);

    expect(screen.getByText("inline").tagName).toBe("SPAN");
  });

  it("supports asChild and forwards refs", () => {
    const ref = createRef<HTMLParagraphElement>();
    render(
      <Text asChild variant="caption" ref={ref}>
        <small>note</small>
      </Text>,
    );

    expect(ref.current?.tagName).toBe("SMALL");
    expect(ref.current).toHaveClass("text-gray-400");
  });
});

describe("Eyebrow", () => {
  it("renders the light tone by default", () => {
    render(<Eyebrow>ارائه‌دهنده خدمت</Eyebrow>);

    expect(screen.getByText("ارائه‌دهنده خدمت")).toHaveClass("text-gray-600", "uppercase");
  });

  it("renders the dark-background tone", () => {
    render(<Eyebrow tone="onDark">مأموریت</Eyebrow>);

    expect(screen.getByText("مأموریت")).toHaveClass("text-cyan-400");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Eyebrow ref={ref}>x</Eyebrow>);

    expect(ref.current).toHaveAttribute("data-slot", "eyebrow");
  });
});

describe("typography", () => {
  it("renders on the server", () => {
    const html = renderToString(
      <div>
        <Heading size="page">title</Heading>
        <Text>body</Text>
        <Eyebrow>label</Eyebrow>
      </div>,
    );

    expect(html).toContain("<h1");
    expect(html).toContain('data-slot="eyebrow"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <article>
        <Eyebrow>label</Eyebrow>
        <Heading size="article">title</Heading>
        <Text>body</Text>
      </article>,
    );

    await expectNoAxeViolations(container);
  });
});
