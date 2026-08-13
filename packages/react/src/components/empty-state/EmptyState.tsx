import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn.js";

/**
 * Empty state (O-08) in four shapes:
 * `text` — a bare centred line, e.g. under an empty comment list;
 * `slate` — the same, in a slate palette;
 * `icon` — a faded icon above the message, e.g. for a "coming soon" chart;
 * `circle` — the icon inside a gray disc, where a panel has no data yet.
 */
export const emptyStateVariants = cva("flex flex-col items-center justify-center text-center", {
  variants: {
    variant: {
      text: "py-8 text-sm text-gray-400",
      slate: "py-10 text-xs text-slate-400",
      icon: "py-6 text-gray-300 sm:py-8",
      circle: "py-12 text-gray-400",
    },
  },
  defaultVariants: { variant: "text" },
});

/** Props specific to `EmptyState`. It also accepts every native `<div>` attribute. */
export type EmptyStateOwnProps = {
  /** Visual shape. @defaultValue "text" */
  variant?: VariantProps<typeof emptyStateVariants>["variant"];
  /** Icon for the `icon` and `circle` variants. Ignored by the text-only variants. */
  icon?: ReactNode;
  /** The message. Say what is missing, not just "no data". */
  children: ReactNode;
  /** Optional next action, e.g. a button that starts the thing that is missing. */
  action?: ReactNode;
};

export type EmptyStateProps = Omit<HTMLAttributes<HTMLDivElement>, keyof EmptyStateOwnProps> &
  EmptyStateOwnProps;

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { variant = "text", icon, action, className, children, ...props },
  ref,
) {
  const showsIcon = variant === "icon" || variant === "circle";

  return (
    <div
      ref={ref}
      data-slot="empty-state"
      className={cn(emptyStateVariants({ variant }), className)}
      {...props}
    >
      {showsIcon && icon ? (
        variant === "circle" ? (
          <div
            data-slot="empty-state-icon"
            className="mb-3 flex size-12 items-center justify-center rounded-full bg-gray-100 [&>svg]:size-6 [&>svg]:opacity-50"
          >
            {icon}
          </div>
        ) : (
          <div data-slot="empty-state-icon" className="mb-2 opacity-30">
            {icon}
          </div>
        )
      ) : null}
      <p className={cn(showsIcon && "text-xs")}>{children}</p>
      {action ? (
        <div data-slot="empty-state-action" className="mt-4">
          {action}
        </div>
      ) : null}
    </div>
  );
});

EmptyState.displayName = "EmptyState";
