import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { SidebarNav, SidebarNavItem } from "./SidebarNav.js";

function Sidebar({ onLogout = () => {} }: { onLogout?: () => void }) {
  return (
    <SidebarNav aria-label="منوی داشبورد">
      <SidebarNavItem href="/dashboard" current icon={<svg aria-hidden="true" />}>
        پیشخوان
      </SidebarNavItem>
      <SidebarNavItem href="/profile">مشاهده پروفایل</SidebarNavItem>
      <SidebarNavItem tone="danger" onClick={onLogout}>
        خروج از حساب
      </SidebarNavItem>
    </SidebarNav>
  );
}

describe("SidebarNav", () => {
  it("renders a labelled navigation landmark with a list of items", () => {
    render(<Sidebar />);

    expect(screen.getByRole("navigation", { name: "منوی داشبورد" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("marks and fills the current item", () => {
    render(<Sidebar />);
    const current = screen.getByRole("link", { name: "پیشخوان" });

    expect(current).toHaveAttribute("aria-current", "page");
    expect(current).toHaveClass("bg-primary", "text-white", "shadow-md");
  });

  it("tints idle items on hover", () => {
    render(<Sidebar />);
    const idle = screen.getByRole("link", { name: "مشاهده پروفایل" });

    expect(idle).not.toHaveAttribute("aria-current");
    expect(idle).toHaveClass("text-zinc-600", "hover:bg-primary/10");
  });

  it("renders the danger item as a button", async () => {
    const onLogout = vi.fn();
    render(<Sidebar onLogout={onLogout} />);
    const logout = screen.getByRole("button", { name: "خروج از حساب" });

    await userEvent.click(logout);

    expect(logout).toHaveClass("text-red-500", "hover:bg-red-500/95");
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it("styles a router link with asChild", () => {
    render(
      <SidebarNav aria-label="nav">
        <SidebarNavItem asChild current>
          <a href="/x">router link</a>
        </SidebarNavItem>
      </SidebarNav>,
    );

    expect(screen.getByRole("link", { name: "router link" })).toHaveClass("bg-primary");
  });

  it("forwards refs", () => {
    const navRef = createRef<HTMLElement>();
    const itemRef = createRef<HTMLElement>();
    render(
      <SidebarNav ref={navRef} aria-label="nav">
        <SidebarNavItem ref={itemRef} href="/">
          home
        </SidebarNavItem>
      </SidebarNav>,
    );

    expect(navRef.current?.tagName).toBe("NAV");
    expect(itemRef.current?.tagName).toBe("A");
  });

  it("renders on the server", () => {
    expect(renderToString(<Sidebar />)).toContain('aria-current="page"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Sidebar />);

    await expectNoAxeViolations(container);
  });
});
