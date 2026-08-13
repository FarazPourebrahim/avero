import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Card, CardFooter, CardHeader, CardTitle } from "./Card.js";

describe("Card", () => {
  it("renders a white surface card with large padding by default", () => {
    render(<Card>content</Card>);
    const card = screen.getByText("content");

    expect(card).toHaveAttribute("data-slot", "card");
    expect(card).toHaveClass("rounded-3xl", "border-slate-100", "bg-white", "p-6", "md:p-8");
  });

  it.each([
    ["flat", ["rounded-2xl", "border-gray-100"]],
    ["glass", ["bg-surface-glass", "hover:bg-white"]],
    ["muted", ["bg-slate-50/80"]],
  ] as const)("renders the %s variant", (variant, expected) => {
    render(<Card variant={variant}>content</Card>);

    expect(screen.getByText("content")).toHaveClass(...expected);
  });

  it.each([
    ["xs", "shadow-xs"],
    ["soft", "shadow-card-soft"],
    ["ambient", "shadow-card-ambient"],
    ["faint", "shadow-card-faint"],
    ["brand", "shadow-brand-soft"],
  ] as const)("applies the %s elevation", (elevation, expected) => {
    render(<Card elevation={elevation}>content</Card>);

    expect(screen.getByText("content")).toHaveClass(expected);
  });

  it("removes padding with padding none", () => {
    render(<Card padding="none">content</Card>);

    expect(screen.getByText("content")).not.toHaveClass("p-6", "md:p-8");
  });

  it.each([
    ["sm", ["p-3.5", "sm:p-5"]],
    ["md", ["p-4", "sm:p-6"]],
    ["xl", ["p-6", "sm:p-10"]],
  ] as const)("applies the %s padding", (padding, expected) => {
    render(<Card padding={padding}>content</Card>);

    expect(screen.getByText("content")).toHaveClass(...expected);
  });

  it("adds a hover shadow when interactive", () => {
    render(<Card interactive>content</Card>);

    expect(screen.getByText("content")).toHaveClass("hover:shadow-md");
  });

  it("renders a semantic element with asChild", () => {
    render(
      <Card asChild>
        <article>article</article>
      </Card>,
    );

    expect(screen.getByRole("article")).toHaveClass("rounded-3xl");
  });

  it("composes header, title and footer", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle size="sm">
            <svg aria-hidden="true" />
            دوره‌های پیشنهادی
          </CardTitle>
          <span>5 دوره</span>
        </CardHeader>
        <CardFooter>footer</CardFooter>
      </Card>,
    );

    const title = screen.getByRole("heading", { level: 3, name: "دوره‌های پیشنهادی" });
    expect(title).toHaveClass("text-xs", "sm:text-sm", "font-bold");
    expect(title.parentElement).toHaveClass("justify-between");
    expect(screen.getByText("footer")).toHaveClass("border-t", "pt-3");
  });

  it.each([
    ["md", "text-lg"],
    ["lg", "font-black"],
  ] as const)("renders the %s title size", (size, expected) => {
    render(
      <CardTitle size={size} as="h2">
        title
      </CardTitle>,
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveClass(expected);
  });

  it("forwards refs", () => {
    const cardRef = createRef<HTMLDivElement>();
    const titleRef = createRef<HTMLHeadingElement>();
    render(
      <Card ref={cardRef}>
        <CardTitle ref={titleRef}>title</CardTitle>
      </Card>,
    );

    expect(cardRef.current).toHaveAttribute("data-slot", "card");
    expect(titleRef.current?.tagName).toBe("H3");
  });

  it("renders on the server", () => {
    expect(renderToString(<Card>server</Card>)).toContain('data-slot="card"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>عنوان</CardTitle>
        </CardHeader>
        <p>متن</p>
      </Card>,
    );

    await expectNoAxeViolations(container);
  });
});
