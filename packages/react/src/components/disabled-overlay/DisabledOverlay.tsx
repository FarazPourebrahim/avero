import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn.js";

/** Props specific to `DisabledOverlay`. It also accepts every native `<div>` attribute. */
export type DisabledOverlayOwnProps = {
  /** Why the card is unavailable, e.g. "ظرفیت تکمیل شد". */
  children: ReactNode;
  /** Pill colour. @defaultValue "danger" */
  tone?: "danger" | "neutral";
  /** Matches the container's radius. @defaultValue "xl" */
  radius?: "xl" | "2xl" | "3xl";
};

export type DisabledOverlayProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof DisabledOverlayOwnProps
> &
  DisabledOverlayOwnProps;

const RADIUS = { xl: "rounded-xl", "2xl": "rounded-2xl", "3xl": "rounded-3xl" } as const;

/**
 * Covers a card that can no longer be acted on (O-10): a faint blur with a reason pill.
 * Put it inside a `relative` container, and give that container `pointer-events-none` plus
 * `aria-disabled` so the card is inert for pointer and keyboard alike.
 */
export const DisabledOverlay = forwardRef<HTMLDivElement, DisabledOverlayProps>(
  function DisabledOverlay({ tone = "danger", radius = "xl", className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="disabled-overlay"
        className={cn(
          "absolute inset-0 z-(--z-raised) flex items-center justify-center backdrop-blur-[1px]",
          RADIUS[radius],
          className,
        )}
        {...props}
      >
        <span
          data-slot="disabled-overlay-reason"
          className={cn(
            "rounded-xl px-5 py-2 text-sm text-white",
            tone === "danger" ? "bg-red-500" : "bg-slate-600",
          )}
        >
          {children}
        </span>
      </div>
    );
  },
);

DisabledOverlay.displayName = "DisabledOverlay";
