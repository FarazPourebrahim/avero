"use client";

import { Select as SelectPrimitive } from "radix-ui";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ChevronDownIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";
import {
  formControlAriaInvalid,
  formControlFocus,
  formControlSurface,
} from "../../utils/formControl.js";

/**
 * Custom select. The trigger matches the other filter panel controls, and the listbox is
 * styled from the same token system.
 */
export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;
export const SelectGroup = SelectPrimitive.Group;

export type SelectProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Root>;
export type SelectValueProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Value>;

/** Props specific to `SelectTrigger`. It also accepts every Radix trigger prop. */
export type SelectTriggerOwnProps = {
  /** Replaces the chevron. */
  icon?: ReactNode;
};

export type SelectTriggerProps = Omit<
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
  keyof SelectTriggerOwnProps
> &
  SelectTriggerOwnProps;

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger({ icon, className, children, ...props }, ref) {
    return (
      <SelectPrimitive.Trigger
        ref={ref}
        data-slot="select-trigger"
        className={cn(
          "group flex w-full cursor-pointer items-center justify-between gap-2 px-3.5 py-2.5 text-start text-sm font-medium text-gray-900",
          formControlSurface,
          formControlFocus,
          "data-[placeholder]:font-normal data-[placeholder]:text-gray-500",
          "disabled:cursor-not-allowed disabled:opacity-60",
          formControlAriaInvalid,
          className,
        )}
        {...props}
      >
        <span className="truncate">{children}</span>
        <SelectPrimitive.Icon asChild>
          {icon ?? (
            <ChevronDownIcon className="size-4 shrink-0 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          )}
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  },
);

SelectTrigger.displayName = "SelectTrigger";

export type SelectContentProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Content>;

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent(
  { className, position = "popper", sideOffset = 6, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        sideOffset={sideOffset}
        data-slot="select-content"
        className={cn(
          "shadow-card-raised z-(--z-popover) max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-gray-200 bg-white",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1.5">{props.children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});

SelectContent.displayName = "SelectContent";

export type SelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item>;

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { className, children, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      data-slot="select-item"
      className={cn(
        "cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-700 outline-none select-none",
        "data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-700",
        "data-[state=checked]:font-medium data-[state=checked]:text-blue-600",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});

SelectItem.displayName = "SelectItem";

export type SelectLabelProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Label>;

export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(function SelectLabel(
  { className, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      data-slot="select-label"
      className={cn("px-3 py-1.5 text-xs font-bold text-gray-400", className)}
      {...props}
    />
  );
});

SelectLabel.displayName = "SelectLabel";

export type SelectSeparatorProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>;

export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(
  function SelectSeparator({ className, ...props }, ref) {
    return (
      <SelectPrimitive.Separator
        ref={ref}
        data-slot="select-separator"
        className={cn("my-1 h-px bg-gray-100", className)}
        {...props}
      />
    );
  },
);

SelectSeparator.displayName = "SelectSeparator";
