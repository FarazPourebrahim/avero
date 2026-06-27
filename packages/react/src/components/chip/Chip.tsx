import { Slot } from "radix-ui";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";
import { chipVariants, type ChipVariantProps } from "./chip.variants.js";

export type ChipProps = HTMLAttributes<HTMLSpanElement> &
  ChipVariantProps & {
    /** Renders the child element (usually a link) with chip styles instead of a `<span>`. */
    asChild?: boolean;
  };

/** A compact tag for categories, skills and filter links. Use `asChild` to make it a link. */
export const Chip = forwardRef<HTMLSpanElement, ChipProps>(function Chip(
  { asChild = false, className, variant, size, ...props },
  ref,
) {
  const Component = asChild ? Slot.Root : "span";
  return (
    <Component
      ref={ref}
      data-slot="chip"
      className={cn(chipVariants({ variant, size }), className)}
      {...props}
    />
  );
});

Chip.displayName = "Chip";
