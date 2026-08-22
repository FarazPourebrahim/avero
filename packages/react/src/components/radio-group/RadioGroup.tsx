"use client";

import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import { cn } from "../../utils/cn.js";

export type RadioGroupProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>;

/**
 * A single choice from a short list. Arrow keys move between options in reading direction, and the
 * direction comes from `AveroProvider` unless `dir` is set.
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { dir, className, ...props },
  ref,
) {
  const avero = useAvero();

  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      dir={dir ?? avero.dir}
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
});

RadioGroup.displayName = "RadioGroup";

export type RadioGroupItemProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>;

/** One option of a `RadioGroup`. The resting border meets the 3:1 contrast required for controls. */
export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  function RadioGroupItem({ className, ...props }, ref) {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        data-slot="radio-group-item"
        className={cn(
          "inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-500 bg-white transition",
          "data-[state=checked]:border-primary hover:border-gray-600",
          "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-60",
          "aria-invalid:border-red-500",
          className,
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="bg-primary size-2.5 rounded-full"
        />
      </RadioGroupPrimitive.Item>
    );
  },
);

RadioGroupItem.displayName = "RadioGroupItem";
