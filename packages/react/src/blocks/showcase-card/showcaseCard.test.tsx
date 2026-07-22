import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ShowcaseCard } from "./ShowcaseCard.js";

const PROPS = {
  title: "طراحی سایت و سئو",
  href: "/portfolio/seo",
  description: "طراحی سایت برای خدمات طراحی سایت و سئو",
  tags: ["وردپرس"],
  likes: 0,
};

describe("ShowcaseCard", () => {
  it("links from the title rather than wrapping the whole card", () => {
    render(<ShowcaseCard {...PROPS} onShare={() => {}} />);

    // One link (the title) and the action buttons as siblings, never nested inside it.
    expect(screen.getByRole("link", { name: "طراحی سایت و سئو" })).toHaveAttribute(
      "href",
      "/portfolio/seo",
    );
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("button", { name: "اشتراک‌گذاری" })).toBeInTheDocument();
  });

  it("renders the cover with the group zoom the reference uses", () => {
    const { container } = render(<ShowcaseCard {...PROPS} image="/cover.png" />);

    expect(container.querySelector("img")).toHaveClass("group-hover:scale-105", "object-cover");
  });

  it("shows the overlay call to action from the dictionary", () => {
    render(<ShowcaseCard {...PROPS} />);

    expect(screen.getByText("مشاهده جزئیات کامل")).toBeInTheDocument();
  });

  it("renders technology tags as mini chips", () => {
    const { container } = render(<ShowcaseCard {...PROPS} tags={["وردپرس", "سئو"]} />);

    expect(container.querySelectorAll('[data-slot="showcase-card-tags"] > *')).toHaveLength(2);
    expect(screen.getByText("سئو")).toHaveClass("text-3xs", "bg-slate-100");
  });

  it("reports likes and shares", async () => {
    const onLike = vi.fn();
    const onShare = vi.fn();
    render(<ShowcaseCard {...PROPS} likes={4} onLike={onLike} onShare={onShare} />);

    await userEvent.click(screen.getByRole("button", { name: "پسندیدن" }));
    await userEvent.click(screen.getByRole("button", { name: "اشتراک‌گذاری" }));

    expect(onLike).toHaveBeenCalledOnce();
    expect(onShare).toHaveBeenCalledOnce();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("exposes the liked state", () => {
    render(<ShowcaseCard {...PROPS} liked />);

    expect(screen.getByRole("button", { name: "پسندیدن" })).toHaveAttribute("aria-pressed", "true");
  });

  it("renders a report slot supplied by the consumer", () => {
    render(<ShowcaseCard {...PROPS} report={<button type="button">گزارش تخلف</button>} />);

    expect(screen.getByRole("button", { name: "گزارش تخلف" })).toBeInTheDocument();
  });

  it("omits optional parts when they are not given", () => {
    const { container } = render(<ShowcaseCard title="بدون جزئیات" />);

    expect(container.querySelector('[data-slot="showcase-card-tags"]')).toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.queryByRole("button", { name: "پسندیدن" })).toBeNull();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ShowcaseCard {...PROPS} ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "showcase-card");
  });

  it("renders on the server", () => {
    expect(renderToString(<ShowcaseCard {...PROPS} />)).toContain("طراحی سایت و سئو");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ShowcaseCard {...PROPS} onShare={() => {}} />);

    await expectNoAxeViolations(container);
  });
});
