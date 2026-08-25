"use client";

import { useEffect, useId, useMemo, useRef, type KeyboardEvent } from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons/internalIcons.js";
import {
  addDays,
  daysInMonth,
  formatMonthYear,
  fromCalendarDay,
  intlLocale,
  monthWeeks,
  moveMonths,
  parseIsoDate,
  toCalendarDay,
  todayIsoDate,
  weekdayOf,
} from "../../utils/calendar.js";
import { cn } from "../../utils/cn.js";
import type { CalendarSystem } from "../../utils/format.js";
import { IconButton } from "../icon-button/IconButton.js";

export type RangePosition = "start" | "end" | "middle";

export type CalendarGridProps = {
  calendar: CalendarSystem;
  weekStartsOn: number;
  /** The date with keyboard focus. Its month is the month shown. */
  focusedDate: string;
  onFocusedDateChange: (date: string) => void;
  onSelect: (date: string) => void;
  isSelected: (date: string) => boolean;
  isUnavailable: (date: string) => boolean;
  rangePosition?: (date: string) => RangePosition | undefined;
  multiselectable?: boolean;
  min?: string | undefined;
  max?: string | undefined;
};

function toDate(iso: string): Date {
  return new Date(parseIsoDate(iso) ?? Number.NaN);
}

/**
 * One month as an ARIA grid (WAI-ARIA date picker dialog pattern). The focused date drives the
 * month shown, so moving past the first or last day turns the page.
 */
export function CalendarGrid({
  calendar,
  weekStartsOn,
  focusedDate,
  onFocusedDateChange,
  onSelect,
  isSelected,
  isUnavailable,
  rangePosition,
  multiselectable,
  min,
  max,
}: CalendarGridProps) {
  const { locale, digits, dir, dictionary } = useAvero();
  const titleId = useId();
  const gridRef = useRef<HTMLDivElement>(null);
  // Focus follows the focused date when the calendar opens and after keyboard moves, but not when
  // the month buttons turn the page, so those buttons keep focus.
  const shouldMoveFocus = useRef(true);

  const current = toCalendarDay(focusedDate, calendar)!;
  const weeks = useMemo(
    () => monthWeeks(current.year, current.month, calendar, weekStartsOn),
    [current.year, current.month, calendar, weekStartsOn],
  );

  const localeTag = intlLocale(locale, calendar, digits);
  const formats = useMemo(
    () => ({
      day: new Intl.DateTimeFormat(localeTag, { timeZone: "UTC", day: "numeric" }),
      // Days are named with the long date; the column header already carries the weekday, and
      // adding it makes some ICU versions reorder Persian dates year first.
      long: new Intl.DateTimeFormat(localeTag, {
        timeZone: "UTC",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    }),
    [localeTag],
  );
  const weekdays = useMemo(() => {
    const narrow = new Intl.DateTimeFormat(locale, { timeZone: "UTC", weekday: "narrow" });
    const long = new Intl.DateTimeFormat(locale, { timeZone: "UTC", weekday: "long" });
    const sunday = "2024-01-07";
    return Array.from({ length: 7 }, (_, column) => {
      const date = toDate(addDays(sunday, (weekStartsOn + column) % 7));
      return { narrow: narrow.format(date), long: long.format(date) };
    });
  }, [locale, weekStartsOn]);

  useEffect(() => {
    if (!shouldMoveFocus.current) return;
    shouldMoveFocus.current = false;
    gridRef.current?.querySelector<HTMLElement>(`[data-date="${focusedDate}"]`)?.focus();
  }, [focusedDate]);

  const today = todayIsoDate();
  const firstOfMonth = fromCalendarDay({ ...current, day: 1 }, calendar)!;
  const previousDisabled = min !== undefined && addDays(firstOfMonth, -1) < min;
  const nextDisabled =
    max !== undefined &&
    addDays(firstOfMonth, daysInMonth(current.year, current.month, calendar)) > max;

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, date: string) {
    const forward = dir === "rtl" ? -1 : 1;
    const column = (weekdayOf(date) - weekStartsOn + 7) % 7;
    let next: string;
    switch (event.key) {
      case "ArrowRight":
        next = addDays(date, forward);
        break;
      case "ArrowLeft":
        next = addDays(date, -forward);
        break;
      case "ArrowDown":
        next = addDays(date, 7);
        break;
      case "ArrowUp":
        next = addDays(date, -7);
        break;
      case "Home":
        next = addDays(date, -column);
        break;
      case "End":
        next = addDays(date, 6 - column);
        break;
      case "PageUp":
        next = moveMonths(date, event.shiftKey ? -12 : -1, calendar);
        break;
      case "PageDown":
        next = moveMonths(date, event.shiftKey ? 12 : 1, calendar);
        break;
      default:
        return;
    }
    event.preventDefault();
    if (next === date) return;
    shouldMoveFocus.current = true;
    onFocusedDateChange(next);
  }

  const PreviousIcon = dir === "rtl" ? ChevronRightIcon : ChevronLeftIcon;
  const NextIcon = dir === "rtl" ? ChevronLeftIcon : ChevronRightIcon;

  return (
    // The popover is portalled out of the page, so the direction is set again here.
    <div data-slot="date-picker-calendar" dir={dir} className="w-72 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <IconButton
          variant="ghost"
          size="sm"
          label={dictionary.datePickerPreviousMonth}
          disabled={previousDisabled}
          onClick={() => onFocusedDateChange(moveMonths(focusedDate, -1, calendar))}
        >
          <PreviousIcon className="size-4" />
        </IconButton>
        <div
          id={titleId}
          aria-live="polite"
          data-slot="date-picker-title"
          className="text-sm font-bold text-gray-800"
        >
          {formatMonthYear(firstOfMonth, localeTag)}
        </div>
        <IconButton
          variant="ghost"
          size="sm"
          label={dictionary.datePickerNextMonth}
          disabled={nextDisabled}
          onClick={() => onFocusedDateChange(moveMonths(focusedDate, 1, calendar))}
        >
          <NextIcon className="size-4" />
        </IconButton>
      </div>

      <div
        ref={gridRef}
        role="grid"
        aria-labelledby={titleId}
        aria-multiselectable={multiselectable || undefined}
        data-slot="date-picker-grid"
        className="grid grid-cols-7 gap-y-1"
      >
        <div role="row" className="contents">
          {weekdays.map((weekday) => (
            <div
              key={weekday.long}
              role="columnheader"
              className="flex h-8 items-center justify-center text-xs font-medium text-gray-500"
            >
              <span aria-hidden="true">{weekday.narrow}</span>
              <span className="sr-only">{weekday.long}</span>
            </div>
          ))}
        </div>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} role="row" className="contents">
            {week.map((date, dayIndex) => {
              if (date === null) {
                return <div key={dayIndex} role="gridcell" aria-hidden="true" />;
              }
              const selected = isSelected(date);
              const unavailable = isUnavailable(date);
              const position = rangePosition?.(date);
              const isToday = date === today;
              return (
                <button
                  key={date}
                  type="button"
                  role="gridcell"
                  data-date={date}
                  data-slot="date-picker-day"
                  data-range={position}
                  tabIndex={date === focusedDate ? 0 : -1}
                  aria-selected={selected}
                  aria-disabled={unavailable || undefined}
                  aria-current={isToday ? "date" : undefined}
                  aria-label={formats.long.format(toDate(date))}
                  className={cn(
                    "mx-auto flex size-9 cursor-pointer items-center justify-center rounded-xl text-sm text-gray-700 transition outline-none",
                    "focus-visible:ring-primary/40 hover:bg-blue-50 hover:text-blue-700 focus-visible:ring-2",
                    isToday && "text-primary font-bold",
                    position === "middle" && "w-full rounded-none bg-blue-50 text-blue-700",
                    selected && "bg-primary hover:bg-primary-hover text-white hover:text-white",
                    unavailable &&
                      "cursor-not-allowed text-gray-400 line-through hover:bg-transparent hover:text-gray-400",
                  )}
                  onClick={() => {
                    if (!unavailable) onSelect(date);
                  }}
                  onFocus={() => {
                    if (date !== focusedDate) onFocusedDateChange(date);
                  }}
                  onKeyDown={(event) => onKeyDown(event, date)}
                >
                  {formats.day.format(toDate(date))}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
