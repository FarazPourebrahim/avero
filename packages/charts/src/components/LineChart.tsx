"use client";

import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { chartAxis, chartGrid, chartStrokeWidth } from "../theme.js";
import { seriesColor, type CartesianChartProps } from "./AreaChart.js";
import { ChartDataTable } from "./ChartDataTable.js";
import { ChartTooltip } from "./ChartTooltip.js";

/**
 * Line chart (C-03, R-02): the same grid, axes and palette as the area chart, without the fill.
 * The reference draws no dots, so points appear only in the tooltip.
 */
export function LineChart({
  data,
  series,
  xKey = "name",
  label,
  hideTooltip = false,
  reversed,
}: CartesianChartProps) {
  return (
    <div data-slot="chart" className="relative h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data as Record<string, unknown>[]}
          accessibilityLayer
          title={label}
        >
          <CartesianGrid
            stroke={chartGrid.stroke}
            strokeDasharray={chartGrid.strokeDasharray}
            vertical={chartGrid.vertical}
          />
          <XAxis
            dataKey={xKey}
            reversed={reversed}
            tick={chartAxis.tick}
            axisLine={chartAxis.axisLine}
            tickLine={chartAxis.tickLine}
          />
          <YAxis
            width={30}
            orientation={reversed ? "right" : "left"}
            tick={chartAxis.tick}
            axisLine={chartAxis.axisLine}
            tickLine={chartAxis.tickLine}
          />
          {hideTooltip ? null : <ChartTooltip />}
          {series.map((entry, index) => (
            <Line
              key={entry.dataKey}
              type="monotone"
              dataKey={entry.dataKey}
              name={entry.name ?? entry.dataKey}
              stroke={seriesColor(entry, index)}
              strokeWidth={chartStrokeWidth}
              dot={false}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
      <ChartDataTable data={data} series={series} xKey={xKey} label={label} />
    </div>
  );
}

LineChart.displayName = "LineChart";
