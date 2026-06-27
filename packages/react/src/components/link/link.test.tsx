import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Link } from "./Link.js";

describe("Link", () => {
  it("renders a prose link by default", () => {
    render(<Link href="/">دورلنسر</Link>);
    const link = screen.getByRole("link", { name: "دورلنسر" });

    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveAttribute("data-slot", "link");
    expect(link).toHaveClass("text-indigo-600", "underline");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("aria-current");
  });

  it.each([
    ["nav", "text-gray-600"],
    ["drawer", "text-gray-500"],
    ["chrome", "text-text-chrome"],
    ["subtle", "hover:text-gray-700"],
    ["brand", "font-semibold"],
  ] as const)("applies the %s variant", (variant, expected) => {
    render(
      <Link href="/" variant={variant}>
        link
      </Link>,
    );

    expect(screen.getByRole("link")).toHaveClass(expected);
  });

  it("marks the current page", () => {
    render(
      <Link href="/project" variant="nav" current>
        پروژه ها
      </Link>,
    );

    expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
  });

  it("opens external links safely in a new tab", () => {
    render(
      <Link href="https://t.me/example" external rel="me">
        Telegram
      </Link>,
    );
    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer me");
  });

  it("passes rel through for internal links", () => {
    render(
      <Link href="/rules" rel="nofollow">
        قوانین
      </Link>,
    );

    expect(screen.getByRole("link")).toHaveAttribute("rel", "nofollow");
  });

  it("styles a custom link element with asChild", () => {
    render(
      <Link asChild variant="nav">
        <a href="/blog">وبلاگ</a>
      </Link>,
    );

    expect(screen.getByRole("link", { name: "وبلاگ" })).toHaveClass("text-gray-600");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Link ref={ref} href="/">
        ref
      </Link>,
    );

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("renders on the server", () => {
    expect(renderToString(<Link href="/">x</Link>)).toContain('data-slot="link"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <nav aria-label="main">
        <Link href="/" variant="nav" current>
          خانه
        </Link>
        <Link href="https://example.com" external>
          external
        </Link>
      </nav>,
    );

    await expectNoAxeViolations(container);
  });
});
