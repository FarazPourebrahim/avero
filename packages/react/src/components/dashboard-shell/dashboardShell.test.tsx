import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { DashboardShell } from "./DashboardShell.js";

describe("DashboardShell", () => {
  it("puts the content card in a main landmark beside the sidebar", () => {
    const { container } = render(
      <DashboardShell sidebar={<nav aria-label="داشبورد">منو</nav>}>
        <h1>پیشخوان فریلنسر</h1>
      </DashboardShell>,
    );

    expect(screen.getByRole("main")).toHaveAttribute("data-slot", "container");
    expect(container.querySelector('[data-slot="dashboard-shell-content"]')).toHaveClass(
      "lg:col-span-2",
      "bg-white",
      "min-w-0",
    );
    expect(screen.getByRole("heading", { name: "پیشخوان فریلنسر" })).toBeInTheDocument();
  });

  it("shows the sidebar only from lg and the mobile bar only below it", () => {
    const { container } = render(
      <DashboardShell sidebar={<span>کناری</span>} mobileBar={<span>نوار موبایل</span>} />,
    );

    expect(container.querySelector('[data-slot="dashboard-shell-sidebar"]')).toHaveClass(
      "hidden",
      "lg:flex",
    );
    expect(container.querySelector('[data-slot="dashboard-shell-mobile-bar"]')).toHaveClass(
      "lg:hidden",
      "rounded-3xl",
    );
  });

  it("omits both columns when they are not given", () => {
    const { container } = render(<DashboardShell>محتوا</DashboardShell>);

    expect(container.querySelector('[data-slot="dashboard-shell-sidebar"]')).toBeNull();
    expect(container.querySelector('[data-slot="dashboard-shell-mobile-bar"]')).toBeNull();
  });

  it("uses the dashboard's tighter gutters", () => {
    render(<DashboardShell>محتوا</DashboardShell>);

    expect(screen.getByRole("main")).toHaveClass("px-3", "sm:px-6", "lg:px-8", "max-w-7xl");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<DashboardShell ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "dashboard-shell");
  });

  it("renders on the server", () => {
    expect(renderToString(<DashboardShell>محتوا</DashboardShell>)).toContain("<main");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <DashboardShell sidebar={<nav aria-label="داشبورد">منو</nav>}>
        <h1>پیشخوان</h1>
      </DashboardShell>,
    );

    await expectNoAxeViolations(container);
  });
});
