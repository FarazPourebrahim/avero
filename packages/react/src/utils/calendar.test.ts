import { afterEach, describe, expect, it, vi } from "vitest";
import {
  addDays,
  daysInMonth,
  formatDateInput,
  formatMonthYear,
  fromCalendarDay,
  intlLocale,
  monthWeeks,
  moveMonths,
  parseDateInput,
  parseIsoDate,
  shiftMonth,
  toCalendarDay,
  todayIsoDate,
  weekdayOf,
} from "./calendar.js";

// 2026-09-11 is Friday, 20 Shahrivar 1405.
const SHAHRIVAR_20_1405 = "2026-09-11";

describe("parseIsoDate", () => {
  it("returns UTC midnight for real dates", () => {
    expect(parseIsoDate(SHAHRIVAR_20_1405)).toBe(Date.UTC(2026, 8, 11));
  });

  it("rejects impossible dates and other formats", () => {
    expect(parseIsoDate("2026-02-29")).toBeNull();
    expect(parseIsoDate("2026-13-01")).toBeNull();
    expect(parseIsoDate("2026-9-11")).toBeNull();
    expect(parseIsoDate("0050-01-01")).toBeNull();
  });
});

describe("day arithmetic", () => {
  it("adds days across months and leaves invalid dates alone", () => {
    expect(addDays("2026-02-28", 1)).toBe("2026-03-01");
    expect(addDays("2026-01-01", -1)).toBe("2025-12-31");
    expect(addDays("not a date", 3)).toBe("not a date");
  });

  it("reads the weekday", () => {
    expect(weekdayOf(SHAHRIVAR_20_1405)).toBe(5);
    expect(weekdayOf("nope")).toBeNaN();
  });

  it("reads today in the local time zone", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 8, 11, 23, 30));

    expect(todayIsoDate()).toBe(SHAHRIVAR_20_1405);
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});

describe("toCalendarDay and fromCalendarDay", () => {
  it("converts between ISO and Solar Hijri dates", () => {
    expect(toCalendarDay(SHAHRIVAR_20_1405, "persian")).toEqual({ year: 1405, month: 6, day: 20 });
    expect(fromCalendarDay({ year: 1405, month: 6, day: 20 }, "persian")).toBe(SHAHRIVAR_20_1405);
    expect(toCalendarDay("bad", "persian")).toBeNull();
  });

  it("round-trips every day across more than a decade of Solar Hijri years", () => {
    let mismatches = 0;
    for (let iso = "2019-03-01"; iso < "2031-03-01"; iso = addDays(iso, 1)) {
      const day = toCalendarDay(iso, "persian");
      if (!day || fromCalendarDay(day, "persian") !== iso) mismatches += 1;
    }

    expect(mismatches).toBe(0);
  });

  it("knows which years have Esfand 30", () => {
    expect(fromCalendarDay({ year: 1403, month: 12, day: 30 }, "persian")).toBe("2025-03-20");
    expect(fromCalendarDay({ year: 1404, month: 12, day: 30 }, "persian")).toBeNull();
  });

  it("rejects days that don't exist", () => {
    expect(fromCalendarDay({ year: 1405, month: 7, day: 31 }, "persian")).toBeNull();
    expect(fromCalendarDay({ year: 1405, month: 13, day: 1 }, "persian")).toBeNull();
    expect(fromCalendarDay({ year: 1405, month: 1, day: 0 }, "persian")).toBeNull();
    expect(fromCalendarDay({ year: 1405.5, month: 1, day: 1 }, "persian")).toBeNull();
  });

  it("handles Gregorian dates directly", () => {
    expect(toCalendarDay(SHAHRIVAR_20_1405, "gregory")).toEqual({ year: 2026, month: 9, day: 11 });
    expect(fromCalendarDay({ year: 2024, month: 2, day: 29 }, "gregory")).toBe("2024-02-29");
    expect(fromCalendarDay({ year: 2025, month: 2, day: 29 }, "gregory")).toBeNull();
  });
});

describe("months", () => {
  it("counts the days in a month", () => {
    expect(daysInMonth(1405, 1, "persian")).toBe(31);
    expect(daysInMonth(1405, 7, "persian")).toBe(30);
    expect(daysInMonth(1403, 12, "persian")).toBe(30);
    expect(daysInMonth(1404, 12, "persian")).toBe(29);
    expect(daysInMonth(2024, 2, "gregory")).toBe(29);
    expect(daysInMonth(2025, 2, "gregory")).toBe(28);
  });

  it("shifts months across years", () => {
    expect(shiftMonth({ year: 1405, month: 12 }, 1)).toEqual({ year: 1406, month: 1 });
    expect(shiftMonth({ year: 1405, month: 1 }, -1)).toEqual({ year: 1404, month: 12 });
    expect(shiftMonth({ year: 1405, month: 6 }, -18)).toEqual({ year: 1403, month: 12 });
  });

  it("moves a date by months and clamps the day", () => {
    // 31 Shahrivar → Mehr has 30 days.
    expect(moveMonths("2026-09-22", 1, "persian")).toBe(
      fromCalendarDay({ year: 1405, month: 7, day: 30 }, "persian"),
    );
    expect(moveMonths("2024-01-31", 1, "gregory")).toBe("2024-02-29");
    expect(moveMonths("invalid", 1, "gregory")).toBe("invalid");
  });

  it("lays a month out in weeks starting on the chosen weekday", () => {
    // 1 Shahrivar 1405 is Sunday 23 August 2026; Persian weeks start on Saturday.
    const weeks = monthWeeks(1405, 6, "persian", 6);

    expect(weeks).toHaveLength(5);
    expect(weeks[0]).toEqual([
      null,
      "2026-08-23",
      "2026-08-24",
      "2026-08-25",
      "2026-08-26",
      "2026-08-27",
      "2026-08-28",
    ]);
    expect(weeks.flat().filter(Boolean)).toHaveLength(31);
    expect(weeks.at(-1)?.at(-1)).toBeNull();
  });

  it("returns no weeks for a month that doesn't exist", () => {
    expect(monthWeeks(1405, 13, "persian", 6)).toEqual([]);
  });
});

describe("formatMonthYear", () => {
  it("writes Persian month titles month first", () => {
    expect(formatMonthYear(SHAHRIVAR_20_1405, "fa-IR-u-ca-persian-nu-arabext")).toBe("شهریور ۱۴۰۵");
  });

  it("keeps each locale's own month and year order", () => {
    expect(formatMonthYear(SHAHRIVAR_20_1405, "en-US-u-ca-gregory-nu-latn")).toBe("September 2026");
    expect(formatMonthYear(SHAHRIVAR_20_1405, "en-US-u-ca-persian-nu-latn")).toBe(
      "Shahrivar 1405 AP",
    );
  });

  it("drops the separator before a day that comes last", () => {
    // Japanese long dates end with the day: 2026年9月11日.
    expect(formatMonthYear(SHAHRIVAR_20_1405, "ja-JP-u-ca-gregory-nu-latn")).toBe("2026年9月");
  });
});

describe("typed dates", () => {
  it("formats in the calendar and digit system", () => {
    expect(formatDateInput(SHAHRIVAR_20_1405, "persian", "fa")).toBe("۱۴۰۵/۰۶/۲۰");
    expect(formatDateInput(SHAHRIVAR_20_1405, "persian", "latn")).toBe("1405/06/20");
    expect(formatDateInput(SHAHRIVAR_20_1405, "gregory", "latn")).toBe("2026/09/11");
    expect(formatDateInput("bad", "gregory", "latn")).toBe("");
  });

  it("parses Persian digits, other separators and one-digit parts", () => {
    expect(parseDateInput("۱۴۰۵/۶/۲۰", "persian")).toBe(SHAHRIVAR_20_1405);
    expect(parseDateInput(" 1405-06-20 ", "persian")).toBe(SHAHRIVAR_20_1405);
    expect(parseDateInput("2026.9.11", "gregory")).toBe(SHAHRIVAR_20_1405);
  });

  it("rejects other orders and impossible dates", () => {
    expect(parseDateInput("20/06/1405", "persian")).toBeNull();
    expect(parseDateInput("1404/12/30", "persian")).toBeNull();
    expect(parseDateInput("", "persian")).toBeNull();
  });

  it("builds Intl locale tags", () => {
    expect(intlLocale("fa-IR", "persian", "fa")).toBe("fa-IR-u-ca-persian-nu-arabext");
    expect(intlLocale("en-US", "gregory", "latn")).toBe("en-US-u-ca-gregory-nu-latn");
  });
});
