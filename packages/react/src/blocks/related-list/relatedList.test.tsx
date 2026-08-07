import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { RelatedItem, RelatedList } from "./RelatedList.js";

function items() {
  return (
    <>
      <RelatedItem title="سئو SEO سایت" href="/services/seo" image="/seo.png" price={35000000} />
      <RelatedItem title="طراحی لوگو" href="/services/logo" meta={<span>توافقی</span>} />
    </>
  );
}

describe("RelatedList", () => {
  it("renders the titled panel over its rows", () => {
    render(<RelatedList title="خدمات مرتبط">{items()}</RelatedList>);

    expect(screen.getByRole("heading", { name: "خدمات مرتبط" })).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("formats a row's price with the locale's digits", () => {
    render(<RelatedList title="خدمات مرتبط">{items()}</RelatedList>);

    expect(screen.getByText(/۳۵٬۰۰۰٬۰۰۰/)).toBeInTheDocument();
  });

  it("lets a row show something other than a price", () => {
    render(<RelatedList title="خدمات مرتبط">{items()}</RelatedList>);

    expect(screen.getByText("توافقی")).toBeInTheDocument();
  });

  it("names each row by its title, not its thumbnail", () => {
    render(<RelatedList title="خدمات مرتبط">{items()}</RelatedList>);

    expect(screen.getByRole("link", { name: /سئو SEO سایت/ })).toHaveAttribute(
      "href",
      "/services/seo",
    );
  });

  it("renders header actions when given", () => {
    render(
      <RelatedList title="خدمات مرتبط" actions={<a href="/services">همه</a>}>
        {items()}
      </RelatedList>,
    );

    expect(screen.getByRole("link", { name: "همه" })).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLElement>();
    render(
      <RelatedList ref={ref} title="خدمات مرتبط">
        {items()}
      </RelatedList>,
    );

    expect(ref.current).toHaveAttribute("data-slot", "related-list");
  });

  it("renders on the server", () => {
    expect(renderToString(<RelatedList title="خدمات مرتبط">{items()}</RelatedList>)).toContain(
      "طراحی لوگو",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<RelatedList title="خدمات مرتبط">{items()}</RelatedList>);

    await expectNoAxeViolations(container);
  });
});
