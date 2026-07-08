"use client";

import {
  forwardRef,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useAvero, useAveroFormatter } from "../../i18n/AveroProvider.js";
import { formatMessage } from "../../i18n/dictionaries.js";
import { cn } from "../../utils/cn.js";

/** One day of the heatmap. */
export type ActivityDay = {
  date: Date | string | number;
  count: number;
};

type Cell = { date: Date; count: number } | null;

const CELL_SIZE = 14;
const CELL_GAP = 2;
const ROWS = 7;

/** Level 0 is an empty day; 1…4 shade from light to dark, as in the reference. */
const LEVEL_CLASSES = [
  "bg-gray-100",
  "bg-emerald-200",
  "bg-emerald-400",
  "bg-emerald-500",
  "bg-emerald-700",
] as const;

function startOfDay(value: Date | string | number): Date {
  if (value instanceof Date) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }
  if (typeof value === "string") {
    // A bare ISO date parses as UTC, which shifts the day in negative offsets; read the parts instead.
    const parts = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
    if (parts) return new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]));
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return parsed;
  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function dayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function levelOf(count: number, max: number): number {
  if (count <= 0) return 0;
  return Math.min(4, Math.max(1, Math.ceil((count / max) * 4)));
}

/** Props specific to `ActivityHeatmap`. It also accepts every native `<div>` attribute. */
export type ActivityHeatmapOwnProps = {
  /** Days to plot. Gaps are filled with zero-count days, so only active days are needed. */
  days: ReadonlyArray<ActivityDay>;
  /** Count that maps to the darkest shade. @defaultValue the highest count in `days` */
  maxCount?: number;
  /** First weekday of the column, `0` = Sunday. @defaultValue `6` (Saturday) for Persian locales */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Accessible name of the grid. @defaultValue the dictionary's `heatmapLabel` */
  label?: string;
  /** Show the "less → more" legend. @defaultValue true */
  legend?: boolean;
  /** Rendered instead of the grid when `days` is empty. */
  emptyState?: ReactNode;
};

export type ActivityHeatmapProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof ActivityHeatmapOwnProps
> &
  ActivityHeatmapOwnProps;

/**
 * Year-long activity grid (D-18, R-02): weeks as columns, weekdays as rows, month labels above and
 * a shade legend below. Rendered as an ARIA grid with roving focus, so every day is reachable from
 * the keyboard and announced with its date and count.
 */
export const ActivityHeatmap = forwardRef<HTMLDivElement, ActivityHeatmapProps>(
  function ActivityHeatmap(
    { days, maxCount, weekStartsOn, label, legend = true, emptyState, className, ...props },
    ref,
  ) {
    const { locale, dir, dictionary } = useAvero();
    const format = useAveroFormatter();
    const cellRefs = useRef(new Map<number, HTMLButtonElement | null>());
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    const weekStart = weekStartsOn ?? (locale.toLowerCase().startsWith("fa") ? 6 : 0);

    const grid = useMemo(() => {
      const valid = days
        .map((day) => ({ date: startOfDay(day.date), count: day.count }))
        .filter((day) => !Number.isNaN(day.date.getTime()))
        .sort((a, b) => a.date.getTime() - b.date.getTime());
      if (valid.length === 0) return null;

      const counts = new Map<string, number>();
      for (const day of valid) {
        counts.set(dayKey(day.date), (counts.get(dayKey(day.date)) ?? 0) + day.count);
      }

      const first = valid[0]!.date;
      const last = valid[valid.length - 1]!.date;
      const lead = (first.getDay() - weekStart + ROWS) % ROWS;
      const cells: Cell[] = Array.from({ length: lead }, () => null);
      for (let cursor = first; cursor.getTime() <= last.getTime(); cursor = addDays(cursor, 1)) {
        cells.push({ date: cursor, count: counts.get(dayKey(cursor)) ?? 0 });
      }
      const columns = Math.ceil(cells.length / ROWS);
      while (cells.length < columns * ROWS) cells.push(null);

      const highest = maxCount ?? Math.max(...cells.map((cell) => cell?.count ?? 0));
      return { cells, columns, max: highest > 0 ? highest : 1 };
    }, [days, maxCount, weekStart]);

    const weekdays = useMemo(() => {
      const narrow = new Intl.DateTimeFormat(locale, { weekday: "narrow" });
      const long = new Intl.DateTimeFormat(locale, { weekday: "long" });
      const sunday = new Date(2024, 0, 7);
      return Array.from({ length: ROWS }, (_, row) => {
        const date = addDays(sunday, (weekStart + row) % ROWS);
        return { narrow: narrow.format(date), long: long.format(date) };
      });
    }, [locale, weekStart]);

    if (!grid) {
      return (
        <div
          ref={ref}
          data-slot="activity-heatmap"
          data-state="empty"
          className={cn(className)}
          {...props}
        >
          {emptyState}
        </div>
      );
    }

    const { cells, columns, max } = grid;
    const lastDayIndex = cells.reduce((last, cell, index) => (cell ? index : last), 0);
    const activeIndex = focusedIndex ?? lastDayIndex;
    const templateColumns = `1.5rem repeat(${columns}, ${CELL_SIZE}px)`;

    const months: { column: number; label: string }[] = [];
    for (let column = 0; column < columns; column += 1) {
      const cell = cells.slice(column * ROWS, column * ROWS + ROWS).find(Boolean);
      if (!cell) continue;
      const name = format.date(cell.date, { preset: "month" });
      if (months.length === 0 || months[months.length - 1]!.label !== name) {
        months.push({ column, label: name });
      }
    }

    function moveFocus(index: number, rowDelta: number, columnDelta: number) {
      const row = index % ROWS;
      const column = Math.floor(index / ROWS);
      const nextRow = row + rowDelta;
      const nextColumn = column + columnDelta;
      if (nextRow < 0 || nextRow >= ROWS || nextColumn < 0 || nextColumn >= columns) return;
      const nextIndex = nextColumn * ROWS + nextRow;
      if (!cells[nextIndex]) return;
      setFocusedIndex(nextIndex);
      cellRefs.current.get(nextIndex)?.focus();
    }

    function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
      const forward = dir === "rtl" ? -1 : 1;
      switch (event.key) {
        case "ArrowUp":
          moveFocus(index, -1, 0);
          break;
        case "ArrowDown":
          moveFocus(index, 1, 0);
          break;
        case "ArrowRight":
          moveFocus(index, 0, forward);
          break;
        case "ArrowLeft":
          moveFocus(index, 0, -forward);
          break;
        default:
          return;
      }
      event.preventDefault();
    }

    return (
      <div ref={ref} data-slot="activity-heatmap" className={cn(className)} {...props}>
        <div className="scrollbar-hidden overflow-x-auto pb-1">
          <div className="w-max">
            <div
              className="mb-1 grid"
              style={{ gridTemplateColumns: templateColumns, gap: CELL_GAP }}
            >
              {months.map((month) => (
                <div
                  key={`${month.column}-${month.label}`}
                  aria-hidden="true"
                  className="text-3xs whitespace-nowrap text-gray-400"
                  style={{ gridColumn: month.column + 2 }}
                >
                  {month.label}
                </div>
              ))}
            </div>
            <div
              role="grid"
              aria-label={label ?? dictionary.heatmapLabel}
              data-slot="activity-heatmap-grid"
              className="grid"
              style={{ gridTemplateColumns: templateColumns, gap: CELL_GAP }}
            >
              {weekdays.map((weekday, row) => (
                <div role="row" className="contents" key={weekday.long}>
                  <div
                    role="rowheader"
                    aria-label={weekday.long}
                    className={cn(
                      "text-4xs flex h-[14px] w-6 items-center justify-center text-gray-400",
                      row % 2 === 0 && "[&>span]:invisible",
                    )}
                  >
                    <span>{weekday.narrow}</span>
                  </div>
                  {Array.from({ length: columns }, (_, column) => {
                    const index = column * ROWS + row;
                    const cell = cells[index];
                    if (!cell) {
                      return (
                        <div
                          key={index}
                          role="gridcell"
                          aria-hidden="true"
                          className="size-[14px]"
                        />
                      );
                    }
                    const description = formatMessage(dictionary.heatmapCell, {
                      count: format.number(cell.count),
                      date: format.date(cell.date, { preset: "long" }),
                    });
                    return (
                      <button
                        key={index}
                        type="button"
                        role="gridcell"
                        ref={(node) => {
                          cellRefs.current.set(index, node);
                        }}
                        tabIndex={index === activeIndex ? 0 : -1}
                        aria-label={description}
                        title={description}
                        data-slot="activity-heatmap-day"
                        data-level={levelOf(cell.count, max)}
                        onFocus={() => setFocusedIndex(index)}
                        onKeyDown={(event) => onKeyDown(event, index)}
                        className={cn(
                          "size-[14px] cursor-pointer rounded-xs transition-all",
                          "hover:ring-2 hover:ring-indigo-400 hover:ring-offset-1",
                          "focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 focus-visible:outline-none",
                          LEVEL_CLASSES[levelOf(cell.count, max)],
                        )}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        {legend ? (
          <div
            data-slot="activity-heatmap-legend"
            aria-hidden="true"
            className="mt-3 flex items-center justify-end gap-1.5"
          >
            <span className="text-3xs text-gray-400">{dictionary.heatmapLess}</span>
            {LEVEL_CLASSES.map((level) => (
              <div key={level} className={cn("size-[12px] rounded-xs", level)} />
            ))}
            <span className="text-3xs text-gray-400">{dictionary.heatmapMore}</span>
          </div>
        ) : null}
      </div>
    );
  },
);

ActivityHeatmap.displayName = "ActivityHeatmap";
