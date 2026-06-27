import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";

export type VisuallyHiddenProps = HTMLAttributes<HTMLSpanElement>;

/** Content that is read by assistive technology but not shown on screen (P-14). */
export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  function VisuallyHidden({ className, ...props }, ref) {
    return (
      <span ref={ref} data-slot="visually-hidden" className={cn("sr-only", className)} {...props} />
    );
  },
);

VisuallyHidden.displayName = "VisuallyHidden";

export type LiveRegionProps = HTMLAttributes<HTMLDivElement> & {
  /** `polite` waits for the user to be idle; `assertive` interrupts. Defaults to `polite`. */
  politeness?: "polite" | "assertive";
};

/**
 * An invisible announcer for status updates such as "link copied" or "liked"
 * (the reference's `#blog-action-live`, R-01). Change its text to announce a message.
 */
export const LiveRegion = forwardRef<HTMLDivElement, LiveRegionProps>(function LiveRegion(
  { politeness = "polite", className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role={politeness === "assertive" ? "alert" : "status"}
      aria-live={politeness}
      aria-atomic="true"
      data-slot="live-region"
      className={cn("sr-only", className)}
      {...props}
    />
  );
});

LiveRegion.displayName = "LiveRegion";
