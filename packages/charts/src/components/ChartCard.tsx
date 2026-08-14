"use client";

import { cn } from "@avero/react";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

/** Props specific to `ChartCard`. It also accepts every native `<div>` attribute. */
export type ChartCardOwnProps = {
  /** Card title, e.g. "آنالیتیکس دوره‌ها". */
  title?: ReactNode;
  /** Metric toggles or any other controls, shown beside the title. */
  actions?: ReactNode;
  /** Chart height. `sm` is the trend card, `md` the analytics card. @defaultValue "md" */
  size?: "sm" | "md";
  /** Rendered instead of the chart while there is no data. */
  emptyState?: ReactNode;
  /** Rendered instead of the chart while data is loading. */
  loadingState?: ReactNode;
  /** Shows `loadingState`. @defaultValue false */
  loading?: boolean;
  /** Shows `emptyState`. @defaultValue false */
  empty?: boolean;
};

export type ChartCardProps = Omit<HTMLAttributes<HTMLDivElement>, keyof ChartCardOwnProps> &
  ChartCardOwnProps;

/**
 * Dashboard chart card: a bordered white card with a title row, optional metric
 * toggles and a fixed-height body that holds the chart, its empty state or its loading state.
 */
export const ChartCard = forwardRef<HTMLDivElement, ChartCardProps>(function ChartCard(
  {
    title,
    actions,
    size = "md",
    emptyState,
    loadingState,
    loading = false,
    empty = false,
    className,
    children,
    ...props
  },
  ref,
) {
  const body = loading ? loadingState : empty ? emptyState : children;

  return (
    <div
      ref={ref}
      data-slot="chart-card"
      data-state={loading ? "loading" : empty ? "empty" : "ready"}
      className={cn("rounded-2xl border border-gray-100 bg-white p-3.5 sm:p-5", className)}
      {...props}
    >
      {title || actions ? (
        <div className="mb-3 flex flex-col justify-between gap-2.5 sm:mb-4 sm:flex-row sm:items-center">
          {title ? (
            <h3
              data-slot="chart-card-title"
              className="flex items-center gap-2 text-xs font-bold text-gray-800 sm:text-sm"
            >
              {title}
            </h3>
          ) : null}
          {actions ? (
            <div
              data-slot="chart-card-actions"
              className="flex flex-wrap items-center gap-1 sm:gap-1.5"
            >
              {actions}
            </div>
          ) : null}
        </div>
      ) : null}
      <div
        data-slot="chart-card-body"
        className={cn(
          "flex items-center justify-center",
          size === "sm" ? "h-40 sm:h-48" : "h-44 sm:h-52",
        )}
      >
        {body}
      </div>
    </div>
  );
});

ChartCard.displayName = "ChartCard";
