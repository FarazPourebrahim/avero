"use client";

import { forwardRef, useId, type HTMLAttributes, type ReactNode } from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `FilterPanel`. It also accepts every native `<section>` attribute. */
export type FilterPanelOwnProps = {
  /** Panel title. @defaultValue the `filters` dictionary string */
  title?: ReactNode;
  /** The filter controls, stacked in the reference's 12px rhythm. */
  children: ReactNode;
};

export type FilterPanelProps = Omit<HTMLAttributes<HTMLElement>, keyof FilterPanelOwnProps> &
  FilterPanelOwnProps;

/**
 * Filter panel in the listing sidebar (B-11, R-06): a titled card holding a stack of controls —
 * in the reference a search `Input`, a category `Select` and a sort `NativeSelect`.
 *
 * The controls are children rather than props: which filters a listing needs is the application's
 * decision, and each control already carries the reference's styling.
 *
 * The reference's `<section>` has a heading but no accessible name, so it is not announced as a
 * region; the heading is linked here with `aria-labelledby` (deviation V-04), which changes
 * nothing visually.
 */
export const FilterPanel = forwardRef<HTMLElement, FilterPanelProps>(function FilterPanel(
  { title, children, className, ...props },
  ref,
) {
  const { dictionary } = useAvero();
  const headingId = useId();

  return (
    <section
      ref={ref}
      data-slot="filter-panel"
      aria-labelledby={headingId}
      className={cn(
        "border-border-subtle flex w-full flex-col gap-y-6 rounded-xl border p-5",
        className,
      )}
      {...props}
    >
      <h2 id={headingId} className="text-md font-semibold">
        {title ?? dictionary.filters}
      </h2>
      <div data-slot="filter-panel-controls" className="flex flex-col gap-3">
        {children}
      </div>
    </section>
  );
});

FilterPanel.displayName = "FilterPanel";
