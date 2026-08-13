import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";

export type NativeSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

/**
 * Native `<select>` (FM-04), e.g. a listing's sort control. It keeps the platform's own dropdown,
 * which stays the most reliable choice on touch devices; use `Select` when the trigger has to
 * match a custom filter panel style.
 */
export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(function NativeSelect(
  { className, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      data-slot="native-select"
      className={cn(
        "cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-sm transition focus:outline-none",
        "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "aria-invalid:border-red-500 aria-invalid:focus:ring-red-500/20",
        className,
      )}
      {...props}
    />
  );
});

NativeSelect.displayName = "NativeSelect";
