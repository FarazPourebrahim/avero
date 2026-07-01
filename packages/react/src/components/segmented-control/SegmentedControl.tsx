"use client";

import { ToggleGroup } from "radix-ui";
import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import { useControllableState } from "../../hooks/useControllableState.js";
import { useAvero } from "../../i18n/AveroProvider.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `SegmentedControl`. It also accepts every native `<div>` attribute. */
export type SegmentedControlOwnProps = {
  /** Selected value (controlled). */
  value?: string;
  /** Initially selected value (uncontrolled). @defaultValue "" */
  defaultValue?: string;
  /** Called when the user selects another segment. A segment can't be deselected. */
  onValueChange?: (value: string) => void;
  /** Accessible name of the group, e.g. "نوع آنالیتیکس". */
  "aria-label": string;
};

export type SegmentedControlProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof SegmentedControlOwnProps | "defaultValue" | "dir"
> &
  SegmentedControlOwnProps;

/**
 * A single-choice switch on a gray track (N-05): the dashboard analytics switcher (R-02).
 * Arrow keys move between segments in reading direction.
 */
export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  function SegmentedControl({ value, defaultValue, onValueChange, className, ...props }, ref) {
    const { dir } = useAvero();
    const [current, setCurrent] = useControllableState({
      value,
      defaultValue: defaultValue ?? "",
      onChange: onValueChange,
    });

    return (
      <ToggleGroup.Root
        ref={ref}
        type="single"
        dir={dir}
        value={current}
        onValueChange={(next: string) => {
          if (next) setCurrent(next);
        }}
        data-slot="segmented-control"
        className={cn(
          "flex w-full items-center gap-1 overflow-x-auto rounded-xl bg-gray-100 p-1 sm:w-auto",
          className,
        )}
        {...props}
      />
    );
  },
);

SegmentedControl.displayName = "SegmentedControl";

export type SegmentedControlItemProps = ComponentPropsWithoutRef<typeof ToggleGroup.Item>;

export const SegmentedControlItem = forwardRef<HTMLButtonElement, SegmentedControlItemProps>(
  function SegmentedControlItem({ className, ...props }, ref) {
    return (
      <ToggleGroup.Item
        ref={ref}
        data-slot="segmented-control-item"
        className={cn(
          "text-2xs flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 font-medium transition-all sm:flex-initial sm:px-3 sm:text-xs",
          "data-[state=off]:text-gray-500 data-[state=off]:hover:text-gray-700",
          "data-[state=on]:bg-white data-[state=on]:text-indigo-600 data-[state=on]:shadow-xs",
          "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:outline-none",
          className,
        )}
        {...props}
      />
    );
  },
);

SegmentedControlItem.displayName = "SegmentedControlItem";
