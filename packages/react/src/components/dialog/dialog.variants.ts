import { cva, type VariantProps } from "class-variance-authority";

/** The dimmed, blurred scrim behind a modal dialog. */
export const dialogOverlayClasses = "fixed inset-0 z-(--z-modal) bg-black/50 backdrop-blur-sm";

/**
 * The modal panel. It is centred horizontally with logical insets and auto margins rather than a
 * physical translate, so it needs no direction-specific rules, and it scrolls inside once it
 * reaches 90% of the viewport height.
 */
export const dialogContentVariants = cva(
  [
    "fixed inset-x-4 top-1/2 z-(--z-modal-content) mx-auto flex max-h-[90vh] -translate-y-1/2 flex-col overflow-hidden",
    "shadow-modal rounded-3xl bg-white focus:outline-none",
  ],
  {
    variants: {
      size: {
        /** Short confirmations. */
        sm: "max-w-sm",
        /** Forms and most dialogs. */
        md: "max-w-lg",
        /** Rich content such as previews. */
        lg: "max-w-3xl",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type DialogContentVariantProps = VariantProps<typeof dialogContentVariants>;
