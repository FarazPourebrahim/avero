import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";

/**
 * Multi-line input: `soft` has a gray ground, `slate` a white ground with a slate
 * border.
 */
export const textareaVariants = cva(
  "w-full p-4 text-sm transition focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-red-500 aria-invalid:focus:ring-red-500/20",
  {
    variants: {
      variant: {
        soft: "rounded-2xl border border-gray-200 bg-gray-50 leading-6 focus:border-gray-500 focus:ring-2 focus:ring-indigo-500/20",
        slate: "rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
      },
    },
    defaultVariants: { variant: "soft", resize: "none" },
  },
);

/** Props specific to `Textarea`. It also accepts every native `<textarea>` attribute. */
export type TextareaOwnProps = {
  /** Visual style. @defaultValue "soft" */
  variant?: VariantProps<typeof textareaVariants>["variant"];
  /** Whether the box can be dragged taller. @defaultValue "none" */
  resize?: VariantProps<typeof textareaVariants>["resize"];
};

export type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  keyof TextareaOwnProps
> &
  TextareaOwnProps;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { variant, resize, rows = 4, className, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      data-slot="textarea"
      className={cn(textareaVariants({ variant, resize }), className)}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
