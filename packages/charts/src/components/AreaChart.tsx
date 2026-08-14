"use client";

import { useMemo } from "react";
import {
  Area,
  CartesianGrid,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  chartAreaFill,
  chartAxis,
  chartColors,
  chartGrid,
  chartStrokeWidth,
  gradientId,
} from "../theme.js";
import { ChartDataTable } from "./ChartDataTable.js";
import { ChartTooltip } from "./ChartTooltip.js";

/** One plotted series. */
export type ChartSeries = {
  /** Key in each data row. */
  dataKey: string;
  /** Series name, used by the tooltip. */
  name?: string;
  /** Line and fill colour. @defaultValue the next palette colour */
  color?: string;
};

/** Props shared by the cartesian charts. */
export type CartesianChartProps = {
  /** Rows of data; each row needs the x key and every series key. */
  data: ReadonlyArray<Record<string, unknown>>;
  /** Series to plot. */
  series: ReadonlyArray<ChartSeries>;
  /** Key holding the x value in each row. @defaultValue "name" */
  xKey?: string;
  /** Accessible description of the chart, announced in place of the SVG. */
  label?: string;
  /** Hides the tooltip. @defaultValue false */
  hideTooltip?: boolean;
  /**
   * Reverses the x axis. Dates usually run in ascending order across the axis even on an RTL
   * page, so this stays opt-in. @defaultValue false
   */
  reversed?: boolean;
};

export function seriesColor(series: ChartSeries, index: number): string {
  return series.color ?? chartColors[index % chartColors.length]!;
}

/**
 * Area chart: gradient fills from 30% to transparent, 2px strokes, a dashed
 * horizontal grid and 10px slate ticks. Sized by its container, so wrap it in `ChartCard`.
 */
export function AreaChart({
  data,
  series,
  xKey = "name",
  label,
  hideTooltip = false,
  reversed,
}: CartesianChartProps) {
  const gradients = useMemo(
    () =>
      series.map((entry, index) => ({
        id: gradientId(entry.dataKey),
        color: seriesColor(entry, index),
      })),
    [series],
  );

  return (
    <div data-slot="chart" className="relative h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart
          data={data as Record<string, unknown>[]}
          accessibilityLayer
          title={label}
        >
          <defs>
            {gradients.map((gradient) => (
              <linearGradient key={gradient.id} id={gradient.id} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={gradient.color}
                  stopOpacity={chartAreaFill.gradientFrom}
                />
                <stop
                  offset="100%"
                  stopColor={gradient.color}
                  stopOpacity={chartAreaFill.gradientTo}
                />
              </linearGradient>
            ))}
          </defs>
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
            <Area
              key={entry.dataKey}
              type="monotone"
              dataKey={entry.dataKey}
              name={entry.name ?? entry.dataKey}
              stroke={seriesColor(entry, index)}
              strokeWidth={chartStrokeWidth}
              fill={`url(#${gradientId(entry.dataKey)})`}
              fillOpacity={chartAreaFill.fillOpacity}
              dot={false}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
      <ChartDataTable data={data} series={series} xKey={xKey} label={label} />
    </div>
  );
}

AreaChart.displayName = "AreaChart";
