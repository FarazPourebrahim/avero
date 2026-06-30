import { Slot } from "radix-ui";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";
import { chipVariants, type ChipVariantProps } from "./chip.variants.js";

/** Props specific to `Chip`. It also accepts every native `<span>` attribute. */
export type ChipOwnProps = {
  /** Visual style. @defaultValue "category" */
  variant?: ChipVariantProps["variant"];
  /** Size. Only the `category` variant has a smaller `sm` size. @defaultValue "md" */
  size?: ChipVariantProps["size"];
  /** Renders the child element (usually a link) with chip styles instead of a `<span>`. @defaultValue false */
  asChild?: boolean;
};

export type ChipProps = Omit<HTMLAttributes<HTMLSpanElement>, keyof ChipOwnProps> & ChipOwnProps;

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
