import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ListingCard } from "./ListingCard.js";

const PROPS = {
  title: "مبانی طراحی رابط کاربری",
  href: "/courses/ui-basics",
  category: "طراحی",
  excerpt: "<p>از اصول چیدمان و رنگ تا نخستین نمونه اولیه</p>",
  authorName: "سارا محمدی",
  price: 4_500_000,
  likes: 0,
};

describe("ListingCard", () => {
  it("renders the whole card as one link named by the title", () => {
    render(<ListingCard {...PROPS} />);
    const link = screen.getByRole("link", { name: "مبانی طراحی رابط کاربری" });

    expect(link).toHaveAttribute("href", "/courses/ui-basics");
    // One link surface, not a card wrapping several links.
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("strips HTML from the excerpt", () => {
    const { container } = render(<ListingCard {...PROPS} />);
    const excerpt = container.querySelector('[data-slot="listing-card-excerpt"]');

    expect(excerpt).toHaveTextContent("از اصول چیدمان و رنگ تا نخستین نمونه اولیه");
    expect(excerpt?.textContent).not.toContain("<p>");
  });

  it("shows the category, author and like count", () => {
    render(<ListingCard {...PROPS} />);

    expect(screen.getByText("طراحی")).toBeInTheDocument();
    expect(screen.getByText("سارا محمدی")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("formats the price as «از … تومان»", () => {
    render(<ListingCard {...PROPS} />);

    expect(screen.getByText("از")).toBeInTheDocument();
    expect(screen.getByText("۴٬۵۰۰٬۰۰۰")).toBeInTheDocument();
    expect(screen.getByText("تومان")).toBeInTheDocument();
  });

  it("carries the glass surface", () => {
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
    expect(renderToString(<ListingCard {...PROPS} />)).toContain("مبانی طراحی رابط کاربری");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ListingCard {...PROPS} />);

    await expectNoAxeViolations(container);
  });
});
