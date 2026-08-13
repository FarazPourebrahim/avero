import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { PillTab, PillTabs } from "./PillTabs.js";

function ProfileTabs({ current = "certificates" }: { current?: string }) {
  return (
    <PillTabs aria-label="بخش‌های پروفایل">
      <PillTab href="/about" current={current === "about"}>
        درباره من
      </PillTab>
      <PillTab href="/courses" current={current === "courses"}>
        دوره‌ها (3)
      </PillTab>
      <PillTab href="/certificates" current={current === "certificates"}>
        گواهی‌ها (2)
      </PillTab>
    </PillTabs>
  );
}

function rect(left: number, width: number): DOMRect {
  return {
    left,
    right: left + width,
    width,
    top: 0,
    bottom: 40,
    height: 40,
    x: left,
    y: 0,
  } as DOMRect;
}

describe("PillTabs", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a labelled, horizontally scrollable navigation", () => {
    render(<ProfileTabs />);
    const nav = screen.getByRole("navigation", { name: "بخش‌های پروفایل" });

    expect(nav).toHaveClass("overflow-x-auto", "scrollbar-hidden");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("fills the current tab and marks it", () => {
    render(<ProfileTabs />);
    const current = screen.getByRole("link", { name: "گواهی‌ها (2)" });

    expect(current).toHaveAttribute("aria-current", "page");
    expect(current).toHaveClass("bg-blue-600", "text-white");
    expect(screen.getByRole("link", { name: "درباره من" })).toHaveClass("bg-slate-50");
  });

  it("scrolls the row so an off-screen current tab becomes visible", () => {
    const scrollBy = vi.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollBy", {
      value: scrollBy,
      configurable: true,
    });
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
      this: HTMLElement,
    ) {
      return this.tagName === "NAV" ? rect(0, 200) : rect(300, 100);
    });

    render(<ProfileTabs />);

    expect(scrollBy).toHaveBeenCalledWith({ left: 250 });
  });

  it("does not scroll when the current tab is already visible", () => {
    const scrollBy = vi.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollBy", {
      value: scrollBy,
      configurable: true,
    });
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
      this: HTMLElement,
    ) {
      return this.tagName === "NAV" ? rect(0, 400) : rect(50, 100);
    });

    render(<ProfileTabs />);

    expect(scrollBy).not.toHaveBeenCalled();
  });

  it("renders an icon before the label", () => {
    render(
      <PillTabs aria-label="tabs">
        <PillTab href="/" icon={<svg data-testid="icon" aria-hidden="true" />}>
          label
        </PillTab>
      </PillTabs>,
    );

    expect(screen.getByRole("link").firstChild).toBe(screen.getByTestId("icon"));
  });

  it("styles a router link with asChild", () => {
    render(
      <PillTabs aria-label="tabs">
        <PillTab asChild current>
          <a href="/x">router</a>
        </PillTab>
      </PillTabs>,
    );

    expect(screen.getByRole("link", { name: "router" })).toHaveAttribute("aria-current", "page");
  });

  it("forwards refs", () => {
    const navRef = createRef<HTMLElement>();
    const tabRef = createRef<HTMLAnchorElement>();
    render(
      <PillTabs ref={navRef} aria-label="tabs">
        <PillTab ref={tabRef} href="/">
          tab
        </PillTab>
      </PillTabs>,
    );

    expect(navRef.current?.tagName).toBe("NAV");
    expect(tabRef.current?.tagName).toBe("A");
  });

  it("renders on the server", () => {
    expect(renderToString(<ProfileTabs />)).toContain('aria-current="page"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ProfileTabs />);

    await expectNoAxeViolations(container);
  });
});
