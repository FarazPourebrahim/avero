import { describe, expect, it } from "vitest";
import {
  formatDate,
  formatNumber,
  formatRelativeTime,
  toLatinDigits,
  toPersianDigits,
} from "./format.js";

// 2026-09-11T12:00:00Z is 20 Shahrivar 1405 in the Solar Hijri calendar.
const SHAHRIVAR_20_1405 = new Date("2026-09-11T12:00:00Z");

describe("toPersianDigits", () => {
  it("converts every Latin digit and keeps other characters", () => {
    expect(toPersianDigits("PROJ-0123456789")).toBe("PROJ-۰۱۲۳۴۵۶۷۸۹");
  });

  it("accepts numbers", () => {
    expect(toPersianDigits(42)).toBe("۴۲");
  });
});

describe("toLatinDigits", () => {
  it("normalises Persian and Arabic-Indic digits", () => {
    expect(toLatinDigits("۰۹۲۲-٠١٢")).toBe("0922-012");
  });

  it("leaves Latin text untouched", () => {
    expect(toLatinDigits("abc 123")).toBe("abc 123");
  });
});

describe("formatNumber", () => {
  it("formats Persian digits with the Persian thousands separator by default", () => {
    expect(formatNumber(20_000_000)).toBe("۲۰٬۰۰۰٬۰۰۰");
  });

  it("formats Latin digits with Latin separators when requested", () => {
    expect(formatNumber(20_000_000, { digits: "latn" })).toBe("20,000,000");
  });

  it("uses the locale's conventions for non-Persian locales", () => {
    expect(formatNumber(1234.5, { locale: "en-US" })).toBe("1,234.5");
  });

  it("formats zero", () => {
    expect(formatNumber(0)).toBe("۰");
  });

  it("formats negative numbers", () => {
    expect(formatNumber(-15, { locale: "en-US" })).toBe("-15");
  });

  it("can disable grouping", () => {
    expect(formatNumber(15000, { locale: "en-US", grouping: false })).toBe("15000");
  });

  it("limits fraction digits", () => {
    expect(formatNumber(0.123456, { locale: "en-US", maximumFractionDigits: 3 })).toBe("0.123");
  });

  it("returns an empty string for non-finite values", () => {
    expect(formatNumber(Number.NaN)).toBe("");
    expect(formatNumber(Number.POSITIVE_INFINITY)).toBe("");
  });
});

describe("formatDate", () => {
  it("formats a long Jalali date by default", () => {
    expect(formatDate(SHAHRIVAR_20_1405)).toBe("۲۰ شهریور ۱۴۰۵");
  });

  it("formats a numeric Jalali date", () => {
    expect(formatDate(SHAHRIVAR_20_1405, { preset: "numeric" })).toBe("۱۴۰۵/۶/۲۰");
  });

  it("formats day and month only", () => {
    expect(formatDate(SHAHRIVAR_20_1405, { preset: "dayMonth" })).toBe("۲۰ شهریور");
  });

  it("formats a Gregorian date for English", () => {
    expect(formatDate(SHAHRIVAR_20_1405, { locale: "en-US" })).toBe("September 11, 2026");
  });

  it("supports Latin digits with the Persian calendar", () => {
    expect(formatDate(SHAHRIVAR_20_1405, { preset: "numeric", digits: "latn" })).toBe("1405/6/20");
  });

  it("accepts ISO strings and timestamps", () => {
    expect(formatDate("2026-09-11T12:00:00Z", { preset: "dayMonth" })).toBe("۲۰ شهریور");
    expect(formatDate(SHAHRIVAR_20_1405.getTime(), { preset: "dayMonth" })).toBe("۲۰ شهریور");
  });

  it("returns an empty string for invalid dates", () => {
    expect(formatDate("not a date")).toBe("");
  });
});

describe("formatRelativeTime", () => {
  const now = SHAHRIVAR_20_1405;

  it("matches the reference's membership format with Latin digits", () => {
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(twoWeeksAgo, { now, digits: "latn" })).toBe("2 هفته پیش");
  });

  it("uses Persian digits by default", () => {
    const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
    expect(formatRelativeTime(threeHoursAgo, { now })).toBe("۳ ساعت پیش");
  });

  it("formats future times", () => {
    const inThreeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(inThreeDays, { now, locale: "en-US" })).toBe("in 3 days");
  });

  it("picks the largest fitting unit", () => {
    const lastYear = new Date(now.getTime() - 400 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(lastYear, { now, locale: "en-US" })).toBe("last year");
  });

  it("formats sub-second differences as now", () => {
    expect(formatRelativeTime(now, { now, locale: "en-US" })).toBe("now");
  });

  it("returns an empty string for invalid dates", () => {
    expect(formatRelativeTime("invalid", { now })).toBe("");
  });
});
