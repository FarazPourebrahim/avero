export type DigitSystem = "fa" | "latn";
export type CalendarSystem = "persian" | "gregory";
export type DatePreset = "long" | "numeric" | "dayMonth";

export type LocaleOptions = {
  /** BCP 47 language tag without extensions, e.g. `fa-IR` or `en-US`. */
  locale?: string;
  digits?: DigitSystem;
};

export type FormatNumberOptions = LocaleOptions & {
  maximumFractionDigits?: number;
  grouping?: boolean;
};

export type FormatDateOptions = LocaleOptions & {
  calendar?: CalendarSystem;
  preset?: DatePreset;
};

export type FormatRelativeTimeOptions = LocaleOptions & {
  /** Reference point for "now"; defaults to the current time. */
  now?: Date | number;
};

const DEFAULT_LOCALE = "fa-IR";
const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_INDIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

const DATE_PRESETS: Record<DatePreset, Intl.DateTimeFormatOptions> = {
  long: { day: "numeric", month: "long", year: "numeric" },
  numeric: { day: "numeric", month: "numeric", year: "numeric" },
  dayMonth: { day: "numeric", month: "long" },
};

const RELATIVE_UNITS: ReadonlyArray<[Intl.RelativeTimeFormatUnit, number]> = [
  ["year", 365 * 24 * 60 * 60],
  ["month", 30 * 24 * 60 * 60],
  ["week", 7 * 24 * 60 * 60],
  ["day", 24 * 60 * 60],
  ["hour", 60 * 60],
  ["minute", 60],
  ["second", 1],
];

function defaultDigits(locale: string): DigitSystem {
  return locale.toLowerCase().startsWith("fa") ? "fa" : "latn";
}

function withExtensions(locale: string, digits: DigitSystem, calendar?: CalendarSystem): string {
  const extensions = [
    calendar ? `ca-${calendar}` : null,
    `nu-${digits === "fa" ? "arabext" : "latn"}`,
  ].filter(Boolean);
  return `${locale}-u-${extensions.join("-")}`;
}

function toDate(value: Date | number | string): Date {
  return value instanceof Date ? value : new Date(value);
}

/** Replaces Latin digits with Persian digits. Other characters are left untouched. */
export function toPersianDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit);
}

/** Normalises Persian and Arabic-Indic digits to Latin digits, e.g. for parsing user input. */
export function toLatinDigits(value: string): string {
  return value.replace(/[۰-۹٠-٩]/g, (digit) => {
    const persianIndex = PERSIAN_DIGITS.indexOf(digit);
    return String(persianIndex >= 0 ? persianIndex : ARABIC_INDIC_DIGITS.indexOf(digit));
  });
}

/**
 * Formats a number with locale-aware digits and grouping.
 * `fa` digits use the Persian thousands separator (`٬`), e.g. `۲۰٬۰۰۰٬۰۰۰`.
 * Non-finite values format as an empty string.
 */
export function formatNumber(value: number, options: FormatNumberOptions = {}): string {
  if (!Number.isFinite(value)) return "";
  const locale = options.locale ?? DEFAULT_LOCALE;
  const digits = options.digits ?? defaultDigits(locale);
  return new Intl.NumberFormat(withExtensions(locale, digits), {
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
    useGrouping: options.grouping ?? true,
  }).format(value);
}

/**
 * Formats a date. Persian locales default to the Solar Hijri (Jalali) calendar:
 * `long` → `۳ شهریور ۱۴۰۵`, `numeric` → `۱۴۰۵/۶/۱۹`, `dayMonth` → `۲۰ شهریور`.
 * Invalid dates format as an empty string.
 */
export function formatDate(value: Date | number | string, options: FormatDateOptions = {}): string {
  const date = toDate(value);
  if (Number.isNaN(date.getTime())) return "";
  const locale = options.locale ?? DEFAULT_LOCALE;
  const digits = options.digits ?? defaultDigits(locale);
  const calendar = options.calendar ?? (defaultDigits(locale) === "fa" ? "persian" : "gregory");
  return new Intl.DateTimeFormat(
    withExtensions(locale, digits, calendar),
    DATE_PRESETS[options.preset ?? "long"],
  ).format(date);
}

/**
 * Formats the distance between a date and now, e.g. `2 هفته پیش` or `in 3 days`.
 * Invalid dates format as an empty string.
 */
export function formatRelativeTime(
  value: Date | number | string,
  options: FormatRelativeTimeOptions = {},
): string {
  const date = toDate(value);
  if (Number.isNaN(date.getTime())) return "";
  const locale = options.locale ?? DEFAULT_LOCALE;
  const digits = options.digits ?? defaultDigits(locale);
  const now = options.now === undefined ? Date.now() : toDate(options.now).getTime();
  const seconds = Math.round((date.getTime() - now) / 1000);
  const [unit, unitSeconds] =
    RELATIVE_UNITS.find(([, size]) => Math.abs(seconds) >= size) ?? RELATIVE_UNITS.at(-1)!;
  return new Intl.RelativeTimeFormat(withExtensions(locale, digits), { numeric: "auto" }).format(
    Math.round(seconds / unitSeconds),
    unit,
  );
}
