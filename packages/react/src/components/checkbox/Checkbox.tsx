"use client";

import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { CheckIcon, MinusIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";

export type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

/**
 * A checkbox for independent on/off choices. `checked="indeterminate"` shows the mixed state of a
 * "select all" row. The resting border meets the 3:1 contrast required for form controls; the
 * filled state, hover, focus ring and timing follow the primary `Button`.
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
        "group inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-md border border-gray-500 bg-white text-white transition-all duration-200",
        "data-[state=unchecked]:hover:border-gray-600",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
        "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
        "data-[state=checked]:hover:border-primary-hover data-[state=checked]:hover:bg-primary-hover",
        "data-[state=indeterminate]:hover:border-primary-hover data-[state=indeterminate]:hover:bg-primary-hover",
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
        {/* A 3-unit stroke: the icons' default 2 draws barely more than 1px at this size. */}
        <CheckIcon strokeWidth={3} className="size-3.5 group-data-[state=indeterminate]:hidden" />
        <MinusIcon
          strokeWidth={3}
          className="hidden size-3.5 group-data-[state=indeterminate]:block"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = "Checkbox";
