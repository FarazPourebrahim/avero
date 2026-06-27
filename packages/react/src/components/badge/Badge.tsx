import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";
import { badgeVariants, type BadgeVariantProps } from "./badge.variants.js";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & BadgeVariantProps;

/** A small non-interactive label for statuses, counts and highlights. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant, tone, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-slot="badge"
      className={cn(badgeVariants({ variant, tone }), className)}
      {...props}
    />
  );
});

Badge.displayName = "Badge";
