/**
 * Chart palette and axis styling: an indigo/rose/violet/emerald metric palette, a dashed
 * horizontal-only grid, slate tick labels and a dark tooltip.
 *
 * Recharts takes colours as props that end up as SVG attributes, so these must be literal strings:
 * a utility class cannot reach them, and a `var()` reference would depend on Tailwind emitting a
 * theme variable that no class references. They are therefore sourced from `@averoui/tokens`, whose
 * generated token map exists for exactly this case.
 */
import { tokens } from "@averoui/tokens";

/** Metric colours, in series order. */
export const chartPalette = {
  views: tokens.colorChartViews.value,
  likes: tokens.colorChartLikes.value,
  clicks: tokens.colorChartClicks.value,
  comments: tokens.colorChartComments.value,
} as const;

export type ChartMetric = keyof typeof chartPalette;

/** The palette as an ordered list, for charts with unnamed series. */
export const chartColors = Object.values(chartPalette);

/** Dashed horizontal grid lines, with no vertical lines. */
export const chartGrid = {
  stroke: tokens.colorChartGrid.value,
  strokeDasharray: "3 3",
  vertical: false,
} as const;

/** Axis ticks: 10px slate labels with no axis or tick lines. */
export const chartAxis = {
  tick: { fontSize: 10, fill: tokens.colorChartAxis.value },
  axisLine: false,
  tickLine: false,
} as const;

/** A hairline cursor under the tooltip, tracking the hovered point. */
export const chartCursor = {
  stroke: tokens.colorChartCursor.value,
  strokeWidth: 1,
} as const;

/** Dark tooltip surface. */
export const chartTooltipStyles = {
  contentStyle: {
    margin: 0,
    padding: 10,
    backgroundColor: tokens.colorChartTooltipSurface.value,
    border: "none",
    borderRadius: 12,
    fontSize: 12,
    color: tokens.colorChartTooltipText.value,
    whiteSpace: "nowrap",
  },
  labelStyle: { margin: "0 0 4px", color: tokens.colorChartTooltipLabel.value },
  itemStyle: { color: tokens.colorChartTooltipText.value },
} as const;

/** Stroke width shared by areas and lines. */
export const chartStrokeWidth = 2;

/** Area fill: a vertical gradient from 30% to 0, drawn at 60% opacity. */
export const chartAreaFill = {
  fillOpacity: 0.6,
  gradientFrom: 0.3,
  gradientTo: 0,
} as const;

/** Deterministic gradient id for a series, so SSR and the client agree. */
export function gradientId(series: string): string {
  return `avero-chart-gradient-${series}`;
}
