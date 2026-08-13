import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Link } from "../link/Link.js";
import { SiteHeader, SiteHeaderMenuButton } from "./SiteHeader.js";

function Header(props: { sticky?: boolean }) {
  return (
    <SiteHeader
      {...props}
      menu={<SiteHeaderMenuButton aria-label="باز کردن منو" />}
      logo={
        <a href="/" aria-label="Avero">
          لوگو
        </a>
      }
      nav={
        <>
          <Link variant="nav" href="/">
            خانه
          </Link>
          <Link variant="nav" href="/blog" aria-current="page">
            وبلاگ
          </Link>
        </>
      }
      actions={
        <a href="/dashboard" title="پیشخوان">
          پیشخوان
        </a>
      }
    />
  );
}

describe("SiteHeader", () => {
  it("renders a sticky, blurred banner with its slots", () => {
    render(<Header />);
    const header = screen.getByRole("banner");

    expect(header).toHaveClass("sticky", "top-12", "backdrop-blur-2xl", "z-(--z-sticky)");
    expect(screen.getByRole("navigation")).toHaveClass("hidden", "md:flex", "gap-10");
    expect(screen.getByRole("link", { name: "Avero" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "پیشخوان" })).toBeInTheDocument();
  });

  it("marks the current page in the navigation", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "وبلاگ" })).toHaveAttribute("aria-current", "page");
  });

  it("can opt out of sticking", () => {
    render(<Header sticky={false} />);

    expect(screen.getByRole("banner")).not.toHaveClass("sticky");
  });

  it("omits empty slots", () => {
    const { container } = render(<SiteHeader logo={<span>لوگو</span>} />);

    expect(container.querySelector('[data-slot="site-header-nav"]')).toBeNull();
    expect(container.querySelector('[data-slot="site-header-actions"]')).toBeNull();
  });

  it("hides the menu button from md up", () => {
    render(<Header />);

    expect(screen.getByRole("button", { name: "باز کردن منو" })).toHaveClass(
      "md:hidden",
      "rounded-xl",
      "border-gray-200",
    );
  });

  it("styles a custom child with asChild", () => {
    render(
      <SiteHeaderMenuButton asChild>
        <a href="/menu">منو</a>
      </SiteHeaderMenuButton>,
    );
    const link = screen.getByRole("link", { name: "منو" });

    expect(link).toHaveAttribute("data-slot", "site-header-menu-button");
    expect(link).not.toHaveAttribute("type");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLElement>();
    render(<SiteHeader ref={ref} />);

    expect(ref.current?.tagName).toBe("HEADER");
  });

  it("renders on the server", () => {
    expect(renderToString(<Header />)).toContain('data-slot="site-header"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Header />);

    await expectNoAxeViolations(container);
  });
});
