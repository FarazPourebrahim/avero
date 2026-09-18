import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";

/** Skeleton styles: a sweeping shimmer, or a quieter pulse for dense lists. */
export const skeletonVariants = cva("block", {
  variants: {
    animation: {
      shimmer: "skeleton-shimmer",
      pulse: "animate-pulse bg-slate-100",
      none: "bg-slate-100",
    },
    shape: {
      line: "h-4 rounded",
      title: "h-6 rounded-md",
      block: "rounded-2xl",
      circle: "rounded-full",
    },
  },
  defaultVariants: { animation: "shimmer", shape: "line" },
});

type SkeletonVariantProps = VariantProps<typeof skeletonVariants>;

/** Props specific to `Skeleton`. It also accepts every native `<div>` attribute. */
export type SkeletonOwnProps = {
  /** `shimmer` sweeps, `pulse` fades, `none` is static. @defaultValue "shimmer" */
  animation?: SkeletonVariantProps["animation"];
  /** Silhouette being stood in for. @defaultValue "line" */
  shape?: SkeletonVariantProps["shape"];
};

export type SkeletonProps = Omit<HTMLAttributes<HTMLDivElement>, keyof SkeletonOwnProps> &
  SkeletonOwnProps;

/**
 * A placeholder for content that has not arrived. Skeletons are hidden from assistive technology:
 * a screen reader should hear the loading state once, from the region that owns it, not once per
 * placeholder bar. Give that region `aria-busy` and an accessible name instead.
 *
 * Under `prefers-reduced-motion` the animations are disabled by the token layer, leaving the shape.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { animation, shape, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(skeletonVariants({ animation, shape }), className)}
      {...props}
    />
  );
});

Skeleton.displayName = "Skeleton";

/** Props specific to `SkeletonText`. It also accepts every native `<div>` attribute. */
export type SkeletonTextOwnProps = {
  /** Number of lines. @defaultValue 3 */
  lines?: number;
  /** Animation passed to each line. @defaultValue "shimmer" */
  animation?: SkeletonOwnProps["animation"];
};

export type SkeletonTextProps = Omit<HTMLAttributes<HTMLDivElement>, keyof SkeletonTextOwnProps> &
  SkeletonTextOwnProps;

/** A paragraph of skeleton lines, the last one short so it reads as the end of a paragraph. */
export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(function SkeletonText(
  { lines = 3, animation, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="skeleton-text"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {Array.from({ length: Math.max(1, lines) }, (_, index) => (
        <Skeleton
          key={index}
          animation={animation}
          className={index === lines - 1 && lines > 1 ? "w-3/5" : "w-full"}
        />
      ))}
    </div>
  );
});

SkeletonText.displayName = "SkeletonText";

/** Props specific to `SkeletonCard`. It also accepts every native `<div>` attribute. */
export type SkeletonCardOwnProps = {
  /** Shows a cover block above the text. @defaultValue true */
  media?: boolean;
  /** Shows an avatar and a name line under the text. @defaultValue false */
  footer?: boolean;
  /** Animation passed to every part. @defaultValue "shimmer" */
  animation?: SkeletonOwnProps["animation"];
};

export type SkeletonCardProps = Omit<HTMLAttributes<HTMLDivElement>, keyof SkeletonCardOwnProps> &
  SkeletonCardOwnProps;

/** The loading placeholder for a listing or showcase card: cover, title, two lines, optional byline. */
export const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(function SkeletonCard(
  { media = true, footer = false, animation, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="skeleton-card"
      className={cn("bg-surface flex flex-col gap-4 rounded-3xl p-4 sm:p-6", className)}
      {...props}
    >
      {media ? <Skeleton animation={animation} shape="block" className="h-40 w-full" /> : null}
      <Skeleton animation={animation} shape="title" className="w-2/3" />
      <SkeletonText animation={animation} lines={2} />
      {footer ? (
        <div className="flex items-center gap-3">
          <Skeleton animation={animation} shape="circle" className="size-10" />
          <Skeleton animation={animation} className="w-24" />
        </div>
      ) : null}
    </div>
  );
});

SkeletonCard.displayName = "SkeletonCard";
