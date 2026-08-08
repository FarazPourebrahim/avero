import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Chip } from "../../components/chip/index.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { CategoryLinks } from "./CategoryLinks.js";

function links() {
  return (
    <>
      <Chip asChild variant="tag">
        <a href="/project?category=PHP">PHP</a>
      </Chip>
      <Chip asChild variant="tag">
        <a href="/project?category=Laravel">Laravel</a>
      </Chip>
    </>
  );
}

describe("CategoryLinks", () => {
  it("renders the title, description and links", () => {
    render(
      <CategoryLinks title="دسته‌بندی‌های مرتبط" description="زمینه‌های تخصصی این آگهی">
        {links()}
      </CategoryLinks>,
    );

    expect(screen.getByRole("heading", { name: "دسته‌بندی‌های مرتبط" })).toBeInTheDocument();
    expect(screen.getByText("زمینه‌های تخصصی این آگهی")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "PHP" })).toHaveAttribute(
      "href",
      "/project?category=PHP",
    );
  });

  it("brings its own divider instead of a card", () => {
    const { container } = render(<CategoryLinks title="دسته‌ها">{links()}</CategoryLinks>);

    expect(container.querySelector('[data-slot="category-links"]')).toHaveClass("border-t", "pt-6");
  });

  it("renders the icon square only when given an icon", () => {
    const { container, rerender } = render(
      <CategoryLinks title="دسته‌ها">{links()}</CategoryLinks>,
    );
    expect(container.querySelector(".bg-blue-50")).toBeNull();

    rerender(
      <CategoryLinks title="دسته‌ها" icon={<svg aria-hidden="true" />}>
        {links()}
      </CategoryLinks>,
    );
    expect(container.querySelector(".bg-blue-50")).not.toBeNull();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <CategoryLinks ref={ref} title="دسته‌ها">
        {links()}
      </CategoryLinks>,
    );

    expect(ref.current).toHaveAttribute("data-slot", "category-links");
  });

  it("renders on the server", () => {
    expect(renderToString(<CategoryLinks title="دسته‌ها">{links()}</CategoryLinks>)).toContain(
      "Laravel",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <CategoryLinks title="دسته‌بندی‌های مرتبط" description="زمینه‌های تخصصی">
        {links()}
      </CategoryLinks>,
    );

    await expectNoAxeViolations(container);
  });
});
