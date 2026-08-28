import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef, useState, type ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Field, FieldControl, FieldLabel } from "../field/Field.js";
import { DatePicker, type DateRange } from "./DatePicker.js";

// 2026-09-11 is Friday, 20 Shahrivar 1405.
const SHAHRIVAR_20 = "2026-09-11";

function inEnglish(children: ReactNode) {
  return <AveroProvider locale="en-US">{children}</AveroProvider>;
}

function day(date: string): HTMLElement {
  return document.querySelector(`[data-date="${date}"]`) as HTMLElement;
}

function focusedDate(): string | null {
  return document.activeElement?.getAttribute("data-date") ?? null;
}

afterEach(() => {
  vi.useRealTimers();
});

describe("DatePicker (single)", () => {
  it("shows the date in Solar Hijri with Persian digits by default", () => {
    render(<DatePicker aria-label="تاریخ" defaultValue={SHAHRIVAR_20} />);

    const input = screen.getByRole("textbox", { name: "تاریخ" });
    expect(input).toHaveValue("۱۴۰۵/۰۶/۲۰");
    expect(input).toHaveAttribute("placeholder", "سال/ماه/روز");
    expect(input).toHaveAttribute("inputmode", "numeric");
    expect(screen.getByRole("button", { name: "باز کردن تقویم" })).toHaveAttribute(
      "aria-haspopup",
      "dialog",
    );
  });

  it("uses the Gregorian calendar in English, or the calendar it is given", () => {
    const { rerender } = render(
      inEnglish(<DatePicker aria-label="Date" defaultValue={SHAHRIVAR_20} />),
    );
    expect(screen.getByRole("textbox")).toHaveValue("2026/09/11");

    rerender(
      inEnglish(<DatePicker aria-label="Date" defaultValue={SHAHRIVAR_20} calendar="persian" />),
    );
    expect(screen.getByRole("textbox")).toHaveValue("1405/06/20");
  });

  it("commits a typed date on blur and rewrites it in full", async () => {
    const onValueChange = vi.fn();
    render(<DatePicker aria-label="تاریخ" onValueChange={onValueChange} />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "۱۴۰۵/۶/۲۱");
    expect(onValueChange).not.toHaveBeenCalled();

    await userEvent.tab();

    expect(onValueChange).toHaveBeenCalledWith("2026-09-12");
    expect(input).toHaveValue("۱۴۰۵/۰۶/۲۱");
  });

  it("commits with Enter without submitting the form", async () => {
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      return new FormData(event.currentTarget).get("start");
    });
    render(
      <form onSubmit={onSubmit}>
        <DatePicker aria-label="تاریخ" name="start" />
        <button type="submit">ثبت</button>
      </form>,
    );
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "1405-06-20{Enter}");
    expect(onSubmit).not.toHaveBeenCalled();
    expect(input).toHaveValue("۱۴۰۵/۰۶/۲۰");

    await userEvent.keyboard("{Enter}");
    expect(onSubmit).toHaveReturnedWith(SHAHRIVAR_20);
  });

  it("marks text that isn't an available date invalid and keeps the value", async () => {
    const onValueChange = vi.fn();
    render(
      <DatePicker
        aria-label="تاریخ"
        defaultValue={SHAHRIVAR_20}
        max={SHAHRIVAR_20}
        onValueChange={onValueChange}
      />,
    );
    const input = screen.getByRole("textbox");

    await userEvent.clear(input);
    await userEvent.type(input, "1405/13/01");
    await userEvent.tab();

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveValue("1405/13/01");

    await userEvent.clear(input);
    await userEvent.type(input, "1405/06/21");
    await userEvent.tab();

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("clears the value when the text is erased", async () => {
    const onValueChange = vi.fn();
    render(
      <DatePicker aria-label="تاریخ" defaultValue={SHAHRIVAR_20} onValueChange={onValueChange} />,
    );

    await userEvent.clear(screen.getByRole("textbox"));
    await userEvent.tab();

    expect(onValueChange).toHaveBeenCalledWith(null);
  });

  it("opens a labelled calendar on the selected date", async () => {
    render(<DatePicker aria-label="تاریخ" defaultValue={SHAHRIVAR_20} />);

    await userEvent.click(screen.getByRole("button", { name: "باز کردن تقویم" }));

    expect(screen.getByRole("dialog", { name: "تقویم" })).toHaveClass("z-(--z-popover)");
    expect(screen.getByRole("grid")).toHaveAccessibleName("شهریور ۱۴۰۵");
    expect(screen.getAllByRole("columnheader")).toHaveLength(7);
    expect(focusedDate()).toBe(SHAHRIVAR_20);
    expect(day(SHAHRIVAR_20)).toHaveAttribute("aria-selected", "true");
    expect(day(SHAHRIVAR_20)).toHaveAccessibleName("۲۰ شهریور ۱۴۰۵");
  });

  it("opens on today, marked as the current date, when empty", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 8, 11, 10));
    render(<DatePicker aria-label="تاریخ" />);

    await userEvent.click(screen.getByRole("button", { name: "باز کردن تقویم" }));

    expect(focusedDate()).toBe(SHAHRIVAR_20);
    expect(day(SHAHRIVAR_20)).toHaveAttribute("aria-current", "date");
    expect(day(SHAHRIVAR_20)).toHaveAttribute("aria-selected", "false");
  });

  it("moves through days, weeks and months from the keyboard, following the direction", async () => {
    render(<DatePicker aria-label="تاریخ" defaultValue={SHAHRIVAR_20} />);
    await userEvent.click(screen.getByRole("button", { name: "باز کردن تقویم" }));

    // Right to left: ArrowLeft is the next day.
    await userEvent.keyboard("{ArrowLeft}");
    expect(focusedDate()).toBe("2026-09-12");

    await userEvent.keyboard("{ArrowRight}{ArrowDown}");
    expect(focusedDate()).toBe("2026-09-18");

    await userEvent.keyboard("{ArrowUp}");
    expect(focusedDate()).toBe(SHAHRIVAR_20);

    // Persian weeks run Saturday to Friday, and 2026-09-11 is a Friday.
    await userEvent.keyboard("{Home}");
    expect(focusedDate()).toBe("2026-09-05");
    await userEvent.keyboard("{End}");
    expect(focusedDate()).toBe(SHAHRIVAR_20);

    await userEvent.keyboard("{PageDown}");
    expect(screen.getByRole("grid")).toHaveAccessibleName(/مهر/);
    await userEvent.keyboard("{PageUp}");
    expect(focusedDate()).toBe(SHAHRIVAR_20);

    await userEvent.keyboard("{Shift>}{PageDown}{/Shift}");
    expect(screen.getByRole("grid")).toHaveAccessibleName(/۱۴۰۶/);
  });

  it("uses ArrowRight for the next day left to right", async () => {
    render(inEnglish(<DatePicker aria-label="Date" defaultValue={SHAHRIVAR_20} />));
    await userEvent.click(screen.getByRole("button", { name: "Open calendar" }));

    await userEvent.keyboard("{ArrowRight}");

    expect(focusedDate()).toBe("2026-09-12");
    expect(screen.getByRole("grid")).toHaveAccessibleName("September 2026");
  });

  it("turns the page with the month buttons", async () => {
    render(inEnglish(<DatePicker aria-label="Date" defaultValue={SHAHRIVAR_20} />));
    await userEvent.click(screen.getByRole("button", { name: "Open calendar" }));

    await userEvent.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByRole("grid")).toHaveAccessibleName("October 2026");
    expect(screen.getByRole("button", { name: "Next month" })).toHaveFocus();

    await userEvent.click(screen.getByRole("button", { name: "Previous month" }));
    await userEvent.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByRole("grid")).toHaveAccessibleName("August 2026");
  });

  it("picks a date, closes and returns focus to the button", async () => {
    const onValueChange = vi.fn();
    render(
      <DatePicker aria-label="تاریخ" onValueChange={onValueChange} defaultValue={SHAHRIVAR_20} />,
    );
    const input = screen.getByRole("textbox");
    const trigger = screen.getByRole("button", { name: "باز کردن تقویم" });

    await userEvent.click(trigger);
    await userEvent.click(day("2026-09-15"));

    expect(onValueChange).toHaveBeenCalledWith("2026-09-15");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(input).toHaveValue("۱۴۰۵/۰۶/۲۴");
    expect(trigger).toHaveFocus();
  });

  it("picks the focused date with Enter and closes with Escape", async () => {
    const onValueChange = vi.fn();
    render(
      inEnglish(
        <DatePicker aria-label="Date" defaultValue={SHAHRIVAR_20} onValueChange={onValueChange} />,
      ),
    );
    const trigger = screen.getByRole("button", { name: "Open calendar" });

    await userEvent.click(trigger);
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();

    await userEvent.click(trigger);
    await userEvent.keyboard("{ArrowRight}{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("2026-09-12");
  });

  it("keeps dates outside min, max and isDateDisabled from being picked", async () => {
    const onValueChange = vi.fn();
    render(
      inEnglish(
        <DatePicker
          aria-label="Date"
          defaultValue={SHAHRIVAR_20}
          min="2026-09-05"
          max="2026-09-25"
          isDateDisabled={(date) => date === "2026-09-14"}
          onValueChange={onValueChange}
        />,
      ),
    );
    await userEvent.click(screen.getByRole("button", { name: "Open calendar" }));

    expect(day("2026-09-04")).toHaveAttribute("aria-disabled", "true");
    expect(day("2026-09-14")).toHaveAttribute("aria-disabled", "true");
    expect(day("2026-09-26")).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("button", { name: "Previous month" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next month" })).toBeDisabled();

    await userEvent.click(day("2026-09-14"));

    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("opens within min and max", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 8, 11, 10));
    render(<DatePicker aria-label="تاریخ" min="2026-10-01" />);

    await userEvent.click(screen.getByRole("button", { name: "باز کردن تقویم" }));

    expect(focusedDate()).toBe("2026-10-01");
  });

  it("follows the parent when controlled", async () => {
    function Controlled() {
      const [date, setDate] = useState<string | null>(SHAHRIVAR_20);
      return (
        <>
          <DatePicker aria-label="Date" value={date} onValueChange={setDate} />
          <output>{String(date)}</output>
        </>
      );
    }
    render(inEnglish(<Controlled />));

    await userEvent.click(screen.getByRole("button", { name: "Open calendar" }));
    await userEvent.click(day("2026-09-20"));

    expect(screen.getByRole("status")).toHaveTextContent("2026-09-20");
  });

  it("is labelled through Field and shows the invalid state", () => {
    const { container } = render(
      <Field invalid>
        <FieldLabel>تاریخ شروع</FieldLabel>
        <FieldControl>
          <DatePicker />
        </FieldControl>
      </Field>,
    );

    expect(screen.getByRole("textbox", { name: "تاریخ شروع" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(container.querySelector("[data-slot='date-picker']")).toHaveClass("border-red-500");
  });

  it("disables the input and the calendar button", () => {
    render(<DatePicker aria-label="تاریخ" disabled />);

    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("forwards refs to the input", () => {
    const ref = createRef<HTMLInputElement>();
    render(<DatePicker ref={ref} aria-label="تاریخ" />);

    expect(ref.current).toHaveAttribute("data-slot", "date-picker-input");
  });

  it("renders on the server", () => {
    const html = renderToString(<DatePicker aria-label="تاریخ" defaultValue={SHAHRIVAR_20} />);

    expect(html).toContain("۱۴۰۵/۰۶/۲۰");
  });

  it("has no accessibility violations, closed or open", async () => {
    const { container } = render(<DatePicker aria-label="تاریخ" defaultValue={SHAHRIVAR_20} />);
    await expectNoAxeViolations(container);

    await userEvent.click(screen.getByRole("button", { name: "باز کردن تقویم" }));
    await expectNoAxeViolations(document.body);
  });
});

describe("DatePicker (range)", () => {
  it("names both inputs after the field", () => {
    render(<DatePicker mode="range" aria-label="سفر" />);

    expect(screen.getByRole("group", { name: "سفر" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "سفر از تاریخ" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "سفر تا تاریخ" })).toBeInTheDocument();
  });

  it("takes the field name from Field's label", async () => {
    render(
      <Field>
        <FieldLabel>مدت سفر</FieldLabel>
        <FieldControl>
          <DatePicker mode="range" />
        </FieldControl>
      </Field>,
    );

    expect(await screen.findByRole("textbox", { name: "مدت سفر از تاریخ" })).toBeInTheDocument();
  });

  it("takes the field name from aria-labelledby", async () => {
    render(
      <>
        <span id="trip">Trip</span>
        {inEnglish(<DatePicker mode="range" aria-labelledby="trip" />)}
      </>,
    );

    expect(await screen.findByRole("textbox", { name: "Trip Start date" })).toBeInTheDocument();
  });

  it("picks a start and an end in the calendar, in either order", async () => {
    const onValueChange = vi.fn();
    render(
      inEnglish(
        <DatePicker
          mode="range"
          aria-label="Trip"
          defaultValue={{ from: SHAHRIVAR_20, to: null }}
          onValueChange={onValueChange}
        />,
      ),
    );

    await userEvent.click(screen.getByRole("button", { name: "Open calendar" }));
    expect(screen.getByRole("grid")).toHaveAttribute("aria-multiselectable", "true");

    await userEvent.click(day("2026-09-15"));
    expect(onValueChange).toHaveBeenLastCalledWith({ from: "2026-09-15", to: null });
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await userEvent.click(day("2026-09-12"));
    expect(onValueChange).toHaveBeenLastCalledWith({ from: "2026-09-12", to: "2026-09-15" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByRole("textbox", { name: "Trip Start date" })).toHaveValue("2026/09/12");
    expect(screen.getByRole("textbox", { name: "Trip End date" })).toHaveValue("2026/09/15");
  });

  it("marks the ends and the days between them", async () => {
    render(
      inEnglish(
        <DatePicker
          mode="range"
          aria-label="Trip"
          defaultValue={{ from: "2026-09-10", to: "2026-09-13" }}
        />,
      ),
    );

    await userEvent.click(screen.getByRole("button", { name: "Open calendar" }));

    expect(day("2026-09-10")).toHaveAttribute("data-range", "start");
    expect(day("2026-09-11")).toHaveAttribute("data-range", "middle");
    expect(day("2026-09-13")).toHaveAttribute("data-range", "end");
    expect(day("2026-09-14")).not.toHaveAttribute("data-range");
    expect(day("2026-09-13")).toHaveAttribute("aria-selected", "true");
    expect(day("2026-09-11")).toHaveAttribute("aria-selected", "false");
  });

  it("orders typed dates and submits both ends", async () => {
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      return [data.get("from"), data.get("to")];
    });
    function Form() {
      const [range, setRange] = useState<DateRange>({ from: null, to: null });
      return (
        <form onSubmit={onSubmit}>
          <DatePicker
            mode="range"
            aria-label="سفر"
            value={range}
            onValueChange={setRange}
            fromName="from"
            toName="to"
          />
          <button type="submit">ثبت</button>
        </form>
      );
    }
    render(<Form />);

    await userEvent.type(screen.getByRole("textbox", { name: "سفر از تاریخ" }), "1405/06/25");
    await userEvent.type(
      screen.getByRole("textbox", { name: "سفر تا تاریخ" }),
      "1405/06/22{Enter}",
    );
    await userEvent.click(screen.getByRole("button", { name: "ثبت" }));

    expect(onSubmit).toHaveReturnedWith(["2026-09-13", "2026-09-16"]);
  });

  it("marks an invalid end", async () => {
    const { container } = render(<DatePicker mode="range" aria-label="سفر" />);
    const end = screen.getByRole("textbox", { name: "سفر تا تاریخ" });

    await userEvent.type(end, "1405/02/40");
    await userEvent.tab();

    expect(end).toHaveAttribute("aria-invalid", "true");
    expect(container.querySelector("[data-slot='date-picker']")).toHaveAttribute("data-invalid");
  });

  it("forwards refs to the start input", () => {
    const ref = createRef<HTMLInputElement>();
    render(<DatePicker ref={ref} mode="range" aria-label="سفر" />);

    expect(ref.current).toHaveAttribute("data-slot", "date-picker-from");
  });

  it("has no accessibility violations when open", async () => {
    render(
      <DatePicker
        mode="range"
        aria-label="سفر"
        defaultValue={{ from: "2026-09-10", to: "2026-09-13" }}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "باز کردن تقویم" }));

    await expectNoAxeViolations(document.body);
  });
});
