import { toLatinDigits, toPersianDigits, type CalendarSystem, type DigitSystem } from "./format.js";

/** A day in a calendar system. `month` is 1-based. */
export type CalendarDay = { year: number; month: number; day: number };

const DAY_MS = 86_400_000;
const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const TYPED_DATE = /^(\d{4})[/.-](\d{1,2})[/.-](\d{1,2})$/;

function pad(value: number, length = 2): string {
  return String(value).padStart(length, "0");
}

const partFormatters = new Map<CalendarSystem, Intl.DateTimeFormat>();

// Dates are handled as UTC midnights, so no time zone can move them to another day.
function partsFormatter(calendar: CalendarSystem): Intl.DateTimeFormat {
  let formatter = partFormatters.get(calendar);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(`en-US-u-ca-${calendar}-nu-latn`, {
      timeZone: "UTC",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    partFormatters.set(calendar, formatter);
  }
  return formatter;
}

/** The BCP 47 tag that formats in a calendar and digit system, e.g. `fa-IR-u-ca-persian-nu-arabext`. */
export function intlLocale(locale: string, calendar: CalendarSystem, digits: DigitSystem): string {
  return `${locale}-u-ca-${calendar}-nu-${digits === "fa" ? "arabext" : "latn"}`;
}

/**
 * Month and year of an ISO date, e.g. `شهریور ۱۴۰۵` or `September 2026`. It is the locale's long
 * date without the day, because some ICU versions order a bare month-and-year pattern year first
 * in Persian (`۱۴۰۵ شهریور`) while the long date is written naturally.
 */
export function formatMonthYear(iso: string, localeTag: string): string {
  const parts = new Intl.DateTimeFormat(localeTag, {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(new Date(parseIsoDate(iso) ?? Number.NaN));
  const dayIndex = parts.findIndex((part) => part.type === "day");
  // Drop the day with the separator that joins it to the rest: the one after it, or before it
  // when the day comes last.
  const separatorIndex = parts[dayIndex + 1]?.type === "literal" ? dayIndex + 1 : dayIndex - 1;
  return parts
    .filter((_, index) => index !== dayIndex && index !== separatorIndex)
    .map((part) => part.value)
    .join("");
}

/** UTC milliseconds of a real calendar date written as `YYYY-MM-DD`, or `null`. */
export function parseIsoDate(iso: string): number | null {
  const match = ISO_DATE.exec(iso);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }
  return date.getTime();
}

function toIsoDate(time: number): string {
  return new Date(time).toISOString().slice(0, 10);
}

/** Today in the device's time zone, as `YYYY-MM-DD`. */
export function todayIsoDate(): string {
  const now = new Date();
  return `${pad(now.getFullYear(), 4)}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** Adds whole days to an ISO date. An invalid date is returned unchanged. */
export function addDays(iso: string, days: number): string {
  const time = parseIsoDate(iso);
  return time === null ? iso : toIsoDate(time + days * DAY_MS);
}

/** Day of the week of an ISO date, `0` = Sunday, or `NaN` for an invalid date. */
export function weekdayOf(iso: string): number {
  return new Date(parseIsoDate(iso) ?? Number.NaN).getUTCDay();
}

/** The year, month and day of an ISO date in a calendar, or `null` for an invalid date. */
export function toCalendarDay(iso: string, calendar: CalendarSystem): CalendarDay | null {
  const time = parseIsoDate(iso);
  if (time === null) return null;
  const date = new Date(time);
  if (calendar === "gregory") {
    return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
  }
  const result: CalendarDay = { year: 0, month: 0, day: 0 };
  for (const part of partsFormatter(calendar).formatToParts(date)) {
    if (part.type === "year" || part.type === "month" || part.type === "day") {
      result[part.type] = Number(part.value);
    }
  }
  return result;
}

/**
 * The ISO date of a day in a calendar, or `null` when that day doesn't exist (e.g. Esfand 30 in a
 * common year). Solar Hijri dates are found with `Intl` alone: start from an estimate near the
 * Nowruz of that year, read the date back, and step by the difference until it matches.
 */
export function fromCalendarDay(target: CalendarDay, calendar: CalendarSystem): string | null {
  const { year, month, day } = target;
  if (
    ![year, month, day].every(Number.isInteger) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }
  if (calendar === "gregory") {
    const iso = `${pad(year, 4)}-${pad(month)}-${pad(day)}`;
    return parseIsoDate(iso) === null ? null : iso;
  }

  // Months 1–6 have 31 days and 7–11 have 30, which puts the estimate within a day or two.
  const dayOfYear = (month - 1) * 31 - Math.max(month - 7, 0) + (day - 1);
  let time = Date.UTC(year + 621, 2, 21) + dayOfYear * DAY_MS;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const found = toCalendarDay(toIsoDate(time), calendar);
    if (!found) return null;
    const offset = (year - found.year) * 372 + (month - found.month) * 31 + (day - found.day);
    if (offset === 0) return toIsoDate(time);
    time += offset * DAY_MS;
  }
  return null;
}

/** Number of days in a month of a calendar. */
export function daysInMonth(year: number, month: number, calendar: CalendarSystem): number {
  for (let day = 31; day > 28; day -= 1) {
    if (fromCalendarDay({ year, month, day }, calendar) !== null) return day;
  }
  return 28;
}

/** Moves a year and month by whole months. */
export function shiftMonth(
  { year, month }: Pick<CalendarDay, "year" | "month">,
  months: number,
): Pick<CalendarDay, "year" | "month"> {
  const index = year * 12 + (month - 1) + months;
  return { year: Math.floor(index / 12), month: (((index % 12) + 12) % 12) + 1 };
}

/** Moves an ISO date by whole months in a calendar, keeping the day where the target month has it. */
export function moveMonths(iso: string, months: number, calendar: CalendarSystem): string {
  const current = toCalendarDay(iso, calendar);
  if (!current) return iso;
  const target = shiftMonth(current, months);
  const day = Math.min(current.day, daysInMonth(target.year, target.month, calendar));
  return fromCalendarDay({ ...target, day }, calendar) ?? iso;
}

/** The weeks of a month as ISO dates, padded with `null` before the first and after the last day. */
export function monthWeeks(
  year: number,
  month: number,
  calendar: CalendarSystem,
  weekStartsOn: number,
): (string | null)[][] {
  const first = fromCalendarDay({ year, month, day: 1 }, calendar);
  if (first === null) return [];
  const lead = (weekdayOf(first) - weekStartsOn + 7) % 7;
  const cells: (string | null)[] = Array.from({ length: lead }, () => null);
  const total = daysInMonth(year, month, calendar);
  for (let offset = 0; offset < total; offset += 1) cells.push(addDays(first, offset));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (string | null)[][] = [];
  for (let start = 0; start < cells.length; start += 7) weeks.push(cells.slice(start, start + 7));
  return weeks;
}

/** Writes an ISO date as `YYYY/MM/DD` in a calendar and digit system, e.g. `۱۴۰۵/۰۶/۲۰`. */
export function formatDateInput(
  iso: string,
  calendar: CalendarSystem,
  digits: DigitSystem,
): string {
  const day = toCalendarDay(iso, calendar);
  if (!day) return "";
  const text = `${pad(day.year, 4)}/${pad(day.month)}/${pad(day.day)}`;
  return digits === "fa" ? toPersianDigits(text) : text;
}

/**
 * Reads a typed `YYYY/MM/DD` date in a calendar. `-` and `.` also separate the parts, months and
 * days may have one digit, and Persian or Arabic digits are accepted. Returns the ISO date, or
 * `null` when the text is not a real date.
 */
export function parseDateInput(text: string, calendar: CalendarSystem): string | null {
  const match = TYPED_DATE.exec(toLatinDigits(text).trim());
  if (!match) return null;
  return fromCalendarDay(
    { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) },
    calendar,
  );
}
