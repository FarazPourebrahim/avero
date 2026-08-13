import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn.js";

/** The dashboard's tile grids: two columns on a phone, three on a tablet, then the full row. */
export const quickActionsVariants = cva("grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3", {
  variants: {
    columns: {
      4: "lg:grid-cols-4",
      5: "lg:grid-cols-5",
      6: "lg:grid-cols-6",
    },
  },
  defaultVariants: { columns: 6 },
});

/** Props specific to `QuickActions`. It also accepts every native `<div>` attribute. */
export type QuickActionsOwnProps = {
  /** The tiles, typically `ActionTile`s. */
  children: ReactNode;
  /** Tiles per row at the widest breakpoint. @defaultValue 6 */
  columns?: VariantProps<typeof quickActionsVariants>["columns"];
  /** Accessible name for the group, e.g. "دسترسی سریع". */
  label?: string;
};

export type QuickActionsProps = Omit<HTMLAttributes<HTMLDivElement>, keyof QuickActionsOwnProps> &
  QuickActionsOwnProps;

/**
 * Dashboard shortcut grid: the row of six gradient `ActionTile`s under the stat
 * cards, folding to three columns on a tablet and two on a phone.
 *
 * Passing `label` makes the grid a named group, so screen reader users hear what the buttons
 * belong to.
 */
export const QuickActions = forwardRef<HTMLDivElement, QuickActionsProps>(function QuickActions(
  { children, columns, label, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="quick-actions"
      role={label ? "group" : undefined}
      aria-label={label}
      className={cn(quickActionsVariants({ columns }), className)}
      {...props}
    >
      {children}
    </div>
  );
});

QuickActions.displayName = "QuickActions";
