import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Rating } from "../../components/rating/index.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ProviderCard } from "./ProviderCard.js";

const PROPS = {
  name: "زینب فلاح",
  headline: "طراحی سایت و سئو",
  stats: [
    { label: "تعداد خدمات", value: "1" },
    { label: "امتیاز رضایت", value: <Rating value={0} size="sm" /> },
  ],
  profileHref: "/freelancer/zeinab",
};

describe("ProviderCard", () => {
  it("renders the identity row with the dictionary's eyebrow", () => {
    render(<ProviderCard {...PROPS} />);

    expect(screen.getByText("ارائه‌دهنده خدمت")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "زینب فلاح" })).toBeInTheDocument();
    expect(screen.getByText("طراحی سایت و سئو")).toBeInTheDocument();
  });

  it("lays the statistics out in the reference's two-column grid", () => {
    const { container } = render(<ProviderCard {...PROPS} />);
    const grid = container.querySelector('[data-slot="provider-card-stats"]');

    expect(grid).toHaveClass("grid", "grid-cols-2");
    expect(grid?.querySelectorAll('[data-slot="mini-stat"]')).toHaveLength(2);
    expect(screen.getByText("تعداد خدمات")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /۰٫۰۰/ })).toBeInTheDocument();
  });

  it("links to the profile with the dictionary's label", () => {
    render(<ProviderCard {...PROPS} />);

    expect(screen.getByRole("link", { name: /مشاهده پروفایل/ })).toHaveAttribute(
      "href",
      "/freelancer/zeinab",
    );
  });

  it("accepts its own eyebrow and link text", () => {
    render(<ProviderCard {...PROPS} eyebrow="ارائه‌دهنده" profileLabel="پروفایل" />);

    expect(screen.getByText("ارائه‌دهنده")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "پروفایل" })).toBeInTheDocument();
  });

  it("omits the statistics grid and the link when they are not given", () => {
    const { container } = render(<ProviderCard name="زینب فلاح" />);

    expect(container.querySelector('[data-slot="provider-card-stats"]')).toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ProviderCard {...PROPS} ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "provider-card");
  });

  it("renders on the server", () => {
    expect(renderToString(<ProviderCard {...PROPS} />)).toContain("ارائه‌دهنده خدمت");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ProviderCard {...PROPS} />);

    await expectNoAxeViolations(container);
  });
});
