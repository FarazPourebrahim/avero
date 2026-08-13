import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { AuthorCard } from "./AuthorCard.js";

const PROPS = {
  name: "سارا محمدی",
  image: "/avatar.jpg",
  roleLabel: "سردبیر وبلاگ",
  bio: "طراح محصول و علاقه‌مند به آموزش هستم.",
};

describe("AuthorCard", () => {
  it("renders the name as a heading, with the role and biography", () => {
    render(<AuthorCard {...PROPS} />);

    expect(screen.getByRole("heading", { name: "سارا محمدی" })).toBeInTheDocument();
    expect(screen.getByText("سردبیر وبلاگ")).toBeInTheDocument();
    expect(screen.getByText(/علاقه‌مند به آموزش/)).toBeInTheDocument();
  });

  it("keeps the card's slot name and centred surface", () => {
    const { container } = render(<AuthorCard {...PROPS} />);
    const root = container.querySelector('[data-slot="author-card"]');

    expect(root).toHaveClass("rounded-3xl", "border-gray-100", "p-6", "text-center");
    expect(container.querySelector('[data-slot="card"]')).toBeNull();
  });

  it("omits the role and biography when they are not given", () => {
    const { container } = render(<AuthorCard name="علی کریمی" />);

    expect(container.querySelector('[data-slot="author-card-role"]')).toBeNull();
    expect(container.querySelector('[data-slot="author-card-bio"]')).toBeNull();
  });

  it("falls back to the name's initials without an image", () => {
    render(<AuthorCard name="علی کریمی" />);

    expect(screen.getByRole("img", { name: "علی کریمی" })).toHaveTextContent("عک");
  });

  it("merges a custom class name", () => {
    const { container } = render(<AuthorCard {...PROPS} className="mt-6" />);

    expect(container.querySelector('[data-slot="author-card"]')).toHaveClass("mt-6");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<AuthorCard {...PROPS} ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "author-card");
  });

  it("renders on the server", () => {
    expect(renderToString(<AuthorCard {...PROPS} />)).toContain("سردبیر وبلاگ");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<AuthorCard {...PROPS} />);

    await expectNoAxeViolations(container);
  });
});
