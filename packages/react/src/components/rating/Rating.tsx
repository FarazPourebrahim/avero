"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { useAvero, useAveroFormatter } from "../../i18n/AveroProvider.js";
import { formatMessage } from "../../i18n/dictionaries.js";
import { StarIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `Rating`. It also accepts every native `<span>` attribute. */
export type RatingOwnProps = {
  /** The score, e.g. `4.5`. */
  value: number;
  /** Visible text before the score, e.g. "امتیاز:". */
  label?: ReactNode;
  /** Fraction digits of the score; the reference shows `0.00`. @defaultValue 2 */
  fractionDigits?: number;
  /** Star size: `sm` (14px) or `md` (16px). @defaultValue "md" */
  size?: "sm" | "md";
};

export type RatingProps = Omit<HTMLAttributes<HTMLSpanElement>, keyof RatingOwnProps> &
  RatingOwnProps;

/**
 * Filled amber star with a score (D-15, R-04/R-05). Exposed to assistive technology as one image
 * labelled with the dictionary's `rating` string, e.g. "امتیاز ۴٫۵۰".
 */
export const Rating = forwardRef<HTMLSpanElement, RatingProps>(function Rating(
  { value, label, fractionDigits = 2, size = "md", className, ...props },
  ref,
) {
  const { dictionary } = useAvero();
  const format = useAveroFormatter();
  const score = format.number(value, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

  return (
    <span
      ref={ref}
      role="img"
      aria-label={formatMessage(dictionary.rating, { value: score })}
      data-slot="rating"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      <StarIcon
        className={cn(
          "shrink-0 fill-amber-400 text-amber-400",
          size === "sm" ? "size-3.5" : "size-4",
        )}
      />
      {label ? <span>{label}</span> : null}
      <span>{score}</span>
    </span>
  );
});

Rating.displayName = "Rating";
