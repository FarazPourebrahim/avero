"use client";

import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import { CheckIcon, ChevronRightIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";
import {
  menuCheckClasses,
  menuContentClasses,
  menuDangerItemClasses,
  menuIndicatorItemClasses,
  menuIndicatorSlotClasses,
  menuItemClasses,
  menuLabelClasses,
  menuRadioDotClasses,
  menuSeparatorClasses,
  menuSubChevronClasses,
  menuSubTriggerOpenClasses,
} from "../../utils/menu.js";

/**
 * A menu of actions opened from a button, such as a user menu. Radix supplies the WAI-ARIA menu
 * pattern: arrow keys, type-ahead, submenus that open toward the reading direction, and focus
 * return. It reads the direction from `AveroProvider`.
 */
export type DropdownMenuProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>;

/**
 * The menu root. Radix reads the direction only from its own provider, which `AveroProvider`
 * renders; passing it here keeps the Persian right-to-left default when there is no provider.
 */
export function DropdownMenu({ dir, ...props }: DropdownMenuProps) {
  const avero = useAvero();
  return <DropdownMenuPrimitive.Root dir={dir ?? avero.dir} {...props} />;
}

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export type DropdownMenuTriggerProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Trigger
>;
export type DropdownMenuGroupProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group>;
export type DropdownMenuRadioGroupProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioGroup
>;
export type DropdownMenuSubProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Sub>;

const contentClasses = [
  menuContentClasses,
  "max-h-(--radix-dropdown-menu-content-available-height)",
];

/** Props specific to `DropdownMenuContent`. It also accepts every Radix menu content prop. */
export type DropdownMenuContentOwnProps = {
  /** Portal target for the menu. @defaultValue `document.body` */
  container?: HTMLElement | null;
};

export type DropdownMenuContentProps = Omit<
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>,
  keyof DropdownMenuContentOwnProps
> &
  DropdownMenuContentOwnProps;

/** The menu panel. `align="start"` lines it up with the trigger's inline start. */
export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  function DropdownMenuContent(
    { container, align = "start", sideOffset = 6, collisionPadding = 16, className, ...props },
    ref,
  ) {
    return (
      <DropdownMenuPrimitive.Portal container={container}>
        <DropdownMenuPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          collisionPadding={collisionPadding}
          data-slot="dropdown-menu-content"
          className={cn(contentClasses, className)}
          {...props}
        />
      </DropdownMenuPrimitive.Portal>
    );
  },
);

DropdownMenuContent.displayName = "DropdownMenuContent";

/** Props specific to `DropdownMenuItem`. It also accepts every Radix menu item prop. */
export type DropdownMenuItemOwnProps = {
  /** `danger` marks a destructive action such as signing out or deleting. @defaultValue "default" */
  tone?: "default" | "danger";
};

export type DropdownMenuItemProps = Omit<
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>,
  keyof DropdownMenuItemOwnProps
> &
  DropdownMenuItemOwnProps;

/** An action. Put an icon before the label; use `asChild` to render a link. */
export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  function DropdownMenuItem({ tone = "default", className, ...props }, ref) {
    return (
      <DropdownMenuPrimitive.Item
        ref={ref}
        data-slot="dropdown-menu-item"
        data-tone={tone}
        className={cn(menuItemClasses, tone === "danger" && menuDangerItemClasses, className)}
        {...props}
      />
    );
  },
);

DropdownMenuItem.displayName = "DropdownMenuItem";

export type DropdownMenuCheckboxItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.CheckboxItem
>;

/** An item that toggles on and off; the check sits at the inline start. */
export const DropdownMenuCheckboxItem = forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(
  function DropdownMenuCheckboxItem({ className, children, ...props }, ref) {
    return (
      <DropdownMenuPrimitive.CheckboxItem
        ref={ref}
        data-slot="dropdown-menu-checkbox-item"
        className={cn(menuItemClasses, menuIndicatorItemClasses, className)}
        {...props}
      >
        <span className={menuIndicatorSlotClasses}>
          <DropdownMenuPrimitive.ItemIndicator>
            <CheckIcon className={menuCheckClasses} />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </DropdownMenuPrimitive.CheckboxItem>
    );
  },
);

DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export type DropdownMenuRadioItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioItem
>;

/** One choice in a `DropdownMenuRadioGroup`; the dot sits at the inline start. */
export const DropdownMenuRadioItem = forwardRef<HTMLDivElement, DropdownMenuRadioItemProps>(
  function DropdownMenuRadioItem({ className, children, ...props }, ref) {
    return (
      <DropdownMenuPrimitive.RadioItem
        ref={ref}
        data-slot="dropdown-menu-radio-item"
        className={cn(menuItemClasses, menuIndicatorItemClasses, className)}
        {...props}
      >
        <span className={menuIndicatorSlotClasses}>
          <DropdownMenuPrimitive.ItemIndicator>
            <span className={menuRadioDotClasses} />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </DropdownMenuPrimitive.RadioItem>
    );
  },
);

DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

export type DropdownMenuLabelProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>;

/** A heading for a group of items. */
export const DropdownMenuLabel = forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  function DropdownMenuLabel({ className, ...props }, ref) {
    return (
      <DropdownMenuPrimitive.Label
        ref={ref}
        data-slot="dropdown-menu-label"
        className={cn(menuLabelClasses, className)}
        {...props}
      />
    );
  },
);

DropdownMenuLabel.displayName = "DropdownMenuLabel";

export type DropdownMenuSeparatorProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Separator
>;

export const DropdownMenuSeparator = forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  function DropdownMenuSeparator({ className, ...props }, ref) {
    return (
      <DropdownMenuPrimitive.Separator
        ref={ref}
        data-slot="dropdown-menu-separator"
        className={cn(menuSeparatorClasses, className)}
        {...props}
      />
    );
  },
);

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export type DropdownMenuSubTriggerProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubTrigger
>;

/** Opens a submenu. The chevron points toward the side the submenu opens on. */
export const DropdownMenuSubTrigger = forwardRef<HTMLDivElement, DropdownMenuSubTriggerProps>(
  function DropdownMenuSubTrigger({ className, children, ...props }, ref) {
    return (
      <DropdownMenuPrimitive.SubTrigger
        ref={ref}
        data-slot="dropdown-menu-sub-trigger"
        className={cn(menuItemClasses, menuSubTriggerOpenClasses, className)}
        {...props}
      >
        {children}
        <ChevronRightIcon className={menuSubChevronClasses} />
      </DropdownMenuPrimitive.SubTrigger>
    );
  },
);

DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

/** Props specific to `DropdownMenuSubContent`. It also accepts every Radix submenu content prop. */
export type DropdownMenuSubContentOwnProps = {
  /** Portal target for the submenu. @defaultValue `document.body` */
  container?: HTMLElement | null;
};

export type DropdownMenuSubContentProps = Omit<
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>,
  keyof DropdownMenuSubContentOwnProps
> &
  DropdownMenuSubContentOwnProps;

export const DropdownMenuSubContent = forwardRef<HTMLDivElement, DropdownMenuSubContentProps>(
  function DropdownMenuSubContent({ container, className, ...props }, ref) {
    return (
      <DropdownMenuPrimitive.Portal container={container}>
        <DropdownMenuPrimitive.SubContent
          ref={ref}
          data-slot="dropdown-menu-sub-content"
          className={cn(contentClasses, className)}
          {...props}
        />
      </DropdownMenuPrimitive.Portal>
    );
  },
);

DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
