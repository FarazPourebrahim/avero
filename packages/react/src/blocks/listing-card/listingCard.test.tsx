import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ListingCard } from "./ListingCard.js";

const PROPS = {
  title: "طراحی سایت و سئو",
  href: "/services/seo",
  category: "سئو",
  excerpt: "<p>انواع طراحی سایت و سئو اعم از فروشگاهی، شرکتی و شخصی</p>",
  authorName: "زینب فلاح",
  price: 20_000_000,
  likes: 0,
};

describe("ListingCard", () => {
  it("renders the whole card as one link named by the title", () => {
    render(<ListingCard {...PROPS} />);
    const link = screen.getByRole("link", { name: "طراحی سایت و سئو" });

    expect(link).toHaveAttribute("href", "/services/seo");
    // The reference's glass card: one link surface, not a card wrapping several links.
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("strips HTML from the excerpt (deviation V-03)", () => {
    const { container } = render(<ListingCard {...PROPS} />);
    const excerpt = container.querySelector('[data-slot="listing-card-excerpt"]');

    expect(excerpt).toHaveTextContent("انواع طراحی سایت و سئو اعم از فروشگاهی، شرکتی و شخصی");
    expect(excerpt?.textContent).not.toContain("<p>");
  });

  it("shows the category, author and like count", () => {
    render(<ListingCard {...PROPS} />);

    expect(screen.getByText("سئو")).toBeInTheDocument();
    expect(screen.getByText("زینب فلاح")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("formats the price as the reference's «از … تومان»", () => {
    render(<ListingCard {...PROPS} />);

    expect(screen.getByText("از")).toBeInTheDocument();
    expect(screen.getByText("۲۰٬۰۰۰٬۰۰۰")).toBeInTheDocument();
    expect(screen.getByText("تومان")).toBeInTheDocument();
  });

  it("carries the reference's glass surface", () => {
    render(<ListingCard {...PROPS} />);

    expect(screen.getByRole("link", { name: PROPS.title })).toHaveClass(
      "bg-surface-glass",
      "rounded-2xl",
      "border-white",
      "p-3",
    );
  });

  it("omits optional parts when they are not given", () => {
    const { container } = render(<ListingCard title="بدون جزئیات" href="/x" />);

    expect(container.querySelector('[data-slot="listing-card-excerpt"]')).toBeNull();
    expect(container.querySelector('[data-slot="listing-card-author"]')).toBeNull();
    expect(screen.getByRole("link", { name: "بدون جزئیات" })).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLElement>();
    render(<ListingCard {...PROPS} ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "listing-card");
  });

  it("renders on the server", () => {
    expect(renderToString(<ListingCard {...PROPS} />)).toContain("طراحی سایت و سئو");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ListingCard {...PROPS} />);

    await expectNoAxeViolations(container);
  });
});
