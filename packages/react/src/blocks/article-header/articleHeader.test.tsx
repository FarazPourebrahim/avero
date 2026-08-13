import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MetaItem } from "../../components/meta/index.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ArticleHeader } from "./ArticleHeader.js";

const PROPS = {
  title: "سیستم طراحی چیست؟ راهنمای کامل شروع",
  image: "/cover.webp",
  meta: <MetaItem label="انتشار:">۱۲ مهر ۱۴۰۵</MetaItem>,
};

describe("ArticleHeader", () => {
  it("renders the cover, title and meta panel", () => {
    const { container } = render(<ArticleHeader {...PROPS} />);

    expect(screen.getByRole("heading", { name: /سیستم طراحی چیست/ })).toBeInTheDocument();
    expect(container.querySelector("figure")).not.toBeNull();
    expect(screen.getByText("۱۲ مهر ۱۴۰۵")).toBeInTheDocument();
  });

  it("names the cover with the title when no alternative text is given", () => {
    render(<ArticleHeader {...PROPS} />);

    expect(screen.getByAltText("سیستم طراحی چیست؟ راهنمای کامل شروع")).toBeInTheDocument();
  });

  it("takes its own alternative text", () => {
    render(<ArticleHeader {...PROPS} imageAlt="تصویر شاخص" />);

    expect(screen.getByAltText("تصویر شاخص")).toBeInTheDocument();
  });

  it("renders actions above the cover when given", () => {
    render(<ArticleHeader {...PROPS} actions={<button type="button">بازگشت</button>} />);

    expect(screen.getByRole("button", { name: "بازگشت" })).toBeInTheDocument();
  });

  it("starts at the title without a cover", () => {
    const { container } = render(<ArticleHeader title="بدون تصویر" />);

    expect(container.querySelector("figure")).toBeNull();
  });

  it("exposes the title's id so the article can point at it", () => {
    render(<ArticleHeader {...PROPS} titleId="blog-article-title" />);

    expect(screen.getByRole("heading")).toHaveAttribute("id", "blog-article-title");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLElement>();
    render(<ArticleHeader {...PROPS} ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "article-header");
  });

  it("renders on the server", () => {
    expect(renderToString(<ArticleHeader {...PROPS} />)).toContain("سیستم طراحی چیست");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ArticleHeader {...PROPS} />);

    await expectNoAxeViolations(container);
  });
});
