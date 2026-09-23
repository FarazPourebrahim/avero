"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import { cn } from "../../utils/cn.js";

/**
 * Spinner styles. `ring` and `track` are a single rotating border; `dots`, `bars` and `spokes` are
 * built from parts that share one animation, offset in time. Parts are sized in percentages of the
 * root, so every variant follows the same size scale.
 */
export const spinnerVariants = cva("inline-block shrink-0 align-middle", {
  variants: {
    variant: {
      ring: "animate-spin rounded-full border-2 border-current border-t-transparent",
      track: "animate-spin rounded-full border-2 border-current/20 border-t-current",
      glow: "glow-ring rounded-full",
      dots: "inline-flex items-center justify-between",
      bars: "inline-flex items-center justify-between",
      spokes: "relative",
    },
    size: {
      xs: "size-3.5",
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
    },
    tone: {
      current: "text-current",
      primary: "text-primary",
      muted: "text-gray-400",
      inverse: "text-white",
    },
  },
  compoundVariants: [
    // A 2px border leaves almost no opening at 14px, so the smallest bordered spinners use 1px.
    { variant: ["ring", "track"], size: "xs", class: "border" },
  ],
  defaultVariants: { variant: "ring", size: "sm", tone: "current" },
});

type SpinnerVariantProps = VariantProps<typeof spinnerVariants>;

// Offsets are negative so every part is already mid-cycle on the first frame, rather than the
// spinner starting blank and filling in. Written out in full so Tailwind can find each class.
const DOT_DELAYS = ["[animation-delay:-0.32s]", "[animation-delay:-0.16s]", ""] as const;

const BAR_DELAYS = [
  "[animation-delay:-0.45s]",
  "[animation-delay:-0.3s]",
  "[animation-delay:-0.15s]",
  "",
] as const;

// Eight spokes, 45° apart. Each is one eighth of the cycle behind the spoke before it, so the
// brightest spoke travels clockwise.
const SPOKES = [
  "rotate-0 [animation-delay:-1s]",
  "rotate-45 [animation-delay:-0.875s]",
  "rotate-90 [animation-delay:-0.75s]",
  "rotate-[135deg] [animation-delay:-0.625s]",
  "rotate-180 [animation-delay:-0.5s]",
  "rotate-[225deg] [animation-delay:-0.375s]",
  "rotate-[270deg] [animation-delay:-0.25s]",
  "rotate-[315deg] [animation-delay:-0.125s]",
] as const;

function spinnerParts(variant: SpinnerVariantProps["variant"]): ReactNode {
  switch (variant) {
    case "dots":
      return DOT_DELAYS.map((delay, index) => (
        <span
          key={index}
          data-slot="spinner-part"
          className={cn("animate-spinner-dot size-[26%] rounded-full bg-current", delay)}
        />
      ));
    case "bars":
      return BAR_DELAYS.map((delay, index) => (
        <span
          key={index}
          data-slot="spinner-part"
          className={cn("animate-spinner-bar h-full w-[16%] rounded-full bg-current", delay)}
        />
      ));
    case "spokes":
      // Each spoke hangs from the top edge and turns around the centre of the root: 50% of the
      // root's height is 178.57% of a spoke that is 28% tall.
      return SPOKES.map((spoke, index) => (
        <span
          key={index}
          data-slot="spinner-part"
          className={cn(
            "animate-spinner-spoke absolute inset-x-[44%] top-0 h-[28%] origin-[50%_178.57%] rounded-full bg-current",
            spoke,
          )}
        />
      ));
    default:
      return null;
  }
}

/** Props specific to `Spinner`. It also accepts every native `<span>` attribute. */
export type SpinnerOwnProps = {
  /**
   * Style. `ring` is a spinning border with a gap; `track` is an arc turning on a faint full
   * circle; `glow` is the indigo glow ring; `dots` are three pulsing dots; `bars` are four bars
   * rising and falling; `spokes` are eight spokes fading in turn. @defaultValue "ring"
   */
  variant?: SpinnerVariantProps["variant"];
  /** Diameter, from 14px (`xs`) to 32px (`xl`). @defaultValue "sm" */
  size?: SpinnerVariantProps["size"];
  /** Colour. `current` inherits, which is what a button needs. @defaultValue "current" */
  tone?: SpinnerVariantProps["tone"];
  /**
   * Accessible name. Set it when the spinner is the only sign of progress; leave it out inside a
   * control that already announces itself busy, so the state is not read twice.
   * @defaultValue the dictionary's `busy`, when `labelled` is set
   */
  label?: string;
  /** Announces the spinner to assistive technology. @defaultValue false */
  labelled?: boolean;
};

export type SpinnerProps = Omit<HTMLAttributes<HTMLSpanElement>, keyof SpinnerOwnProps> &
  SpinnerOwnProps;

/**
 * A busy indicator. It is decorative by default: a spinner inside a loading `Button` would
 * otherwise be announced on top of the button's own `aria-busy`. Set `labelled` where the spinner
 * is the only thing reporting progress.
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { variant, size, tone, label, labelled = false, className, children, ...props },
  ref,
) {
  const { dictionary } = useAvero();
  const announced = labelled || label !== undefined;

  return (
    <span
      ref={ref}
      data-slot="spinner"
      data-variant={variant ?? "ring"}
      className={cn(spinnerVariants({ variant, size, tone }), className)}
      {...(announced
        ? { role: "status", "aria-label": label ?? dictionary.busy }
        : { "aria-hidden": true })}
      {...props}
    >
      {spinnerParts(variant) ?? children}
    </span>
  );
});

Spinner.displayName = "Spinner";
