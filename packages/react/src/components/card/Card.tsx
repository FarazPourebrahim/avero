import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";

/**
 * Card surfaces extracted from the reference (D-01):
 * - surface: white `rounded-3xl` content cards with a slate-100 border (R-03, R-04, R-05)
 * - flat: white `rounded-2xl` dashboard and project cards with a gray-100 border (R-02, R-07)
 * - glass: translucent listing cards that turn white on hover (R-06, R-07)
 * - muted: slate-50 tiles such as stat tiles and mini stats (R-04, R-05)
 */
export const cardVariants = cva("", {
  variants: {
    variant: {
      surface: "rounded-3xl border border-slate-100 bg-white",
      flat: "rounded-2xl border border-gray-100 bg-white",
      glass:
        "bg-surface-glass rounded-2xl border border-white transition-all duration-300 hover:bg-white",
      muted: "rounded-2xl border border-slate-100 bg-slate-50/80",
    },
    elevation: {
      none: "",
      xs: "shadow-xs",
      sm: "shadow-sm",
      soft: "shadow-card-soft",
      ambient: "shadow-card-ambient",
      faint: "shadow-card-faint",
      brand: "shadow-brand-soft",
    },
    padding: {
      none: "",
      sm: "p-3.5 sm:p-5",
      md: "p-4 sm:p-6",
      lg: "p-6 md:p-8",
      xl: "p-6 sm:p-10",
    },
    interactive: {
      true: "transition-shadow duration-200 hover:shadow-md",
      false: "",
    },
  },
  defaultVariants: {
    variant: "surface",
    elevation: "none",
    padding: "lg",
    interactive: false,
  },
});

type CardVariantProps = VariantProps<typeof cardVariants>;

/** Props specific to `Card`. It also accepts every native `<div>` attribute. */
export type CardOwnProps = {
  /** Surface style. @defaultValue "surface" */
  variant?: CardVariantProps["variant"];
  /** Shadow, from the reference's hairline `xs` to its soft ambient card shadows. @defaultValue "none" */
  elevation?: CardVariantProps["elevation"];
  /** Inner padding, responsive as in the reference. @defaultValue "lg" */
  padding?: CardVariantProps["padding"];
  /** Adds a hover shadow for clickable cards. @defaultValue false */
  interactive?: CardVariantProps["interactive"];
  /** Renders the child element (e.g. `<article>` or a link) with card styles. @defaultValue false */
  asChild?: boolean;
};

export type CardProps = Omit<HTMLAttributes<HTMLDivElement>, keyof CardOwnProps> & CardOwnProps;

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { asChild = false, className, variant, elevation, padding, interactive, ...props },
  ref,
) {
  const Component = asChild ? Slot.Root : "div";
  return (
    <Component
      ref={ref}
      data-slot="card"
      className={cn(cardVariants({ variant, elevation, padding, interactive }), className)}
      {...props}
    />
  );
});

Card.displayName = "Card";

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

/** A header row: title at the start, optional actions or meta at the end. */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn("flex items-center justify-between gap-2", className)}
      {...props}
    />
  );
});

CardHeader.displayName = "CardHeader";

export const cardTitleVariants = cva("flex items-center gap-2 [&>svg]:shrink-0", {
  variants: {
    size: {
      /** Dashboard panel titles (R-02). */
      sm: "text-xs font-bold text-gray-800 sm:text-sm [&>svg]:text-indigo-600",
      /** Profile section titles (R-04). */
      md: "text-lg font-bold text-slate-900 [&>svg]:size-5",
      /** Service page section titles (R-05). */
      lg: "text-xl font-black text-slate-900 [&>svg]:size-5 [&>svg]:text-indigo-600",
    },
  },
  defaultVariants: { size: "md" },
});

/** Props specific to `CardTitle`. It also accepts every native heading attribute. */
export type CardTitleOwnProps = {
  /** Title scale. @defaultValue "md" */
  size?: VariantProps<typeof cardTitleVariants>["size"];
  /** Heading element. @defaultValue "h3" */
  as?: "h2" | "h3" | "h4";
};

export type CardTitleProps = Omit<HTMLAttributes<HTMLHeadingElement>, keyof CardTitleOwnProps> &
  CardTitleOwnProps;

/** A card heading; put an icon before the text to get the reference's icon + title pattern. */
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(
  { as: Component = "h3", size, className, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      data-slot="card-title"
      className={cn(cardTitleVariants({ size }), className)}
      {...props}
    />
  );
});

CardTitle.displayName = "CardTitle";

export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

/** A footer row separated by a top border, like the reference's card action rows. */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3",
        className,
      )}
      {...props}
    />
  );
});

CardFooter.displayName = "CardFooter";
