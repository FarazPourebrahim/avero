import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../test/axe.js";
import { ChartCard } from "./ChartCard.js";

describe("ChartCard", () => {
  it("renders the reference card with a title, actions and a fixed-height body", () => {
    const { container } = render(
      <ChartCard title="آنالیتیکس خدمات" actions={<button type="button">بازدید</button>}>
        <div>نمودار</div>
      </ChartCard>,
    );

    expect(container.firstElementChild).toHaveClass(
      "rounded-2xl",
      "border-gray-100",
      "bg-white",
      "p-3.5",
    );
    expect(screen.getByRole("heading", { name: "آنالیتیکس خدمات" })).toHaveClass("font-bold");
    expect(container.querySelector('[data-slot="chart-card-body"]')).toHaveClass("h-44", "sm:h-52");
    expect(screen.getByText("نمودار")).toBeInTheDocument();
  });

  it("uses the shorter body for the trend card", () => {
    const { container } = render(<ChartCard size="sm">chart</ChartCard>);

    expect(container.querySelector('[data-slot="chart-card-body"]')).toHaveClass("h-40", "sm:h-48");
  });

  it("swaps the chart for the empty state", () => {
    const { container } = render(
      <ChartCard empty emptyState={<p>داده‌ای برای نمایش وجود ندارد</p>}>
        <div>نمودار</div>
      </ChartCard>,
    );

    expect(container.firstElementChild).toHaveAttribute("data-state", "empty");
    expect(screen.getByText("داده‌ای برای نمایش وجود ندارد")).toBeInTheDocument();
    expect(screen.queryByText("نمودار")).toBeNull();
  });

  it("swaps the chart for the loading state, which wins over empty", () => {
    const { container } = render(
      <ChartCard loading empty loadingState={<p>در حال بارگذاری</p>} emptyState={<p>خالی</p>}>
        <div>نمودار</div>
      </ChartCard>,
    );

    expect(container.firstElementChild).toHaveAttribute("data-state", "loading");
    expect(screen.getByText("در حال بارگذاری")).toBeInTheDocument();
    expect(screen.queryByText("خالی")).toBeNull();
  });

  it("omits the header when there is no title or actions", () => {
    const { container } = render(<ChartCard>chart</ChartCard>);

    expect(container.querySelector('[data-slot="chart-card-title"]')).toBeNull();
    expect(container.querySelector('[data-slot="chart-card-actions"]')).toBeNull();
    expect(container.firstElementChild).toHaveAttribute("data-state", "ready");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ChartCard ref={ref}>chart</ChartCard>);

    expect(ref.current).toHaveAttribute("data-slot", "chart-card");
  });

  it("renders on the server", () => {
    expect(renderToString(<ChartCard title="آنالیتیکس">chart</ChartCard>)).toContain("آنالیتیکس");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ChartCard title="آنالیتیکس خدمات" actions={<button type="button">بازدید</button>}>
        <div>نمودار</div>
      </ChartCard>,
    );

    await expectNoAxeViolations(container);
  });
});
