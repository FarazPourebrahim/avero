"use client";

import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { CheckIcon, MinusIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";

export type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

/**
 * A checkbox for independent on/off choices. `checked="indeterminate"` shows the mixed state of a
 * "select all" row. It uses the library's soft palette rather than a solid fill: a light outline
 * while unchecked, and a blue tint with a blue tick once checked, like `Chip` and `IconTile`.
 * Checking pops the box and draws the tick in; `base.css` settles both at once under reduced motion.
 *
 * The unchecked outline is below the 3:1 contrast WCAG asks of control boundaries. That is a
 * deliberate design choice, recorded in `docs/known-debts.md` with the override that restores it.
 */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { className, ...props },
  ref,
) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(
        "group inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 bg-white transition-all duration-300 active:scale-95",
        "data-[state=unchecked]:hover:border-gray-400",
        "data-[state=checked]:animate-check-pop data-[state=indeterminate]:animate-check-pop",
        "data-[state=checked]:border-blue-200 data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-600",
        "data-[state=indeterminate]:border-blue-200 data-[state=indeterminate]:bg-blue-50 data-[state=indeterminate]:text-blue-600",
        "data-[state=checked]:hover:border-blue-300 data-[state=checked]:hover:bg-blue-100",
        "data-[state=indeterminate]:hover:border-blue-300 data-[state=indeterminate]:hover:bg-blue-100",
        "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "aria-invalid:border-red-500 aria-invalid:focus-visible:ring-red-500/40",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center"
      >
        {/* A 3-unit stroke: the icons' default 2 draws barely more than 1px at this size. The
            indicator only mounts once checked, so the tick draws itself in every time. */}
        <CheckIcon
          strokeWidth={3}
          className="[&_path]:animate-check-draw size-4 group-data-[state=indeterminate]:hidden"
        />
        <MinusIcon
          strokeWidth={3}
          className="hidden size-4 group-data-[state=indeterminate]:block"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = "Checkbox";
