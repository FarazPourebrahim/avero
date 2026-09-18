"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import { cn } from "../../utils/cn.js";

/** Spinner styles: a spinning ring, or the indigo glow used on a full-page wait. */
export const spinnerVariants = cva("inline-block shrink-0 align-middle", {
  variants: {
    variant: {
      ring: "animate-spin rounded-full border-2 border-current border-t-transparent",
      glow: "glow-ring rounded-full",
    },
    size: {
      xs: "size-3.5 border",
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
  defaultVariants: { variant: "ring", size: "sm", tone: "current" },
});

type SpinnerVariantProps = VariantProps<typeof spinnerVariants>;

/** Props specific to `Spinner`. It also accepts every native `<span>` attribute. */
export type SpinnerOwnProps = {
  /** `ring` is the spinning border; `glow` is the indigo glow ring. @defaultValue "ring" */
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
  { variant, size, tone, label, labelled = false, className, ...props },
  ref,
) {
  const { dictionary } = useAvero();
  const announced = labelled || label !== undefined;

  return (
    <span
      ref={ref}
      data-slot="spinner"
      className={cn(spinnerVariants({ variant, size, tone }), className)}
      {...(announced
        ? { role: "status", "aria-label": label ?? dictionary.busy }
        : { "aria-hidden": true })}
      {...props}
    />
  );
});

Spinner.displayName = "Spinner";
