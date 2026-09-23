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

/**
 * One option of a `RadioGroup`, on the library's soft palette like `Checkbox`: a light outline while
 * unselected, and a blue tint with a blue dot once chosen. Choosing pops the dot in; `base.css`
 * settles it at once under reduced motion. The outline turns red inside an `aria-invalid` group.
 *
 * The unselected outline is below the 3:1 contrast WCAG asks of control boundaries. That is a
 * deliberate design choice, recorded in `docs/known-debts.md` with the override that restores it.
 */
export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  function RadioGroupItem({ className, ...props }, ref) {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        data-slot="radio-group-item"
        className={cn(
          "inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-gray-300 bg-white transition-all duration-300 active:scale-95",
          "data-[state=unchecked]:hover:border-gray-400",
          "data-[state=checked]:border-blue-200 data-[state=checked]:bg-blue-50",
          "data-[state=checked]:hover:border-blue-300 data-[state=checked]:hover:bg-blue-100",
          "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-60",
          "aria-invalid:border-red-500 aria-invalid:focus-visible:ring-red-500/40",
          "[[aria-invalid=true]_&]:border-red-500 [[aria-invalid=true]_&]:focus-visible:ring-red-500/40",
          className,
        )}
        {...props}
      >
        {/* The indicator only mounts once chosen, so the dot pops in every time. */}
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="animate-check-pop size-2.5 rounded-full bg-blue-600"
        />
      </RadioGroupPrimitive.Item>
    );
  },
);

RadioGroupItem.displayName = "RadioGroupItem";
