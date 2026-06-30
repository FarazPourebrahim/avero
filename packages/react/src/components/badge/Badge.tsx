import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";
import { badgeVariants, type BadgeVariantProps } from "./badge.variants.js";

/** Props specific to `Badge`. It also accepts every native `<span>` attribute. */
export type BadgeOwnProps = {
  /** Visual style. @defaultValue "status" */
  variant?: BadgeVariantProps["variant"];
  /** Color. Applies to the `status`, `outline`, `overlay` and `solid` variants. @defaultValue "neutral" */
  tone?: BadgeVariantProps["tone"];
};

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, keyof BadgeOwnProps> & BadgeOwnProps;

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
