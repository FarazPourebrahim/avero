"use client";

import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { CheckIcon, MinusIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";

export type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

/**
 * A checkbox for independent on/off choices. `checked="indeterminate"` shows the mixed state of a
 * "select all" row. The resting border meets the 3:1 contrast required for form controls.
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
        "group inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-md border border-gray-500 bg-white text-white transition",
        "hover:border-gray-600",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
        "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
        "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "aria-invalid:border-red-500",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center"
      >
        <CheckIcon className="size-3.5 group-data-[state=indeterminate]:hidden" />
        <MinusIcon className="hidden size-3.5 group-data-[state=indeterminate]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = "Checkbox";
