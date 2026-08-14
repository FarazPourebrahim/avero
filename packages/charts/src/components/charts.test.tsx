import { render, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { chartAxis, chartGrid, chartPalette, gradientId } from "../theme.js";
import { expectNoAxeViolations } from "../test/axe.js";
import { AreaChart, seriesColor } from "./AreaChart.js";
import { LineChart } from "./LineChart.js";

const DATA = [
  { name: "شنبه", views: 4, likes: 1 },
  { name: "یکشنبه", views: 7, likes: 3 },
  { name: "دوشنبه", views: 2, likes: 0 },
];

const SERIES = [
  { dataKey: "views", name: "بازدید", color: chartPalette.views },
  { dataKey: "likes", name: "لایک", color: chartPalette.likes },
];

function box(ui: React.ReactElement) {
  return render(<div style={{ width: 600, height: 300 }}>{ui}</div>);
}

describe("AreaChart", () => {
  it("draws one gradient-filled area per series", () => {
    const { container } = box(<AreaChart data={DATA} series={SERIES} label="آنالیتیکس" />);

    expect(container.querySelectorAll(".recharts-area")).toHaveLength(2);
    expect(container.querySelector(`#${gradientId("views")}`)).toBeInTheDocument();
    expect(container.querySelector(".recharts-area-area")).toHaveAttribute(
      "fill",
      `url(#${gradientId("views")})`,
    );
  });

  it("uses a dashed horizontal grid and slate ticks", () => {
    const { container } = box(<AreaChart data={DATA} series={SERIES} />);
    const gridLine = container.querySelector(".recharts-cartesian-grid-horizontal line");

    expect(gridLine).toHaveAttribute("stroke", chartGrid.stroke);
    expect(gridLine).toHaveAttribute("stroke-dasharray", chartGrid.strokeDasharray);
    expect(container.querySelector(".recharts-cartesian-grid-vertical")).toBeNull();
    expect(container.querySelector(".recharts-cartesian-axis-tick-value")).toHaveAttribute(
      "fill",
      chartAxis.tick.fill,
    );
  });

  it("describes the chart for assistive technology", () => {
    const { container } = box(<AreaChart data={DATA} series={SERIES} label="آنالیتیکس دوره‌ها" />);

    // Recharts renders the SVG's own <title> from the chart's `title` prop.
    expect(container.querySelector(".recharts-surface > title")).toHaveTextContent(
      "آنالیتیکس دوره‌ها",
    );
  });

  it("exposes the plotted values as a screen-reader-only data table", () => {
    const { container } = box(<AreaChart data={DATA} series={SERIES} label="آنالیتیکس دوره‌ها" />);
    const table = container.querySelector('[data-slot="chart-data-table"]');

    expect(table).toHaveClass("sr-only");
    expect(within(table as HTMLElement).getByRole("table")).toHaveAccessibleName(
      "آنالیتیکس دوره‌ها",
    );
    expect(
      within(table as HTMLElement).getByRole("columnheader", { name: "بازدید" }),
    ).toBeInTheDocument();
    expect(
      within(table as HTMLElement).getByRole("rowheader", { name: "شنبه" }),
    ).toBeInTheDocument();
    // Numbers are localised by the active Avero formatter, which defaults to Persian digits.
    expect(within(table as HTMLElement).getByText("۷")).toBeInTheDocument();
  });

  it("omits the data table when there is nothing to plot", () => {
    const { container } = box(<AreaChart data={[]} series={SERIES} label="آنالیتیکس" />);

    expect(container.querySelector('[data-slot="chart-data-table"]')).toBeNull();
  });

  it("can hide the tooltip", () => {
    const { container } = box(<AreaChart data={DATA} series={SERIES} hideTooltip />);

    expect(container.querySelector(".recharts-tooltip-wrapper")).toBeNull();
  });
});

describe("LineChart", () => {
  it("draws one stroked line per series, without dots", () => {
    const { container } = box(<LineChart data={DATA} series={SERIES} />);
    const line = container.querySelector(".recharts-line-curve");

    expect(container.querySelectorAll(".recharts-line")).toHaveLength(2);
    expect(line).toHaveAttribute("stroke", chartPalette.views);
    expect(line).toHaveAttribute("stroke-width", "2");
    expect(container.querySelector(".recharts-dot")).toBeNull();
  });
});

describe("chart theme", () => {
  it("falls back to the palette in order", () => {
    expect(seriesColor({ dataKey: "a" }, 0)).toBe(chartPalette.views);
    expect(seriesColor({ dataKey: "b" }, 1)).toBe(chartPalette.likes);
    expect(seriesColor({ dataKey: "c" }, 4)).toBe(chartPalette.views);
    expect(seriesColor({ dataKey: "d", color: chartPalette.comments }, 0)).toBe(
      chartPalette.comments,
    );
  });

  it("builds deterministic gradient ids", () => {
    expect(gradientId("views")).toBe("avero-chart-gradient-views");
  });
});

describe("charts accessibility", () => {
  it("have no violations", async () => {
    const { container } = box(<AreaChart data={DATA} series={SERIES} label="آنالیتیکس" />);

    await expectNoAxeViolations(container);
  });
});
