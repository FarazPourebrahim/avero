import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";

export type GlowOrbsProps = HTMLAttributes<HTMLDivElement>;

/**
 * Decorative blurred orbs for dark banners: a primary glow at the top inline-start
 * corner and a cyan glow at the bottom inline-end corner. Place it inside a `relative
 * overflow-hidden` container and put the content above it with `relative z-10`.
 */
export const GlowOrbs = forwardRef<HTMLDivElement, GlowOrbsProps>(function GlowOrbs(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-slot="glow-orbs"
      className={cn("pointer-events-none absolute inset-0", className)}
      {...props}
    >
      <span className="bg-primary/20 absolute -start-20 -top-20 size-64 rounded-full blur-3xl" />
      <span className="absolute -end-20 -bottom-20 size-64 rounded-full bg-cyan-500/20 blur-3xl" />
    </div>
  );
});

GlowOrbs.displayName = "GlowOrbs";
