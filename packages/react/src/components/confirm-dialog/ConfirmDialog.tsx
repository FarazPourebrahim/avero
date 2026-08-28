"use client";

import { AlertDialog } from "radix-ui";
import { forwardRef, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { useControllableState } from "../../hooks/useControllableState.js";
import { useAvero } from "../../i18n/AveroProvider.js";
import { cn } from "../../utils/cn.js";
import { Button } from "../button/Button.js";
import { dialogContentVariants, dialogOverlayClasses } from "../dialog/dialog.variants.js";

/** Props specific to `ConfirmDialog`. It also accepts every Radix alert dialog content prop. */
export type ConfirmDialogOwnProps = {
  /** The question being confirmed, e.g. "این دوره حذف شود؟". */
  title: ReactNode;
  /** What happens if the action goes ahead. */
  description?: ReactNode;
  /**
   * Runs the action. A returned promise keeps the dialog open with a busy confirm button until it
   * settles; it closes when the promise resolves and stays open when it rejects, so the action
   * can be retried. Report the failure yourself.
   */
  onConfirm: () => void | Promise<unknown>;
  /** The element that opens the dialog, usually a `Button`. */
  trigger?: ReactNode;
  /** Whether the dialog is open (controlled). */
  open?: boolean;
  /** Initially open (uncontrolled). @defaultValue false */
  defaultOpen?: boolean;
  /** Called when the dialog opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Confirm button label. @defaultValue the dictionary's `confirm` */
  confirmLabel?: ReactNode;
  /** Cancel button label. @defaultValue the dictionary's `cancel` */
  cancelLabel?: ReactNode;
  /** `danger` styles the confirm button for destructive actions. @defaultValue "default" */
  tone?: "default" | "danger";
  /** Extra content between the description and the buttons. */
  children?: ReactNode;
};

export type ConfirmDialogProps = Omit<
  ComponentPropsWithoutRef<typeof AlertDialog.Content>,
  keyof ConfirmDialogOwnProps | "title"
> &
  ConfirmDialogOwnProps;

/**
 * Asks before an action goes ahead. Built on Radix AlertDialog: it can't be dismissed by clicking
 * outside, and focus starts on the cancel button so a stray Enter never confirms.
 */
export const ConfirmDialog = forwardRef<HTMLDivElement, ConfirmDialogProps>(function ConfirmDialog(
  {
    title,
    description,
    onConfirm,
    trigger,
    open,
    defaultOpen = false,
    onOpenChange,
    confirmLabel,
    cancelLabel,
    tone = "default",
    children,
    className,
    onEscapeKeyDown,
    ...props
  },
  ref,
) {
  const { dictionary } = useAvero();
  const [isOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const [pending, setPending] = useState(false);

  async function confirm() {
    const result = onConfirm();
    if (!result) {
      setOpen(false);
      return;
    }
    setPending(true);
    try {
      await result;
      setOpen(false);
    } catch {
      // Left to the caller to report; staying open lets the action be retried.
    } finally {
      setPending(false);
    }
  }

  return (
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={(next) => {
        if (!pending) setOpen(next);
      }}
    >
      {trigger ? <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger> : null}
      <AlertDialog.Portal>
        <AlertDialog.Overlay data-slot="confirm-dialog-overlay" className={dialogOverlayClasses} />
        <AlertDialog.Content
          ref={ref}
          data-slot="confirm-dialog"
          data-tone={tone}
          // Without a description, Radix expects the reference to be removed explicitly.
          {...(description ? {} : { "aria-describedby": undefined })}
          className={cn(dialogContentVariants({ size: "sm" }), "gap-5 p-6", className)}
          onEscapeKeyDown={(event) => {
            onEscapeKeyDown?.(event);
            if (pending) event.preventDefault();
          }}
          {...props}
        >
          <div className="flex flex-col gap-2">
            <AlertDialog.Title
              data-slot="confirm-dialog-title"
              className="text-lg font-bold text-gray-900"
            >
              {title}
            </AlertDialog.Title>
            {description ? (
              <AlertDialog.Description
                data-slot="confirm-dialog-description"
                className="text-sm leading-6 text-gray-500"
              >
                {description}
              </AlertDialog.Description>
            ) : null}
          </div>
          {children}
          <div data-slot="confirm-dialog-actions" className="flex flex-wrap justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <Button variant="outline" disabled={pending}>
                {cancelLabel ?? dictionary.cancel}
              </Button>
            </AlertDialog.Cancel>
            <Button
              variant={tone === "danger" ? "danger" : "primary"}
              loading={pending}
              data-slot="confirm-dialog-confirm"
              onClick={() => void confirm()}
            >
              {confirmLabel ?? dictionary.confirm}
            </Button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
});

ConfirmDialog.displayName = "ConfirmDialog";
