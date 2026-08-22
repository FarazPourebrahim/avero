"use client";

import { Switch as SwitchPrimitive } from "radix-ui";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn.js";

export type SwitchProps = ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;

/**
 * An on/off switch for settings that apply immediately. The thumb starts at the inline start and
 * slides toward the inline end, so it mirrors in right-to-left layouts.
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { className, ...props },
  ref,
) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      className={cn(
        "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-gray-500 p-0.5 transition-colors duration-200",
        "data-[state=checked]:bg-primary",
        "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "aria-invalid:ring-2 aria-invalid:ring-red-500",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-5 rounded-full bg-white shadow-xs transition-transform duration-200 data-[state=checked]:translate-x-5 rtl:data-[state=checked]:-translate-x-5"
      />
    </SwitchPrimitive.Root>
  );
});

Switch.displayName = "Switch";
