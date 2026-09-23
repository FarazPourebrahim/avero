import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";
import {
  formControlAriaInvalid,
  formControlFocus,
  formControlSurface,
} from "../../utils/formControl.js";

/**
 * Multi-line input. `outline` is the standard form control and matches `Input`, `Select` and
 * `DatePicker`; `soft` has a gray ground and `slate` a white ground with a slate border.
 */
export const textareaVariants = cva(
  "w-full text-sm transition focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-red-500 aria-invalid:focus:ring-red-500/20",
  {
    variants: {
      variant: {
        outline: [
          formControlSurface,
          formControlFocus,
          formControlAriaInvalid,
          "px-3.5 py-2.5 leading-6 text-gray-900 placeholder:text-gray-500",
        ],
        soft: "rounded-2xl border border-gray-200 bg-gray-50 p-4 leading-6 focus:border-gray-500 focus:ring-2 focus:ring-indigo-500/20",
        slate: "rounded-2xl border border-slate-200 p-4 focus:ring-2 focus:ring-indigo-500",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
      },
    },
    defaultVariants: { variant: "outline", resize: "none" },
  },
);

/** Props specific to `Textarea`. It also accepts every native `<textarea>` attribute. */
export type TextareaOwnProps = {
  /** Visual style. @defaultValue "outline" */
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
