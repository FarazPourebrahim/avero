import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { SectionHeader } from "../../components/section-header/index.js";
import { cn } from "../../utils/cn.js";

/** Column counts for card grids, each starting at one column on a phone. */
export const featureGridVariants = cva("grid grid-cols-1 gap-5", {
  variants: {
    columns: {
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-2 lg:grid-cols-3",
      4: "sm:grid-cols-2 lg:grid-cols-4",
    },
  },
  defaultVariants: { columns: 4 },
});

/** Props specific to `FeatureGrid`. It also accepts every native `<section>` attribute. */
export type FeatureGridOwnProps = {
  /** Section title above the grid. Without it the grid stands alone. */
  title?: ReactNode;
  /** Icon before the title. */
  icon?: ReactNode;
  /** The cards to lay out, typically `FeatureCard`s. */
  children: ReactNode;
  /** Columns at the widest breakpoint. @defaultValue 4 */
  columns?: VariantProps<typeof featureGridVariants>["columns"];
  /** Heading level of the title. @defaultValue "h3" */
  titleAs?: "h2" | "h3" | "h4";
};

export type FeatureGridProps = Omit<HTMLAttributes<HTMLElement>, keyof FeatureGridOwnProps> &
  FeatureGridOwnProps;

/**
 * Feature grid, e.g. a "why us" section: an icon title above a row of four feature
 * cards that folds to two columns on a tablet and one on a phone.
 */
export const FeatureGrid = forwardRef<HTMLElement, FeatureGridProps>(function FeatureGrid(
  { title, icon, children, columns, titleAs = "h3", className, ...props },
  ref,
) {
  return (
    <section
      ref={ref}
      data-slot="feature-grid"
      className={cn("flex flex-col gap-y-6", className)}
      {...props}
    >
      {title ? <SectionHeader variant="icon" as={titleAs} title={title} icon={icon} /> : null}
      <div data-slot="feature-grid-items" className={featureGridVariants({ columns })}>
        {children}
      </div>
    </section>
  );
});

FeatureGrid.displayName = "FeatureGrid";
