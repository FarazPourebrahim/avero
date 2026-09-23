import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";

/**
 * Text input. `outline` is the standard form control and matches `Select`, `Combobox`,
 * `DatePicker` and `TagInput`; `filter` is a compact square box; `soft` and `slate` match the
 * `Textarea` treatments of the same names.
 */
export const inputVariants = cva(
  "w-full text-sm transition focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-red-500 aria-invalid:focus:ring-red-500/20",
  {
    variants: {
      variant: {
        outline:
          "rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
        filter:
          "rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
        soft: "rounded-2xl border border-gray-200 bg-gray-50 p-4 leading-6 focus:border-gray-500 focus:ring-2 focus:ring-indigo-500/20",
        slate: "rounded-2xl border border-slate-200 p-4 focus:ring-2 focus:ring-indigo-500",
      },
    },
    defaultVariants: { variant: "outline" },
  },
);

/** Props specific to `Input`. It also accepts every native `<input>` attribute. */
export type InputOwnProps = {
  /** Visual style. @defaultValue "outline" */
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
