"use client";

import { Switch as SwitchPrimitive } from "radix-ui";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn.js";

export type SwitchProps = ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;

/**
 * An on/off switch for settings that apply immediately. The thumb starts at the inline start and
 * slides toward the inline end, so it mirrors in right-to-left layouts.
 *
 * It uses the soft palette `Checkbox` and `RadioGroup` share: a white track with a light outline and
 * a gray thumb while off, and a blue tint with a blue thumb once on. The off outline and thumb are
 * below the 3:1 contrast WCAG asks of controls, a deliberate choice recorded in
 * `docs/known-debts.md` with the override that restores it.
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
        // 44x24 with a 2px outline and 2px padding leaves a 16px thumb 20px of travel.
        "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-gray-300 bg-white p-0.5 transition-all duration-300 active:scale-95",
        "data-[state=unchecked]:hover:border-gray-400",
        "data-[state=checked]:border-blue-200 data-[state=checked]:bg-blue-50",
        "data-[state=checked]:hover:border-blue-300 data-[state=checked]:hover:bg-blue-100",
        "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "aria-invalid:border-red-500 aria-invalid:focus-visible:ring-red-500/40",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-gray-400 shadow-xs transition-all duration-300",
          "data-[state=checked]:translate-x-5 data-[state=checked]:bg-blue-600 rtl:data-[state=checked]:-translate-x-5",
        )}
      />
    </SwitchPrimitive.Root>
  );
});

Switch.displayName = "Switch";
