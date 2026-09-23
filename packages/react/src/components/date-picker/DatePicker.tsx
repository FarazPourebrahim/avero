"use client";

import { Popover } from "radix-ui";
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { useControllableState } from "../../hooks/useControllableState.js";
import { useAvero, type TextDirection } from "../../i18n/AveroProvider.js";
import { CalendarIcon } from "../../icons/internalIcons.js";
import { formatDateInput, parseDateInput, todayIsoDate } from "../../utils/calendar.js";
import { cn } from "../../utils/cn.js";
import {
  formControlFocusWithin,
  formControlInvalidWithin,
  formControlSurface,
} from "../../utils/formControl.js";
import type { CalendarSystem, DigitSystem } from "../../utils/format.js";
import { mergeRefs } from "../../utils/refs.js";
import { IconButton } from "../icon-button/IconButton.js";
import { CalendarGrid } from "./CalendarGrid.js";

/** A date range. Dates are `YYYY-MM-DD`; either end can be empty. */
export type DateRange = { from: string | null; to: string | null };

type DatePickerCommonProps = {
  /** Earliest selectable date, as `YYYY-MM-DD`. */
  min?: string;
  /** Latest selectable date, as `YYYY-MM-DD`. */
  max?: string;
  /** Marks individual dates (`YYYY-MM-DD`) as unavailable. */
  isDateDisabled?: (date: string) => boolean;
  /** Calendar for typing and display. @defaultValue the `AveroProvider` calendar (`persian` for Persian locales) */
  calendar?: CalendarSystem;
  /** First day of the week, `0` = Sunday. @defaultValue `6` (Saturday) for Persian locales, otherwise `0` */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

/** Props of `DatePicker` in `single` mode. It also accepts every native `<input>` attribute. */
export type DatePickerSingleOwnProps = DatePickerCommonProps & {
  /** Picks one date. @defaultValue "single" */
  mode?: "single";
  /** The date (controlled), as `YYYY-MM-DD`, or `null` when empty. */
  value?: string | null;
  /** Initial date (uncontrolled). @defaultValue null */
  defaultValue?: string | null;
  /** Called with the new date, or `null` when the field is cleared. */
  onValueChange?: (value: string | null) => void;
};

/** Props of `DatePicker` in `range` mode. Native `<input>` attributes go to the start input. */
export type DatePickerRangeOwnProps = DatePickerCommonProps & {
  /** Picks a start and an end date. */
  mode: "range";
  /** The range (controlled). */
  value?: DateRange;
  /** Initial range (uncontrolled). @defaultValue `{ from: null, to: null }` */
  defaultValue?: DateRange;
  /** Called with the new range. A range picked in the calendar reports its start first, then both ends. */
  onValueChange?: (value: DateRange) => void;
  /** Form field name for the start date. */
  fromName?: string;
  /** Form field name for the end date. */
  toName?: string;
};

export type DatePickerSingleProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  keyof DatePickerSingleOwnProps | "type"
> &
  DatePickerSingleOwnProps;

export type DatePickerRangeProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  keyof DatePickerRangeOwnProps | "type" | "name"
> &
  DatePickerRangeOwnProps;

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

const EMPTY_RANGE: DateRange = { from: null, to: null };

const FIELD_CLASSES = cn(
  "flex w-full items-center gap-1 ps-1.5 pe-1",
  formControlSurface,
  formControlFocusWithin,
);
const INVALID_CLASSES = formControlInvalidWithin;
const INPUT_CLASSES =
  "min-w-0 flex-1 bg-transparent px-2 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-500 disabled:cursor-not-allowed";

function isTrue(value: boolean | "true" | "false" | "grammar" | "spelling" | undefined): boolean {
  return value === true || value === "true";
}

function ordered(range: DateRange): DateRange {
  return range.from !== null && range.to !== null && range.from > range.to
    ? { from: range.to, to: range.from }
    : range;
}

function useDateRules({ min, max, isDateDisabled, calendar, weekStartsOn }: DatePickerCommonProps) {
  const { locale, calendar: providerCalendar } = useAvero();
  return {
    calendar: calendar ?? providerCalendar,
    weekStartsOn: weekStartsOn ?? (locale.toLowerCase().startsWith("fa") ? 6 : 0),
    isUnavailable: (date: string) =>
      (min !== undefined && date < min) ||
      (max !== undefined && date > max) ||
      (isDateDisabled?.(date) ?? false),
    /** The date the calendar opens on: the given one, else today, kept within min and max. */
    initialFocus: (preferred: string | null) => {
      let date = preferred ?? todayIsoDate();
      if (min !== undefined && date < min) date = min;
      if (max !== undefined && date > max) date = max;
      return date;
    },
  };
}

type DateRules = ReturnType<typeof useDateRules>;

/**
 * Typed entry for one date. The text is free while typing and is committed on blur or Enter:
 * a real, available date becomes the value, empty text clears it, and anything else stays in the
 * field marked invalid, without changing the value.
 */
function useTypedDate(
  date: string | null,
  commit: (date: string | null) => void,
  rules: DateRules,
  digits: DigitSystem,
) {
  const [draft, setDraft] = useState<string | null>(null);
  const trimmed = draft?.trim() ?? "";
  const typedDate = trimmed === "" ? null : parseDateInput(trimmed, rules.calendar);
  const invalid =
    draft !== null && trimmed !== "" && (typedDate === null || rules.isUnavailable(typedDate));

  return {
    text: draft ?? (date === null ? "" : formatDateInput(date, rules.calendar, digits)),
    invalid,
    /** The typed date when it is valid, otherwise the committed one. */
    pendingDate: draft !== null && !invalid ? typedDate : date,
    setDraft,
    reset: () => setDraft(null),
    /** Commits the typed text. Returns whether there was typed text to handle. */
    commitDraft: () => {
      if (draft === null) return false;
      if (invalid) return true;
      setDraft(null);
      if (typedDate !== date) commit(typedDate);
      return true;
    },
  };
}

function CalendarPopover({
  dir,
  label,
  children,
}: {
  dir: TextDirection;
  label: string;
  children: ReactNode;
}) {
  return (
    <Popover.Portal>
      <Popover.Content
        aria-label={label}
        // Portalled out of the page, so the direction is set here. floating-ui mirrors `end` for
        // right-to-left, which keeps the calendar at the field's inline end, by the button.
        dir={dir}
        align="end"
        sideOffset={6}
        data-slot="date-picker-content"
        className="shadow-card-raised z-(--z-popover) rounded-2xl border border-gray-200 bg-white"
        // The calendar focuses the selected or current date itself.
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        {children}
      </Popover.Content>
    </Popover.Portal>
  );
}

const SingleDatePicker = forwardRef<HTMLInputElement, DatePickerSingleProps>(
  function SingleDatePicker(
    {
      mode,
      value,
      defaultValue,
      onValueChange,
      min,
      max,
      isDateDisabled,
      calendar,
      weekStartsOn,
      className,
      name,
      disabled,
      placeholder,
      onChange,
      onBlur,
      onKeyDown,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref,
  ) {
    const { dictionary, digits, dir } = useAvero();
    const rules = useDateRules({ min, max, isDateDisabled, calendar, weekStartsOn });
    const [selected, setSelected] = useControllableState<string | null>({
      value,
      defaultValue: defaultValue ?? null,
      onChange: onValueChange,
    });
    const typed = useTypedDate(selected, setSelected, rules, digits);
    const [open, setOpen] = useState(false);
    const [focusedDate, setFocusedDate] = useState(() => rules.initialFocus(selected));
    const invalid = isTrue(ariaInvalid) || typed.invalid;

    return (
      <Popover.Root
        modal
        open={open && !disabled}
        onOpenChange={(next) => {
          if (next) setFocusedDate(rules.initialFocus(typed.pendingDate));
          setOpen(next);
        }}
      >
        <Popover.Anchor asChild>
          <div
            data-slot="date-picker"
            data-mode={mode ?? "single"}
            data-invalid={invalid ? "" : undefined}
            data-disabled={disabled ? "" : undefined}
            className={cn(
              FIELD_CLASSES,
              invalid && INVALID_CLASSES,
              disabled && "cursor-not-allowed opacity-60",
              className,
            )}
          >
            <input
              ref={ref}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              spellCheck={false}
              data-slot="date-picker-input"
              value={typed.text}
              disabled={disabled}
              placeholder={placeholder ?? dictionary.datePickerFormat}
              aria-invalid={invalid || undefined}
              className={INPUT_CLASSES}
              onChange={(event) => {
                onChange?.(event);
                typed.setDraft(event.target.value);
              }}
              onBlur={(event) => {
                onBlur?.(event);
                typed.commitDraft();
              }}
              onKeyDown={(event) => {
                onKeyDown?.(event);
                if (event.defaultPrevented) return;
                // Enter commits typed text instead of submitting the form.
                if (event.key === "Enter" && typed.commitDraft()) event.preventDefault();
              }}
              {...props}
            />
            <Popover.Trigger asChild>
              <IconButton
                variant="ghost"
                size="sm"
                label={dictionary.datePickerOpen}
                disabled={disabled}
              >
                <CalendarIcon className="size-4" />
              </IconButton>
            </Popover.Trigger>
            {name ? (
              <input type="hidden" name={name} value={selected ?? ""} disabled={disabled} />
            ) : null}
          </div>
        </Popover.Anchor>
        <CalendarPopover dir={dir} label={dictionary.datePickerCalendar}>
          <CalendarGrid
            calendar={rules.calendar}
            weekStartsOn={rules.weekStartsOn}
            focusedDate={focusedDate}
            onFocusedDateChange={setFocusedDate}
            isSelected={(date) => date === selected}
            isUnavailable={rules.isUnavailable}
            min={min}
            max={max}
            onSelect={(date) => {
              typed.reset();
              if (date !== selected) setSelected(date);
              setOpen(false);
            }}
          />
        </CalendarPopover>
      </Popover.Root>
    );
  },
);

const RangeDatePicker = forwardRef<HTMLInputElement, DatePickerRangeProps>(function RangeDatePicker(
  {
    mode,
    value,
    defaultValue,
    onValueChange,
    min,
    max,
    isDateDisabled,
    calendar,
    weekStartsOn,
    className,
    fromName,
    toName,
    disabled,
    placeholder,
    onChange,
    onBlur,
    onKeyDown,
    "aria-invalid": ariaInvalid,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-required": ariaRequired,
    ...props
  },
  ref,
) {
  const { dictionary, digits, dir } = useAvero();
  const rules = useDateRules({ min, max, isDateDisabled, calendar, weekStartsOn });
  const fromRef = useRef<HTMLInputElement>(null);
  const [range, setRange] = useControllableState<DateRange>({
    value,
    defaultValue: defaultValue ?? EMPTY_RANGE,
    onChange: onValueChange,
  });
  const from = useTypedDate(
    range.from,
    (date) => setRange(ordered({ from: date, to: range.to })),
    rules,
    digits,
  );
  const to = useTypedDate(
    range.to,
    (date) => setRange(ordered({ from: range.from, to: date })),
    rules,
    digits,
  );
  const [open, setOpen] = useState(false);
  const [focusedDate, setFocusedDate] = useState(() => rules.initialFocus(range.from));
  // Whether the next date picked in the calendar ends the range rather than starting a new one.
  const [pickingEnd, setPickingEnd] = useState(false);
  const [groupName, setGroupName] = useState<string | undefined>(ariaLabel);

  // Each input is named "<field name> <start/end>". The field name comes from `aria-label`,
  // `aria-labelledby`, or the `<label>` pointing at the start input (as `Field` renders).
  useEffect(() => {
    if (ariaLabel !== undefined) {
      setGroupName(ariaLabel);
      return;
    }
    if (ariaLabelledBy !== undefined) {
      const text = ariaLabelledBy
        .split(/\s+/)
        .map((id) => document.getElementById(id)?.textContent ?? "")
        .join(" ")
        .trim();
      setGroupName(text || undefined);
      return;
    }
    const label = fromRef.current?.labels?.[0];
    if (!label) return;
    const copy = label.cloneNode(true) as HTMLElement;
    copy.querySelectorAll("[aria-hidden='true']").forEach((node) => node.remove());
    setGroupName((copy.textContent ?? "").trim() || undefined);
  }, [ariaLabel, ariaLabelledBy]);

  const nameOf = (part: string) => (groupName ? `${groupName} ${part}` : part);
  const invalid = isTrue(ariaInvalid) || from.invalid || to.invalid;

  const sharedInputProps = {
    type: "text",
    inputMode: "numeric",
    autoComplete: "off",
    spellCheck: false,
    disabled,
    placeholder: placeholder ?? dictionary.datePickerFormat,
    "aria-describedby": ariaDescribedBy,
    "aria-required": ariaRequired,
    className: INPUT_CLASSES,
  } as const;

  function inputHandlers(typed: ReturnType<typeof useTypedDate>) {
    return {
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);
        typed.setDraft(event.target.value);
      },
      onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(event);
        typed.commitDraft();
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (event.key === "Enter" && typed.commitDraft()) event.preventDefault();
      },
    };
  }

  function rangePosition(date: string) {
    if (date === range.from) return "start" as const;
    if (date === range.to) return "end" as const;
    if (range.from !== null && range.to !== null && date > range.from && date < range.to) {
      return "middle" as const;
    }
    return undefined;
  }

  return (
    <Popover.Root
      modal
      open={open && !disabled}
      onOpenChange={(next) => {
        if (next) {
          setFocusedDate(rules.initialFocus(from.pendingDate));
          setPickingEnd(false);
        }
        setOpen(next);
      }}
    >
      <Popover.Anchor asChild>
        <div
          role="group"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          data-slot="date-picker"
          data-mode={mode}
          data-invalid={invalid ? "" : undefined}
          data-disabled={disabled ? "" : undefined}
          className={cn(
            FIELD_CLASSES,
            invalid && INVALID_CLASSES,
            disabled && "cursor-not-allowed opacity-60",
            className,
          )}
        >
          <input
            ref={mergeRefs(ref, fromRef)}
            {...sharedInputProps}
            data-slot="date-picker-from"
            value={from.text}
            aria-label={nameOf(dictionary.datePickerFrom)}
            aria-invalid={isTrue(ariaInvalid) || from.invalid || undefined}
            {...inputHandlers(from)}
            {...props}
          />
          <span aria-hidden="true" className="text-gray-400">
            –
          </span>
          <input
            {...sharedInputProps}
            data-slot="date-picker-to"
            value={to.text}
            aria-label={nameOf(dictionary.datePickerTo)}
            aria-invalid={isTrue(ariaInvalid) || to.invalid || undefined}
            {...inputHandlers(to)}
          />
          <Popover.Trigger asChild>
            <IconButton
              variant="ghost"
              size="sm"
              label={dictionary.datePickerOpen}
              disabled={disabled}
            >
              <CalendarIcon className="size-4" />
            </IconButton>
          </Popover.Trigger>
          {fromName ? (
            <input type="hidden" name={fromName} value={range.from ?? ""} disabled={disabled} />
          ) : null}
          {toName ? (
            <input type="hidden" name={toName} value={range.to ?? ""} disabled={disabled} />
          ) : null}
        </div>
      </Popover.Anchor>
      <CalendarPopover dir={dir} label={dictionary.datePickerCalendar}>
        <CalendarGrid
          calendar={rules.calendar}
          weekStartsOn={rules.weekStartsOn}
          focusedDate={focusedDate}
          onFocusedDateChange={setFocusedDate}
          isSelected={(date) => date === range.from || date === range.to}
          isUnavailable={rules.isUnavailable}
          rangePosition={rangePosition}
          multiselectable
          min={min}
          max={max}
          onSelect={(date) => {
            from.reset();
            to.reset();
            if (pickingEnd && range.from !== null) {
              setRange(ordered({ from: range.from, to: date }));
              setPickingEnd(false);
              setOpen(false);
              return;
            }
            setRange({ from: date, to: null });
            setPickingEnd(true);
          }}
        />
      </CalendarPopover>
    </Popover.Root>
  );
});

/**
 * A date field with typed entry and a calendar popup, in `single` or `range` mode. Dates are
 * `YYYY-MM-DD` strings; typing and display follow the calendar (Solar Hijri for Persian locales)
 * and the locale's digits, so `۱۴۰۵/۰۶/۲۰` and `1405/6/20` both mean `2026-09-11`.
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  function DatePicker(props, ref) {
    if (props.mode === "range") return <RangeDatePicker ref={ref} {...props} />;
    return <SingleDatePicker ref={ref} {...props} />;
  },
);

DatePicker.displayName = "DatePicker";
