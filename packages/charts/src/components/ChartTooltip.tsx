"use client";

import { Tooltip } from "recharts";
import type { ComponentProps } from "react";
import { chartCursor, chartTooltipStyles } from "../theme.js";

export type ChartTooltipProps = ComponentProps<typeof Tooltip>;

/**
 * Recharts `Tooltip` pre-styled with a dark surface: slate-800 ground,
 * 12px radius, 12px near-white text and a muted label line. Every Recharts tooltip prop still
 * works, so `formatter` and `labelFormatter` are the place to localise numbers and dates.
 */
export function ChartTooltip(props: ChartTooltipProps) {
  return (
    <Tooltip
      cursor={chartCursor}
      contentStyle={chartTooltipStyles.contentStyle}
      labelStyle={chartTooltipStyles.labelStyle}
      itemStyle={chartTooltipStyles.itemStyle}
      {...props}
    />
  );
}

ChartTooltip.displayName = "ChartTooltip";
