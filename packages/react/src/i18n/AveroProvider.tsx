"use client";

import { Direction } from "radix-ui";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import {
  formatDate,
  formatNumber,
  formatRelativeTime,
  type CalendarSystem,
  type DigitSystem,
  type FormatDateOptions,
  type FormatNumberOptions,
  type FormatRelativeTimeOptions,
} from "../utils/format.js";
import { getDictionary, type AveroDictionary } from "./dictionaries.js";

export type TextDirection = "rtl" | "ltr";

export type AveroSettings = {
  dir: TextDirection;
  locale: string;
  digits: DigitSystem;
  calendar: CalendarSystem;
  dictionary: AveroDictionary;
};

export type AveroProviderProps = {
  /** The tree that receives the direction, locale and dictionary. */
  children: ReactNode;
  /** Text direction. Defaults to `rtl` for Persian locales and `ltr` otherwise. */
  dir?: TextDirection;
  /** BCP 47 locale tag. Defaults to `fa-IR`, since Avero is Persian-first. */
  locale?: string;
  /** Digit system for formatted numbers and dates. Defaults to the locale's native digits. */
  digits?: DigitSystem;
  /** Calendar for formatted dates. Defaults to `persian` (Jalali) for Persian locales. */
  calendar?: CalendarSystem;
  /** Overrides for built-in strings; unspecified keys fall back to the locale's dictionary. */
  dictionary?: Partial<AveroDictionary>;
};

const DEFAULT_LOCALE = "fa-IR";

function isPersian(locale: string): boolean {
  return locale.toLowerCase().startsWith("fa");
}

export function resolveAveroSettings(
  options: Omit<AveroProviderProps, "children"> = {},
): AveroSettings {
  const locale = options.locale ?? DEFAULT_LOCALE;
  const persian = isPersian(locale);
  return {
    locale,
    dir: options.dir ?? (persian ? "rtl" : "ltr"),
    digits: options.digits ?? (persian ? "fa" : "latn"),
    calendar: options.calendar ?? (persian ? "persian" : "gregory"),
    dictionary: { ...getDictionary(locale), ...options.dictionary },
  };
}

const AveroContext = createContext<AveroSettings>(resolveAveroSettings());

/**
 * Supplies direction, locale, number/date formatting and built-in strings to Avero components.
 * Components also work without a provider, using the Persian defaults (RTL, `fa-IR`, Jalali).
 */
export function AveroProvider({
  children,
  dir,
  locale,
  digits,
  calendar,
  dictionary,
}: AveroProviderProps) {
  const settings = useMemo(
    () => resolveAveroSettings({ dir, locale, digits, calendar, dictionary }),
    [dir, locale, digits, calendar, dictionary],
  );

  return (
    <AveroContext.Provider value={settings}>
      <Direction.Provider dir={settings.dir}>{children}</Direction.Provider>
    </AveroContext.Provider>
  );
}

/** Returns the active Avero settings (direction, locale, digits, calendar, dictionary). */
export function useAvero(): AveroSettings {
  return useContext(AveroContext);
}

export type AveroFormatter = {
  number: (value: number, options?: Omit<FormatNumberOptions, "locale">) => string;
  date: (value: Date | number | string, options?: Omit<FormatDateOptions, "locale">) => string;
  relativeTime: (
    value: Date | number | string,
    options?: Omit<FormatRelativeTimeOptions, "locale">,
  ) => string;
};

/** Returns formatting functions bound to the active locale, digit system and calendar. */
export function useAveroFormatter(): AveroFormatter {
  const { locale, digits, calendar } = useAvero();
  return useMemo(
    () => ({
      number: (value, options) => formatNumber(value, { locale, digits, ...options }),
      date: (value, options) => formatDate(value, { locale, digits, calendar, ...options }),
      relativeTime: (value, options) => formatRelativeTime(value, { locale, digits, ...options }),
    }),
    [locale, digits, calendar],
  );
}
