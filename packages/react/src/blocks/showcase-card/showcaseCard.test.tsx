import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ShowcaseCard } from "./ShowcaseCard.js";

const PROPS = {
  title: "اپلیکیشن مدیریت کارها",
  href: "/showcase/task-app",
  description: "طراحی رابط کاربری برای یک اپلیکیشن مدیریت کارهای روزانه",
  tags: ["Figma"],
  likes: 0,
};

describe("ShowcaseCard", () => {
  it("links from the title rather than wrapping the whole card", () => {
    render(<ShowcaseCard {...PROPS} onShare={() => {}} />);

    // One link (the title) and the action buttons as siblings, never nested inside it.
    expect(screen.getByRole("link", { name: "اپلیکیشن مدیریت کارها" })).toHaveAttribute(
      "href",
      "/showcase/task-app",
    );
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("button", { name: "اشتراک‌گذاری" })).toBeInTheDocument();
  });

  it("zooms the cover when the card is hovered", () => {
    const { container } = render(<ShowcaseCard {...PROPS} image="/cover.png" />);

    expect(container.querySelector("img")).toHaveClass("group-hover:scale-105", "object-cover");
  });

  it("shows the overlay call to action from the dictionary", () => {
    render(<ShowcaseCard {...PROPS} />);

    expect(screen.getByText("مشاهده جزئیات")).toBeInTheDocument();
  });

  it("renders technology tags as mini chips", () => {
    const { container } = render(<ShowcaseCard {...PROPS} tags={["Figma", "React"]} />);

    expect(container.querySelectorAll('[data-slot="showcase-card-tags"] > *')).toHaveLength(2);
    expect(screen.getByText("React")).toHaveClass("text-3xs", "bg-slate-100");
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
    render(<ShowcaseCard {...PROPS} report={<button type="button">گزارش</button>} />);

    expect(screen.getByRole("button", { name: "گزارش" })).toBeInTheDocument();
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
    expect(renderToString(<ShowcaseCard {...PROPS} />)).toContain("اپلیکیشن مدیریت کارها");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ShowcaseCard {...PROPS} onShare={() => {}} />);

    await expectNoAxeViolations(container);
  });
});
