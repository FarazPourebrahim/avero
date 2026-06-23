import { render, screen } from "@testing-library/react";
import { Direction } from "radix-ui";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../test/axe.js";
import {
  AveroProvider,
  resolveAveroSettings,
  useAvero,
  useAveroFormatter,
} from "./AveroProvider.js";
import { en, fa, getDictionary } from "./dictionaries.js";

const DATE = new Date("2026-09-11T12:00:00Z");

function Probe() {
  const { dir, locale, digits, calendar, dictionary } = useAvero();
  const format = useAveroFormatter();
  const radixDirection = Direction.useDirection();
  return (
    <dl>
      <dt>dir</dt>
      <dd data-testid="dir">{dir}</dd>
      <dt>radix</dt>
      <dd data-testid="radix">{radixDirection}</dd>
      <dt>locale</dt>
      <dd data-testid="locale">{locale}</dd>
      <dt>digits</dt>
      <dd data-testid="digits">{digits}</dd>
      <dt>calendar</dt>
      <dd data-testid="calendar">{calendar}</dd>
      <dt>back</dt>
      <dd data-testid="back">{dictionary.back}</dd>
      <dt>number</dt>
      <dd data-testid="number">{format.number(20_000_000)}</dd>
      <dt>date</dt>
      <dd data-testid="date">{format.date(DATE)}</dd>
      <dt>relative</dt>
      <dd data-testid="relative">{format.relativeTime(DATE, { now: DATE })}</dd>
    </dl>
  );
}

describe("resolveAveroSettings", () => {
  it("defaults to the reference settings (RTL, Persian, Jalali)", () => {
    expect(resolveAveroSettings()).toEqual({
      dir: "rtl",
      locale: "fa-IR",
      digits: "fa",
      calendar: "persian",
      dictionary: fa,
    });
  });

  it("derives LTR, Latin digits and the Gregorian calendar for English", () => {
    expect(resolveAveroSettings({ locale: "en-US" })).toEqual({
      dir: "ltr",
      locale: "en-US",
      digits: "latn",
      calendar: "gregory",
      dictionary: en,
    });
  });

  it("lets explicit options win over locale defaults", () => {
    const settings = resolveAveroSettings({ locale: "fa-IR", dir: "ltr", digits: "latn" });
    expect(settings.dir).toBe("ltr");
    expect(settings.digits).toBe("latn");
  });

  it("merges dictionary overrides over the locale dictionary", () => {
    const settings = resolveAveroSettings({ dictionary: { back: "برگشت" } });
    expect(settings.dictionary.back).toBe("برگشت");
    expect(settings.dictionary.close).toBe(fa.close);
  });
});

describe("getDictionary", () => {
  it("returns Persian for fa locales and English otherwise", () => {
    expect(getDictionary("fa")).toBe(fa);
    expect(getDictionary("FA-ir")).toBe(fa);
    expect(getDictionary("de-DE")).toBe(en);
  });
});

describe("AveroProvider", () => {
  it("provides reference defaults without a provider", () => {
    render(<Probe />);

    expect(screen.getByTestId("dir")).toHaveTextContent("rtl");
    expect(screen.getByTestId("back")).toHaveTextContent("بازگشت");
    expect(screen.getByTestId("number")).toHaveTextContent("۲۰٬۰۰۰٬۰۰۰");
    expect(screen.getByTestId("date")).toHaveTextContent("۲۰ شهریور ۱۴۰۵");
  });

  it("applies locale, direction and formatting to descendants", () => {
    render(
      <AveroProvider locale="en-US">
        <Probe />
      </AveroProvider>,
    );

    expect(screen.getByTestId("dir")).toHaveTextContent("ltr");
    expect(screen.getByTestId("radix")).toHaveTextContent("ltr");
    expect(screen.getByTestId("back")).toHaveTextContent("Back");
    expect(screen.getByTestId("number")).toHaveTextContent("20,000,000");
    expect(screen.getByTestId("date")).toHaveTextContent("September 11, 2026");
    expect(screen.getByTestId("relative")).toHaveTextContent("now");
  });

  it("passes the direction to Radix primitives", () => {
    render(
      <AveroProvider dir="rtl" locale="en-US">
        <Probe />
      </AveroProvider>,
    );

    expect(screen.getByTestId("radix")).toHaveTextContent("rtl");
  });

  it("uses the calendar and digit overrides in formatting", () => {
    render(
      <AveroProvider calendar="gregory" digits="latn">
        <Probe />
      </AveroProvider>,
    );

    expect(screen.getByTestId("calendar")).toHaveTextContent("gregory");
    expect(screen.getByTestId("date")).toHaveTextContent("11 سپتامبر 2026");
  });

  it("renders on the server", () => {
    const html = renderToString(
      <AveroProvider>
        <Probe />
      </AveroProvider>,
    );

    expect(html).toContain("rtl");
    expect(html).toContain("۲۰٬۰۰۰٬۰۰۰");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <AveroProvider>
        <Probe />
      </AveroProvider>,
    );

    await expectNoAxeViolations(container);
  });
});
