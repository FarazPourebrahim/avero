import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";

/**
 * Page width container. Site pages centre their content in a `max-w-7xl` column
 * with the same responsive gutters; the dashboard uses slightly tighter gutters on phones.
 */
export const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      /** The site's standard column (1280px). */
      default: "max-w-7xl",
      /** Narrow reading column, e.g. a standalone article. */
      prose: "max-w-3xl",
      /** No cap; the gutters still apply. */
      full: "max-w-none",
    },
    gutter: {
      /** Site pages: 16 → 24 → 32px. */
      default: "px-4 sm:px-6 lg:px-8",
      /** Dashboard: 12 → 24 → 32px. */
      tight: "px-3 sm:px-6 lg:px-8",
      /** No horizontal padding. */
      none: "",
    },
  },
  defaultVariants: { size: "default", gutter: "default" },
});

/** Props specific to `Container`. It also accepts every native `<div>` attribute. */
export type ContainerOwnProps = {
  /** Maximum width. @defaultValue "default" */
  size?: VariantProps<typeof containerVariants>["size"];
  /** Horizontal gutters. @defaultValue "default" */
  gutter?: VariantProps<typeof containerVariants>["gutter"];
  /** Renders a different element, e.g. `main` or `section`. @defaultValue "div" */
  as?: "div" | "main" | "section" | "header" | "footer" | "article" | "nav";
};

export type ContainerProps = Omit<HTMLAttributes<HTMLDivElement>, keyof ContainerOwnProps> &
  ContainerOwnProps;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { size, gutter, as: Component = "div", className, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      data-slot="container"
      className={cn(containerVariants({ size, gutter }), className)}
      {...props}
    />
  );
});

Container.displayName = "Container";
