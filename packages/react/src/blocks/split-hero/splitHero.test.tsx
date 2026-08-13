import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { SplitHero } from "./SplitHero.js";

const PROPS = {
  eyebrow: "از سال ۱۴۰۰",
  note: "داستان ما",
  title: "جایی برای یادگیری ساده و لذت‌بخش",
  image: "/story.svg",
  imageAlt: "تصویر معرفی",
};

describe("SplitHero", () => {
  it("renders the pill, note, headline and body", () => {
    render(
      <SplitHero {...PROPS}>
        <p>ما با یک پرسش ساده شروع کردیم.</p>
      </SplitHero>,
    );

    expect(screen.getByText("از سال ۱۴۰۰")).toBeInTheDocument();
    expect(screen.getByText("داستان ما")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /جایی برای یادگیری/ })).toBeInTheDocument();
    expect(screen.getByText(/با یک پرسش ساده/)).toBeInTheDocument();
  });

  it("aligns the text logically rather than to the right", () => {
    const { container } = render(<SplitHero {...PROPS} />);
    const column = container.querySelector('[data-slot="split-hero"] > div > div');

    expect(column).toHaveClass("text-start");
    expect(column?.className).not.toMatch(/text-right/);
  });

  it("splits into seven and five columns from lg", () => {
    const { container } = render(<SplitHero {...PROPS} />);

    expect(container.querySelector('[class~="lg:col-span-7"]')).not.toBeNull();
    expect(container.querySelector('[class~="lg:col-span-5"]')).not.toBeNull();
  });

  it("renders the illustration in its framed panel", () => {
    render(<SplitHero {...PROPS} />);

    expect(screen.getByAltText("تصویر معرفی")).toHaveClass("object-contain");
  });

  it("omits the illustration column without an image", () => {
    const { container } = render(<SplitHero title="بدون تصویر" />);

    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector('[class~="lg:col-span-5"]')).toBeNull();
  });

  it("renders actions when given", () => {
    render(<SplitHero {...PROPS} actions={<a href="/courses">مشاهده دوره‌ها</a>} />);

    expect(screen.getByRole("link", { name: "مشاهده دوره‌ها" })).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<SplitHero {...PROPS} ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "split-hero");
  });

  it("renders on the server", () => {
    expect(renderToString(<SplitHero {...PROPS} />)).toContain("داستان ما");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <SplitHero {...PROPS} titleAs="h1">
        <p>متن معرفی.</p>
      </SplitHero>,
    );

    await expectNoAxeViolations(container);
  });
});
