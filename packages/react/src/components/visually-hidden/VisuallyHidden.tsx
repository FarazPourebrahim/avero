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

/** Props specific to `LiveRegion`. It also accepts every native `<div>` attribute. */
export type LiveRegionOwnProps = {
  /** `polite` waits for the user to be idle; `assertive` interrupts. @defaultValue "polite" */
  politeness?: "polite" | "assertive";
};

export type LiveRegionProps = Omit<HTMLAttributes<HTMLDivElement>, keyof LiveRegionOwnProps> &
  LiveRegionOwnProps;

/**
 * An invisible announcer for status updates such as "link copied" or "liked". Change its text to
 * announce a message.
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
