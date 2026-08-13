import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { RelatedItem, RelatedList } from "./RelatedList.js";

function items() {
  return (
    <>
      <RelatedItem
        title="طراحی سیستم طراحی"
        href="/courses/design-systems"
        image="/design-systems.png"
        price={3500000}
      />
      <RelatedItem title="اصول تایپوگرافی" href="/courses/typography" meta={<span>رایگان</span>} />
    </>
  );
}

describe("RelatedList", () => {
  it("renders the titled panel over its rows", () => {
    render(<RelatedList title="دوره‌های مرتبط">{items()}</RelatedList>);

    expect(screen.getByRole("heading", { name: "دوره‌های مرتبط" })).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("formats a row's price with the locale's digits", () => {
    render(<RelatedList title="دوره‌های مرتبط">{items()}</RelatedList>);

    expect(screen.getByText(/۳٬۵۰۰٬۰۰۰/)).toBeInTheDocument();
  });

  it("lets a row show something other than a price", () => {
    render(<RelatedList title="دوره‌های مرتبط">{items()}</RelatedList>);

    expect(screen.getByText("رایگان")).toBeInTheDocument();
  });

  it("names each row by its title, not its thumbnail", () => {
    render(<RelatedList title="دوره‌های مرتبط">{items()}</RelatedList>);

    expect(screen.getByRole("link", { name: /طراحی سیستم طراحی/ })).toHaveAttribute(
      "href",
      "/courses/design-systems",
    );
  });

  it("renders header actions when given", () => {
    render(
      <RelatedList title="دوره‌های مرتبط" actions={<a href="/courses">همه</a>}>
        {items()}
      </RelatedList>,
    );

    expect(screen.getByRole("link", { name: "همه" })).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLElement>();
    render(
      <RelatedList ref={ref} title="دوره‌های مرتبط">
        {items()}
      </RelatedList>,
    );

    expect(ref.current).toHaveAttribute("data-slot", "related-list");
  });

  it("renders on the server", () => {
    expect(renderToString(<RelatedList title="دوره‌های مرتبط">{items()}</RelatedList>)).toContain(
      "اصول تایپوگرافی",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<RelatedList title="دوره‌های مرتبط">{items()}</RelatedList>);

    await expectNoAxeViolations(container);
  });
});
