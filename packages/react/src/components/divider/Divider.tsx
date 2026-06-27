import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";

/** Divider tones used by the reference (P-09): gray-100 (cards), slate-100 (profile), gray-200 (footer). */
export const dividerVariants = cva("shrink-0 border-0", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px self-stretch",
    },
    tone: {
      gray: "bg-gray-100",
      slate: "bg-slate-100",
      strong: "bg-gray-200",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    tone: "gray",
  },
});

export type DividerProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof dividerVariants> & {
    /** Decorative dividers are hidden from assistive technology. Defaults to `true`. */
    decorative?: boolean;
  };

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { className, orientation, tone, decorative = true, ...props },
  ref,
) {
  const semantics = decorative
    ? { role: "none" as const }
    : { role: "separator" as const, "aria-orientation": orientation ?? "horizontal" };

  return (
    <div
      ref={ref}
      data-slot="divider"
      data-orientation={orientation ?? "horizontal"}
      className={cn(dividerVariants({ orientation, tone }), className)}
      {...semantics}
      {...props}
    />
  );
});

Divider.displayName = "Divider";
