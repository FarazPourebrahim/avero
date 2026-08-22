"use client";

import { forwardRef, useState, type InputHTMLAttributes, type SyntheticEvent } from "react";
import { useControllableState } from "../../hooks/useControllableState.js";
import { useAvero } from "../../i18n/AveroProvider.js";
import { cn } from "../../utils/cn.js";
import { toLatinDigits, toPersianDigits } from "../../utils/format.js";

/** Converts Persian and Arabic digits to Latin, drops everything else and caps the code at `length`. */
function normalizeCode(text: string, length: number): string {
  return toLatinDigits(text).replace(/\D/g, "").slice(0, length);
}

// Codes are typed and deleted from the end, so the caret never sits anywhere else.
function keepCaretAtEnd(event: SyntheticEvent<HTMLInputElement>) {
  const input = event.currentTarget;
  const end = input.value.length;
  if (input.selectionStart !== end || input.selectionEnd !== end) {
    input.setSelectionRange(end, end);
  }
}

/** Props specific to `OtpInput`. It also accepts every native `<input>` attribute. */
export type OtpInputOwnProps = {
  /** Number of digits. @defaultValue 6 */
  length?: number;
  /** The code (controlled). Persian and Arabic digits are converted to Latin. */
  value?: string;
  /** Initial code (uncontrolled). @defaultValue "" */
  defaultValue?: string;
  /** Called with the cleaned code, in Latin digits, on every change. */
  onValueChange?: (value: string) => void;
  /** Called once, when the last digit is entered. */
  onComplete?: (code: string) => void;
  /** Classes for the wrapper that lays out the digit boxes. */
  containerClassName?: string;
  /** Classes added to every digit box. */
  slotClassName?: string;
};

export type OtpInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  keyof OtpInputOwnProps | "type" | "inputMode" | "autoComplete" | "maxLength" | "children"
> &
  OtpInputOwnProps;

/**
 * A one-time code field. One real input sits over the digit boxes, so SMS autofill, paste and
 * screen readers all see a single textbox. Codes read left to right on every page, and each box
 * shows the locale's digits.
 */
export const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>(function OtpInput(
  {
    length = 6,
    value,
    defaultValue,
    onValueChange,
    onComplete,
    containerClassName,
    slotClassName,
    className,
    disabled,
    onChange,
    onFocus,
    onBlur,
    onSelect,
    ...props
  },
  ref,
) {
  const { digits } = useAvero();
  const [code, setCode] = useControllableState({
    value: value === undefined ? undefined : normalizeCode(value, length),
    defaultValue: normalizeCode(defaultValue ?? "", length),
    onChange: onValueChange,
  });
  const [focused, setFocused] = useState(false);

  const invalid = props["aria-invalid"] === true || props["aria-invalid"] === "true";
  const activeIndex = Math.min(code.length, length - 1);

  return (
    <div
      dir="ltr"
      data-slot="otp-input-container"
      data-invalid={invalid ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      className={cn("relative inline-flex gap-2", containerClassName)}
    >
      {Array.from({ length }, (_, index) => {
        const digit = code[index];
        const active = focused && index === activeIndex;

        return (
          <div
            key={index}
            aria-hidden="true"
            data-slot="otp-input-slot"
            data-active={active ? "" : undefined}
            className={cn(
              "flex size-10 items-center justify-center rounded-xl border border-gray-500 bg-white text-lg font-semibold text-gray-900 transition sm:size-12",
              active && "border-primary ring-primary/20 ring-2",
              invalid && "border-red-500",
              invalid && active && "ring-red-500/20",
              disabled && "opacity-60",
              slotClassName,
            )}
          >
            {digit ? (
              digits === "fa" ? (
                toPersianDigits(digit)
              ) : (
                digit
              )
            ) : active ? (
              <span className="animate-blink h-5 w-px bg-gray-900" />
            ) : null}
          </div>
        );
      })}
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        spellCheck={false}
        dir="ltr"
        data-slot="otp-input"
        value={code}
        disabled={disabled}
        className={cn(
          "absolute inset-0 size-full cursor-text rounded-xl bg-transparent text-base text-transparent caret-transparent outline-none selection:bg-transparent disabled:cursor-not-allowed",
          className,
        )}
        onChange={(event) => {
          onChange?.(event);
          const next = normalizeCode(event.target.value, length);
          setCode(next);
          if (next.length === length && code.length < length) {
            onComplete?.(next);
          }
        }}
        onFocus={(event) => {
          onFocus?.(event);
          setFocused(true);
          keepCaretAtEnd(event);
        }}
        onBlur={(event) => {
          onBlur?.(event);
          setFocused(false);
        }}
        onSelect={(event) => {
          onSelect?.(event);
          keepCaretAtEnd(event);
        }}
        {...props}
      />
    </div>
  );
});

OtpInput.displayName = "OtpInput";
