"use client";

import { Popover as PopoverPrimitive } from "radix-ui";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import { cn } from "../../utils/cn.js";

/**
 * A floating panel anchored to its trigger, for rich content such as a notification list or a
 * filter form. Radix supplies focus management, `Esc` and outside-click dismissal.
 */
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverClose = PopoverPrimitive.Close;

export type PopoverProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;
export type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>;
export type PopoverAnchorProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Anchor>;
export type PopoverCloseProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>;

/** Props specific to `PopoverContent`. It also accepts every Radix popover content prop. */
export type PopoverContentOwnProps = {
  /** Portal target for the panel. @defaultValue `document.body` */
  container?: HTMLElement | null;
};

export type PopoverContentProps = Omit<
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
  keyof PopoverContentOwnProps
> &
  PopoverContentOwnProps;

/**
 * The panel. `align="start"` and `"end"` follow the reading direction. Name it with `aria-label`
 * or `aria-labelledby`, since it is announced as a dialog.
 */
export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(
    { container, align = "center", sideOffset = 8, collisionPadding = 16, className, ...props },
    ref,
  ) {
    const { dir } = useAvero();

    return (
      <PopoverPrimitive.Portal container={container}>
        <PopoverPrimitive.Content
          ref={ref}
          // Portalled out of the page, so the direction is set here; floating-ui reads it to
          // mirror `start` and `end` for right-to-left.
          dir={dir}
          align={align}
          sideOffset={sideOffset}
          collisionPadding={collisionPadding}
          data-slot="popover-content"
          className={cn(
            "shadow-pop-wide z-(--z-popover) w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700 outline-none",
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Portal>
    );
  },
);

PopoverContent.displayName = "PopoverContent";
