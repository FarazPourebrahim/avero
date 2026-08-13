"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Dialog as DialogPrimitive } from "radix-ui";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import { XIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";

/**
 * Slide-in panel (O-01) in two sizes: `wide` for a site header menu and `panel` for a dashboard
 * menu. Radix Dialog supplies the focus trap, `Esc` and scroll lock, and a dimmed scrim keeps the
 * page behind it from being clicked.
 */
export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;
export const DrawerTitle = DialogPrimitive.Title;
export const DrawerDescription = DialogPrimitive.Description;

export type DrawerProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;
export type DrawerTriggerProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;
export type DrawerCloseProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;

export const drawerVariants = cva(
  "fixed top-0 bottom-0 z-(--z-drawer) flex flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out",
  {
    variants: {
      side: {
        /** Opens from the inline start. */
        start: "start-0 border-e border-gray-100",
        /** Opens from the inline end. */
        end: "end-0 border-s border-gray-100",
      },
      size: {
        /** Two thirds of the viewport, e.g. a site header menu. */
        wide: "w-2/3",
        /** 75%, half from `sm`, capped; e.g. a dashboard menu. */
        panel: "w-[75%] max-w-sm sm:w-1/2",
      },
    },
    defaultVariants: { side: "end", size: "panel" },
  },
);

/** Props specific to `DrawerContent`. It also accepts every Radix dialog content prop. */
export type DrawerContentOwnProps = {
  /** Which edge the panel slides in from. @defaultValue "end" */
  side?: VariantProps<typeof drawerVariants>["side"];
  /** Panel width. @defaultValue "panel" */
  size?: VariantProps<typeof drawerVariants>["size"];
  /** Classes for the scrim behind the panel. */
  overlayClassName?: string;
  /** Portal target for the panel and its scrim. @defaultValue `document.body` */
  container?: HTMLElement | null;
};

export type DrawerContentProps = Omit<
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
  keyof DrawerContentOwnProps
> &
  DrawerContentOwnProps;

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(function DrawerContent(
  { side, size, overlayClassName, container, className, children, ...props },
  ref,
) {
  return (
    <DialogPrimitive.Portal container={container}>
      <DialogPrimitive.Overlay
        data-slot="drawer-overlay"
        className={cn("fixed inset-0 z-(--z-drawer) bg-black/40", overlayClassName)}
      />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="drawer-content"
        className={cn(drawerVariants({ side, size }), className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

DrawerContent.displayName = "DrawerContent";

/** Props specific to `DrawerHeader`. It also accepts every native `<div>` attribute. */
export type DrawerHeaderOwnProps = {
  /** Leading icon beside the title. */
  icon?: ReactNode;
  /** Accessible label for the close button. @defaultValue the dictionary's `closeMenu` */
  closeLabel?: string;
  /** Hides the close button, e.g. when the drawer closes some other way. @defaultValue true */
  showClose?: boolean;
};

export type DrawerHeaderProps = Omit<ComponentPropsWithoutRef<"div">, keyof DrawerHeaderOwnProps> &
  DrawerHeaderOwnProps;

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(function DrawerHeader(
  { icon, closeLabel, showClose = true, className, children, ...props },
  ref,
) {
  const { dictionary } = useAvero();

  return (
    <div
      ref={ref}
      data-slot="drawer-header"
      className={cn(
        "flex items-center justify-between border-b border-gray-100 bg-zinc-50/70 p-4",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
        {icon}
        {children}
      </div>
      {showClose ? (
        <DialogPrimitive.Close
          aria-label={closeLabel ?? dictionary.closeMenu}
          className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none"
        >
          <XIcon className="size-5" />
        </DialogPrimitive.Close>
      ) : null}
    </div>
  );
});

DrawerHeader.displayName = "DrawerHeader";

export type DrawerBodyProps = ComponentPropsWithoutRef<"div">;

/** The scrolling area of the drawer. */
export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(function DrawerBody(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="drawer-body"
      className={cn("flex-1 space-y-1 overflow-y-auto p-4", className)}
      {...props}
    />
  );
});

DrawerBody.displayName = "DrawerBody";
