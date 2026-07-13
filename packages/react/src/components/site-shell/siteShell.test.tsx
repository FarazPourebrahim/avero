import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { SiteShell } from "./SiteShell.js";

describe("SiteShell", () => {
  it("renders a skip link, the header, the content and the footer in order", () => {
    const { container } = render(
      <SiteShell header={<header>سربرگ</header>} footer={<footer>پاورقی</footer>}>
        <main id="main-content">محتوا</main>
      </SiteShell>,
    );
    const skip = screen.getByRole("link", { name: "رفتن به محتوای اصلی" });

    expect(skip).toHaveAttribute("href", "#main-content");
    expect(skip).toHaveClass("sr-only", "focus:not-sr-only");
    expect(container.firstElementChild?.children).toHaveLength(4);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("points the skip link at a custom main id", () => {
    render(<SiteShell mainId="panel" />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "#panel");
  });

  it("accepts a custom skip label", () => {
    render(<SiteShell skipLabel="پرش" />);

    expect(screen.getByRole("link", { name: "پرش" })).toBeInTheDocument();
  });

  it("uses the English dictionary under an English provider", () => {
    render(
      <AveroProvider locale="en-US">
        <SiteShell />
      </AveroProvider>,
    );

    expect(screen.getByRole("link", { name: "Skip to content" })).toBeInTheDocument();
  });

  it("can hide the skip link", () => {
    const { container } = render(<SiteShell skipLink={false} />);

    expect(container.querySelector('[data-slot="site-shell-skip-link"]')).toBeNull();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<SiteShell ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "site-shell");
  });

  it("renders on the server", () => {
    expect(renderToString(<SiteShell>x</SiteShell>)).toContain("رفتن به محتوای اصلی");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <SiteShell header={<header>سربرگ</header>} footer={<footer>پاورقی</footer>}>
        <main id="main-content">
          <h1>عنوان</h1>
        </main>
      </SiteShell>,
    );

    await expectNoAxeViolations(container);
  });
});
