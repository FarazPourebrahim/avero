"use client";

import { Dialog as DialogPrimitive } from "radix-ui";
import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import { XIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";
import {
  dialogContentVariants,
  dialogOverlayClasses,
  type DialogContentVariantProps,
} from "./dialog.variants.js";

/**
 * A modal dialog. Radix Dialog supplies the focus trap, `Esc`, scroll lock and focus return; Avero
 * adds the blurred scrim, the rounded panel and the header, body and footer layout.
 */
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export type DialogProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;
export type DialogTriggerProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;
export type DialogCloseProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;

/** Props specific to `DialogContent`. It also accepts every Radix dialog content prop. */
export type DialogContentOwnProps = {
  /** Panel width. @defaultValue "md" */
  size?: DialogContentVariantProps["size"];
  /** Shows a close button in the top corner at the inline end. @defaultValue true */
  showClose?: boolean;
  /** Accessible label of the close button. @defaultValue the dictionary's `close` */
  closeLabel?: string;
  /** Classes for the scrim behind the panel. */
  overlayClassName?: string;
  /** Portal target for the panel and its scrim. @defaultValue `document.body` */
  container?: HTMLElement | null;
};

export type DialogContentProps = Omit<
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
  keyof DialogContentOwnProps
> &
  DialogContentOwnProps;

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  {
    size,
    showClose = true,
    closeLabel,
    overlayClassName,
    container,
    className,
    children,
    ...props
  },
  ref,
) {
  const { dictionary } = useAvero();

  return (
    <DialogPrimitive.Portal container={container}>
      <DialogPrimitive.Overlay
        data-slot="dialog-overlay"
        className={cn(dialogOverlayClasses, overlayClassName)}
      />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="dialog-content"
        className={cn(dialogContentVariants({ size }), className)}
        {...props}
      >
        {children}
        {/* After the content in the DOM, so opening focuses the first field rather than the close
            button; it is still drawn in the corner. */}
        {showClose ? (
          <DialogPrimitive.Close
            aria-label={closeLabel ?? dictionary.close}
            data-slot="dialog-close"
            className="absolute end-4 top-4 cursor-pointer rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none"
          >
            <XIcon className="size-5" />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

DialogContent.displayName = "DialogContent";

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;

/** Title and description at the top of the panel, clear of the close button. */
export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(function DialogHeader(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1.5 border-b border-gray-100 p-6 pe-14", className)}
      {...props}
    />
  );
});

DialogHeader.displayName = "DialogHeader";

export type DialogTitleProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;

/** The dialog's accessible name. Every dialog needs one. */
export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(function DialogTitle(
  { className, ...props },
  ref,
) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      data-slot="dialog-title"
      className={cn("text-lg font-bold text-gray-900", className)}
      {...props}
    />
  );
});

DialogTitle.displayName = "DialogTitle";

export type DialogDescriptionProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;

/** Announced with the title when the dialog opens. */
export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  function DialogDescription({ className, ...props }, ref) {
    return (
      <DialogPrimitive.Description
        ref={ref}
        data-slot="dialog-description"
        className={cn("text-sm leading-6 text-gray-500", className)}
        {...props}
      />
    );
  },
);

DialogDescription.displayName = "DialogDescription";

export type DialogBodyProps = HTMLAttributes<HTMLDivElement>;

/** The scrolling middle of the panel. */
export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(function DialogBody(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="dialog-body"
      className={cn("flex-1 overflow-y-auto p-6", className)}
      {...props}
    />
  );
});

DialogBody.displayName = "DialogBody";

export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;

/** Actions at the bottom of the panel, aligned to the inline end. */
export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(function DialogFooter(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="dialog-footer"
      className={cn(
        "flex flex-wrap items-center justify-end gap-2 border-t border-gray-100 bg-gray-50/60 px-6 py-4",
        className,
      )}
      {...props}
    />
  );
});

DialogFooter.displayName = "DialogFooter";
