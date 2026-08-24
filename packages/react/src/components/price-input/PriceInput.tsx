"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { useControllableState } from "../../hooks/useControllableState.js";
import { useAvero, useAveroFormatter } from "../../i18n/AveroProvider.js";
import { cn } from "../../utils/cn.js";
import { toLatinDigits } from "../../utils/format.js";
import { mergeRefs } from "../../utils/refs.js";
import { inputVariants, type InputOwnProps } from "../input/Input.js";

// The caret only exists in the browser, and React 18 warns about layout effects on the server.
const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const DIGIT = /[0-9۰-۹٠-٩]/;

function digitsOf(text: string): string {
  return toLatinDigits(text).replace(/\D/g, "");
}

/** The index in `text` just after its `count`-th digit, so the caret survives regrouping. */
function positionAfterDigits(text: string, count: number): number {
  if (count <= 0) return 0;
  let seen = 0;
  for (let index = 0; index < text.length; index += 1) {
    if (DIGIT.test(text.charAt(index))) {
      seen += 1;
      if (seen === count) return index + 1;
    }
  }
  return text.length;
}

/** Props specific to `PriceInput`. It also accepts every native `<input>` attribute. */
export type PriceInputOwnProps = {
  /** The amount (controlled). `null` means empty. */
  value?: number | null;
  /** Initial amount (uncontrolled). @defaultValue null */
  defaultValue?: number | null;
  /** Called with the whole-number amount, or `null` when the field is cleared. */
  onValueChange?: (value: number | null) => void;
  /** Largest amount. Typing past it sets the amount to `max`. */
  max?: number;
  /** Unit after the amount; `null` hides it. @defaultValue the dictionary's `currencyToman` */
  currency?: ReactNode;
  /** Visual style, shared with `Input`. @defaultValue "filter" */
  variant?: InputOwnProps["variant"];
  /** Classes for the wrapper around the input and the currency. */
  containerClassName?: string;
};

export type PriceInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  keyof PriceInputOwnProps | "type" | "inputMode" | "min" | "step"
> &
  PriceInputOwnProps;

/**
 * An amount field. It accepts Latin, Persian and Arabic digits, shows the amount grouped in the
 * locale's digits (`۲٬۵۰۰٬۰۰۰`), keeps the caret in place while regrouping, and reports a number.
 */
export const PriceInput = forwardRef<HTMLInputElement, PriceInputProps>(function PriceInput(
  {
    value,
    defaultValue,
    onValueChange,
    max,
    currency,
    variant,
    containerClassName,
    className,
    name,
    disabled,
    onChange,
    "aria-describedby": describedByProp,
    ...props
  },
  ref,
) {
  const { dictionary } = useAvero();
  const format = useAveroFormatter();
  const currencyId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  // Digits before the caret, restored after the regrouped value renders.
  const pendingCaret = useRef<number | null>(null);

  const [amount, setAmount] = useControllableState<number | null>({
    value,
    defaultValue: defaultValue ?? null,
    onChange: onValueChange,
  });

  const display = amount === null ? "" : format.number(amount, { maximumFractionDigits: 0 });
  const currencyNode = currency === undefined ? dictionary.currencyToman : currency;
  const describedBy =
    [describedByProp, currencyNode ? currencyId : undefined].filter(Boolean).join(" ") || undefined;

  useBrowserLayoutEffect(() => {
    const input = inputRef.current;
    const digitCount = pendingCaret.current;
    if (!input || digitCount === null) return;
    pendingCaret.current = null;
    const position = positionAfterDigits(input.value, digitCount);
    input.setSelectionRange(position, position);
  });

  return (
    <div
      data-slot="price-input"
      data-disabled={disabled ? "" : undefined}
      className={cn("relative w-full", containerClassName)}
    >
      <input
        ref={mergeRefs(ref, inputRef)}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        data-slot="price-input-control"
        value={display}
        disabled={disabled}
        aria-describedby={describedBy}
        className={cn(inputVariants({ variant }), currencyNode ? "pe-16" : undefined, className)}
        onChange={(event) => {
          onChange?.(event);
          const input = event.target;
          const caret = input.selectionStart ?? input.value.length;
          const typed = digitsOf(input.value);
          const withoutLeadingZeros = typed.replace(/^0+(?=\d)/, "");
          let digitsBeforeCaret = Math.max(
            digitsOf(input.value.slice(0, caret)).length -
              (typed.length - withoutLeadingZeros.length),
            0,
          );

          let next = typed === "" ? null : Number(withoutLeadingZeros);
          if (next !== null && !Number.isSafeInteger(next)) next = amount;
          if (next !== null && max !== undefined && next > max) {
            next = max;
            digitsBeforeCaret = String(max).length;
          }

          if (next === amount) {
            // Nothing to report, e.g. a letter was typed: put the formatted text back without
            // moving the caret.
            input.value = display;
            const position = positionAfterDigits(display, digitsBeforeCaret);
            input.setSelectionRange(position, position);
            return;
          }

          pendingCaret.current = digitsBeforeCaret;
          setAmount(next);
        }}
        {...props}
      />
      {currencyNode ? (
        <span
          id={currencyId}
          data-slot="price-input-currency"
          className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3.5 text-sm text-gray-500"
        >
          {currencyNode}
        </span>
      ) : null}
      {name ? (
        <input
          type="hidden"
          name={name}
          value={amount === null ? "" : String(amount)}
          disabled={disabled}
        />
      ) : null}
    </div>
  );
});

PriceInput.displayName = "PriceInput";
