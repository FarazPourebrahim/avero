import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";

/**
 * Text input (FM-02). `filter` is a compact box for filter panels; `soft` and `slate` match the
 * two `Textarea` treatments, so an input can sit beside one.
 */
export const inputVariants = cva(
  "w-full text-sm transition focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-red-500 aria-invalid:focus:ring-red-500/20",
  {
    variants: {
      variant: {
        filter:
          "rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
        soft: "rounded-2xl border border-gray-200 bg-gray-50 p-4 leading-6 focus:border-gray-500 focus:ring-2 focus:ring-indigo-500/20",
        slate: "rounded-2xl border border-slate-200 p-4 focus:ring-2 focus:ring-indigo-500",
      },
    },
    defaultVariants: { variant: "filter" },
  },
);

/** Props specific to `Input`. It also accepts every native `<input>` attribute. */
export type InputOwnProps = {
  /** Visual style. @defaultValue "filter" */
  variant?: VariantProps<typeof inputVariants>["variant"];
};

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputOwnProps> &
  InputOwnProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { variant, type = "text", className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
});

Input.displayName = "Input";
