import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { PromoBanner } from "./PromoBanner.js";

const PROPS = { href: "/workshops", image: "/banner.webp", label: "ثبت‌نام در کارگاه" };

describe("PromoBanner", () => {
  it("names the link and the image with the label", () => {
    render(<PromoBanner {...PROPS} />);

    expect(screen.getByRole("link", { name: "ثبت‌نام در کارگاه" })).toHaveAttribute(
      "href",
      "/workshops",
    );
    expect(screen.getByAltText("ثبت‌نام در کارگاه")).toBeInTheDocument();
  });

  it("hides the listing banner below the md breakpoint", () => {
    const { container } = render(<PromoBanner {...PROPS} />);

    expect(container.querySelector('[data-slot="promo-banner"]')).toHaveClass("hidden", "md:block");
  });

  it("gives the project banner its shadow and hover fade", () => {
    const { container } = render(<PromoBanner {...PROPS} variant="project" />);

    expect(container.querySelector('[data-slot="promo-banner"]')).toHaveClass(
      "block",
      "rounded-2xl",
    );
    expect(container.querySelector("img")).toHaveClass("shadow-sm", "hover:opacity-95");
  });

  it("sets no height, so the artwork keeps its aspect ratio", () => {
    const { container } = render(<PromoBanner {...PROPS} />);
    const banner = container.querySelector('[data-slot="promo-banner"]');

    expect(banner?.className).not.toMatch(/\bh-/);
    expect(container.querySelector("img")?.className).not.toMatch(/\bh-/);
  });

  it("merges a custom class name, e.g. to make the banner sticky", () => {
    const { container } = render(
      <PromoBanner {...PROPS} variant="project" className="lg:sticky lg:top-4" />,
    );

    expect(container.querySelector('[data-slot="promo-banner"]')).toHaveClass("lg:sticky");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(<PromoBanner {...PROPS} ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "promo-banner");
  });

  it("renders on the server", () => {
    expect(renderToString(<PromoBanner {...PROPS} />)).toContain("ثبت‌نام در کارگاه");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<PromoBanner {...PROPS} variant="project" />);

    await expectNoAxeViolations(container);
  });
});
