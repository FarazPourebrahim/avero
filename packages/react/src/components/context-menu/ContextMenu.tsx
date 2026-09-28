"use client";

import { ContextMenu as ContextMenuPrimitive } from "radix-ui";
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
 * A menu of actions opened by right-clicking, long-pressing or pressing the context-menu key on an
 * area, such as the actions on a message. It looks exactly like `DropdownMenu`, whose styles it
 * shares. Radix supplies the WAI-ARIA menu pattern: arrow keys, type-ahead and submenus that open
 * toward the reading direction.
 */
export type ContextMenuProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root>;

/**
 * The menu root. Radix reads the direction only from its own provider, which `AveroProvider`
 * renders; passing it here keeps the Persian right-to-left default when there is no provider.
 */
export function ContextMenu({ dir, ...props }: ContextMenuProps) {
  const avero = useAvero();
  return <ContextMenuPrimitive.Root dir={dir ?? avero.dir} {...props} />;
}

export const ContextMenuGroup = ContextMenuPrimitive.Group;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;
export const ContextMenuSub = ContextMenuPrimitive.Sub;

export type ContextMenuGroupProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Group>;
export type ContextMenuRadioGroupProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.RadioGroup
>;
export type ContextMenuSubProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Sub>;

export type ContextMenuTriggerProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger>;

/** The area that opens the menu. Use `asChild` to make an existing element the area. */
export const ContextMenuTrigger = forwardRef<HTMLSpanElement, ContextMenuTriggerProps>(
  function ContextMenuTrigger(props, ref) {
    return <ContextMenuPrimitive.Trigger ref={ref} data-slot="context-menu-trigger" {...props} />;
  },
);

ContextMenuTrigger.displayName = "ContextMenuTrigger";

/** Props specific to `ContextMenuContent`. It also accepts every Radix menu content prop. */
export type ContextMenuContentOwnProps = {
  /** Portal target for the menu. @defaultValue `document.body` */
  container?: HTMLElement | null;
};

export type ContextMenuContentProps = Omit<
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>,
  keyof ContextMenuContentOwnProps
> &
  ContextMenuContentOwnProps;

const contentClasses = [
  menuContentClasses,
  "max-h-(--radix-context-menu-content-available-height)",
];

/** The menu panel, opened at the pointer. */
export const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(
  function ContextMenuContent({ container, collisionPadding = 16, className, ...props }, ref) {
    return (
      <ContextMenuPrimitive.Portal container={container}>
        <ContextMenuPrimitive.Content
          ref={ref}
          collisionPadding={collisionPadding}
          data-slot="context-menu-content"
          className={cn(contentClasses, className)}
          {...props}
        />
      </ContextMenuPrimitive.Portal>
    );
  },
);

ContextMenuContent.displayName = "ContextMenuContent";

/** Props specific to `ContextMenuItem`. It also accepts every Radix menu item prop. */
export type ContextMenuItemOwnProps = {
  /** `danger` marks a destructive action such as deleting. @defaultValue "default" */
  tone?: "default" | "danger";
};

export type ContextMenuItemProps = Omit<
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item>,
  keyof ContextMenuItemOwnProps
> &
  ContextMenuItemOwnProps;

/** An action. Put an icon before the label; use `asChild` to render a link. */
export const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  function ContextMenuItem({ tone = "default", className, ...props }, ref) {
    return (
      <ContextMenuPrimitive.Item
        ref={ref}
        data-slot="context-menu-item"
        data-tone={tone}
        className={cn(menuItemClasses, tone === "danger" && menuDangerItemClasses, className)}
        {...props}
      />
    );
  },
);

ContextMenuItem.displayName = "ContextMenuItem";

export type ContextMenuCheckboxItemProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.CheckboxItem
>;

/** An item that toggles on and off; the check sits at the inline start. */
export const ContextMenuCheckboxItem = forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
  function ContextMenuCheckboxItem({ className, children, ...props }, ref) {
    return (
      <ContextMenuPrimitive.CheckboxItem
        ref={ref}
        data-slot="context-menu-checkbox-item"
        className={cn(menuItemClasses, menuIndicatorItemClasses, className)}
        {...props}
      >
        <span className={menuIndicatorSlotClasses}>
          <ContextMenuPrimitive.ItemIndicator>
            <CheckIcon className={menuCheckClasses} />
          </ContextMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </ContextMenuPrimitive.CheckboxItem>
    );
  },
);

ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

export type ContextMenuRadioItemProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.RadioItem
>;

/** One choice in a `ContextMenuRadioGroup`; the dot sits at the inline start. */
export const ContextMenuRadioItem = forwardRef<HTMLDivElement, ContextMenuRadioItemProps>(
  function ContextMenuRadioItem({ className, children, ...props }, ref) {
    return (
      <ContextMenuPrimitive.RadioItem
        ref={ref}
        data-slot="context-menu-radio-item"
        className={cn(menuItemClasses, menuIndicatorItemClasses, className)}
        {...props}
      >
        <span className={menuIndicatorSlotClasses}>
          <ContextMenuPrimitive.ItemIndicator>
            <span className={menuRadioDotClasses} />
          </ContextMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </ContextMenuPrimitive.RadioItem>
    );
  },
);

ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

export type ContextMenuLabelProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label>;

/** A heading for a group of items. */
export const ContextMenuLabel = forwardRef<HTMLDivElement, ContextMenuLabelProps>(
  function ContextMenuLabel({ className, ...props }, ref) {
    return (
      <ContextMenuPrimitive.Label
        ref={ref}
        data-slot="context-menu-label"
        className={cn(menuLabelClasses, className)}
        {...props}
      />
    );
  },
);

ContextMenuLabel.displayName = "ContextMenuLabel";

export type ContextMenuSeparatorProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Separator
>;

export const ContextMenuSeparator = forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(
  function ContextMenuSeparator({ className, ...props }, ref) {
    return (
      <ContextMenuPrimitive.Separator
        ref={ref}
        data-slot="context-menu-separator"
        className={cn(menuSeparatorClasses, className)}
        {...props}
      />
    );
  },
);

ContextMenuSeparator.displayName = "ContextMenuSeparator";

export type ContextMenuSubTriggerProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.SubTrigger
>;

/** Opens a submenu. The chevron points toward the side the submenu opens on. */
export const ContextMenuSubTrigger = forwardRef<HTMLDivElement, ContextMenuSubTriggerProps>(
  function ContextMenuSubTrigger({ className, children, ...props }, ref) {
    return (
      <ContextMenuPrimitive.SubTrigger
        ref={ref}
        data-slot="context-menu-sub-trigger"
        className={cn(menuItemClasses, menuSubTriggerOpenClasses, className)}
        {...props}
      >
        {children}
        <ChevronRightIcon className={menuSubChevronClasses} />
      </ContextMenuPrimitive.SubTrigger>
    );
  },
);

ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

/** Props specific to `ContextMenuSubContent`. It also accepts every Radix submenu content prop. */
export type ContextMenuSubContentOwnProps = {
  /** Portal target for the submenu. @defaultValue `document.body` */
  container?: HTMLElement | null;
};

export type ContextMenuSubContentProps = Omit<
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>,
  keyof ContextMenuSubContentOwnProps
> &
  ContextMenuSubContentOwnProps;

export const ContextMenuSubContent = forwardRef<HTMLDivElement, ContextMenuSubContentProps>(
  function ContextMenuSubContent({ container, className, ...props }, ref) {
    return (
      <ContextMenuPrimitive.Portal container={container}>
        <ContextMenuPrimitive.SubContent
          ref={ref}
          data-slot="context-menu-sub-content"
          className={cn(contentClasses, className)}
          {...props}
        />
      </ContextMenuPrimitive.Portal>
    );
  },
);

ContextMenuSubContent.displayName = "ContextMenuSubContent";
