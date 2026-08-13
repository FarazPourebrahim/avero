"use client";

import { ToggleGroup } from "radix-ui";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import { useControllableState } from "../../hooks/useControllableState.js";
import { useAvero } from "../../i18n/AveroProvider.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `ToggleChipGroup`. It also accepts every native `<div>` attribute. */
export type ToggleChipGroupOwnProps = {
  /** Selected values (controlled). */
  value?: string[];
  /** Initially selected values (uncontrolled). @defaultValue [] */
  defaultValue?: string[];
  /** Called with the new selection whenever a chip is toggled. */
  onValueChange?: (value: string[]) => void;
  /** Accessible name of the group, e.g. "شاخص‌های نمودار". */
  "aria-label": string;
};

export type ToggleChipGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof ToggleChipGroupOwnProps | "defaultValue" | "dir"
> &
  ToggleChipGroupOwnProps;

/**
 * A multi-select row of small chips, e.g. metric toggles above a chart.
 * Selected chips fill with their own color, typically the matching chart series color.
 */
export const ToggleChipGroup = forwardRef<HTMLDivElement, ToggleChipGroupProps>(
  function ToggleChipGroup({ value, defaultValue, onValueChange, className, ...props }, ref) {
    const { dir } = useAvero();
    const [current, setCurrent] = useControllableState<string[]>({
      value,
      defaultValue: defaultValue ?? [],
      onChange: onValueChange,
    });

    return (
      <ToggleGroup.Root
        ref={ref}
        type="multiple"
        dir={dir}
        value={current}
        onValueChange={setCurrent}
        data-slot="toggle-chip-group"
        className={cn("flex flex-wrap items-center gap-1 sm:gap-1.5", className)}
        {...props}
      />
    );
  },
);

ToggleChipGroup.displayName = "ToggleChipGroup";

export type ToggleChipProps = ComponentPropsWithoutRef<typeof ToggleGroup.Item> & {
  /** Fill color when selected (any CSS color, e.g. a chart series color). @defaultValue the primary token */
  color?: string;
};

export const ToggleChip = forwardRef<HTMLButtonElement, ToggleChipProps>(function ToggleChip(
  { color, className, style, ...props },
  ref,
) {
  const colorVariable = { "--toggle-chip-color": color ?? "var(--color-primary)" } as CSSProperties;

  return (
    <ToggleGroup.Item
      ref={ref}
      data-slot="toggle-chip"
      style={{ ...colorVariable, ...style }}
      className={cn(
        "text-3xs cursor-pointer rounded-lg px-2 py-1 font-medium transition-all sm:px-2.5",
        "data-[state=off]:bg-gray-50 data-[state=off]:text-gray-400 data-[state=off]:hover:bg-gray-100",
        "data-[state=on]:bg-(--toggle-chip-color) data-[state=on]:text-white data-[state=on]:shadow-xs",
        "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  );
});

ToggleChip.displayName = "ToggleChip";
