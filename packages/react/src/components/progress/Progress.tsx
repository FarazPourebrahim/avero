"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Progress as RadixProgress } from "radix-ui";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn.js";

/** Linear progress (P-13), e.g. for capacity bars (`h-2 bg-gray-100 rounded-full`, primary fill). */
export const progressVariants = cva("relative w-full overflow-hidden rounded-full bg-gray-100", {
  variants: {
    size: {
      sm: "h-1.5",
      md: "h-2",
    },
  },
  defaultVariants: { size: "md" },
});

export const progressIndicatorVariants = cva(
  "h-full rounded-full transition-[width] duration-500",
  {
    variants: {
      tone: {
        primary: "bg-primary",
        success: "bg-emerald-500",
        danger: "bg-red-500",
      },
    },
    defaultVariants: { tone: "primary" },
  },
);

/** Props specific to `Progress`. It also accepts every native `<div>` attribute. */
export type ProgressOwnProps = {
  /** Current value, clamped to `0…max`. `null` renders an indeterminate bar. */
  value: number | null;
  /** Maximum value. Invalid values (≤ 0) fall back to 100. @defaultValue 100 */
  max?: number;
  /** Track height: `sm` (6px) or `md` (8px). @defaultValue "md" */
  size?: VariantProps<typeof progressVariants>["size"];
  /** Fill color. @defaultValue "primary" */
  tone?: VariantProps<typeof progressIndicatorVariants>["tone"];
};

export type ProgressProps = Omit<
  ComponentPropsWithoutRef<typeof RadixProgress.Root>,
  keyof ProgressOwnProps
> &
  ProgressOwnProps;

function clamp(value: number, max: number): number {
  return Math.min(Math.max(value, 0), max);
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { value, max = 100, size, tone, className, ...props },
  ref,
) {
  const safeMax = max > 0 ? max : 100;
  const current = value === null ? null : clamp(value, safeMax);
  const percent = current === null ? 0 : (current / safeMax) * 100;

  return (
    <RadixProgress.Root
      ref={ref}
      value={current}
      max={safeMax}
      data-slot="progress"
      className={cn(progressVariants({ size }), className)}
      {...props}
    >
      <RadixProgress.Indicator
        data-slot="progress-indicator"
        className={progressIndicatorVariants({ tone })}
        style={{ width: `${percent}%` }}
      />
    </RadixProgress.Root>
  );
});

Progress.displayName = "Progress";
