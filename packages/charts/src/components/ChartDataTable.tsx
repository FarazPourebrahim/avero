"use client";

import { useAvero, useAveroFormatter } from "@averoui/react";
import type { ChartSeries } from "./AreaChart.js";

/** Props specific to `ChartDataTable`. */
export type ChartDataTableOwnProps = {
  /** The same rows the chart plots. */
  data: ReadonlyArray<Record<string, unknown>>;
  /** The same series the chart plots; each becomes a column. */
  series: ReadonlyArray<ChartSeries>;
  /** Key holding the x value in each row. @defaultValue "name" */
  xKey?: string;
  /** Table caption. @defaultValue the `chartDataTable` dictionary string */
  label?: string;
  /** Header of the first column. @defaultValue the `chartCategory` dictionary string */
  categoryLabel?: string;
};

/**
 * The chart's data as a table, visible to assistive technology only. An SVG conveys shape,
 * not values, so every chart renders this alongside it: screen-reader users get the numbers, and
 * sighted users see the chart. Numbers are localised through the active Avero formatter.
 */
export function ChartDataTable({
  data,
  series,
  xKey = "name",
  label,
  categoryLabel,
}: ChartDataTableOwnProps) {
  const { dictionary } = useAvero();
  const format = useAveroFormatter();

  if (data.length === 0) return null;

  return (
    <div data-slot="chart-data-table" className="sr-only">
      <table>
        <caption>{label ?? dictionary.chartDataTable}</caption>
        <thead>
          <tr>
            <th scope="col">{categoryLabel ?? dictionary.chartCategory}</th>
            {series.map((entry) => (
              <th key={entry.dataKey} scope="col">
                {entry.name ?? entry.dataKey}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={String(row[xKey] ?? index)}>
              <th scope="row">{String(row[xKey] ?? "")}</th>
              {series.map((entry) => {
                const value = row[entry.dataKey];
                return (
                  <td key={entry.dataKey}>
                    {typeof value === "number" ? format.number(value) : String(value ?? "")}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ChartDataTable.displayName = "ChartDataTable";
