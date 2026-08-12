import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Rating } from "../../components/rating/index.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ProviderCard } from "./ProviderCard.js";

const PROPS = {
  name: "نگار رضایی",
  headline: "مدرس طراحی رابط کاربری",
  stats: [
    { label: "تعداد دوره‌ها", value: "3" },
    { label: "امتیاز شرکت‌کنندگان", value: <Rating value={0} size="sm" /> },
  ],
  profileHref: "/instructors/negar",
};

describe("ProviderCard", () => {
  it("renders the identity row with the dictionary's eyebrow", () => {
    render(<ProviderCard {...PROPS} />);

    expect(screen.getByText("ارائه‌دهنده")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "نگار رضایی" })).toBeInTheDocument();
    expect(screen.getByText("مدرس طراحی رابط کاربری")).toBeInTheDocument();
  });

  it("lays the statistics out in a two-column grid", () => {
    const { container } = render(<ProviderCard {...PROPS} />);
    const grid = container.querySelector('[data-slot="provider-card-stats"]');

    expect(grid).toHaveClass("grid", "grid-cols-2");
    expect(grid?.querySelectorAll('[data-slot="mini-stat"]')).toHaveLength(2);
    expect(screen.getByText("تعداد دوره‌ها")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /۰٫۰۰/ })).toBeInTheDocument();
  });

  it("links to the profile with the dictionary's label", () => {
    render(<ProviderCard {...PROPS} />);

    expect(screen.getByRole("link", { name: /مشاهده پروفایل/ })).toHaveAttribute(
      "href",
      "/instructors/negar",
    );
  });

  it("accepts its own eyebrow and link text", () => {
    render(<ProviderCard {...PROPS} eyebrow="مدرس دوره" profileLabel="پروفایل" />);

    expect(screen.getByText("مدرس دوره")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "پروفایل" })).toBeInTheDocument();
  });

  it("omits the statistics grid and the link when they are not given", () => {
    const { container } = render(<ProviderCard name="نگار رضایی" />);

    expect(container.querySelector('[data-slot="provider-card-stats"]')).toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ProviderCard {...PROPS} ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "provider-card");
  });

  it("renders on the server", () => {
    expect(renderToString(<ProviderCard {...PROPS} />)).toContain("ارائه‌دهنده");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ProviderCard {...PROPS} />);

    await expectNoAxeViolations(container);
  });
});
