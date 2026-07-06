"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { useAvero, useAveroFormatter } from "../../i18n/AveroProvider.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `MatchScore`. It also accepts every native `<div>` attribute. */
export type MatchScoreOwnProps = {
  /** Match percentage, clamped to `0…100`. */
  value: number;
  /** Caption under the percentage. @defaultValue the dictionary's `matchLabel` ("تطابق" / "Match") */
  label?: ReactNode;
};

export type MatchScoreProps = Omit<HTMLAttributes<HTMLDivElement>, keyof MatchScoreOwnProps> &
  MatchScoreOwnProps;

/** Percentage and caption beside a suggested project (D-17, R-02). */
export const MatchScore = forwardRef<HTMLDivElement, MatchScoreProps>(function MatchScore(
  { value, label, className, ...props },
  ref,
) {
  const { dictionary } = useAvero();
  const format = useAveroFormatter();
  const percent = Math.min(Math.max(value, 0), 100);

  return (
    <div
      ref={ref}
      data-slot="match-score"
      className={cn("shrink-0 text-center", className)}
      {...props}
    >
      <div className="text-base font-bold text-gray-400 sm:text-lg">
        {format.number(percent / 100, { style: "percent", maximumFractionDigits: 0 })}
      </div>
      <span className="text-4xs sm:text-3xs block text-gray-400">
        {label ?? dictionary.matchLabel}
      </span>
    </div>
  );
});

MatchScore.displayName = "MatchScore";
