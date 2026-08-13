import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn.js";
import { IconTile, type IconTileOwnProps } from "../icon-tile/IconTile.js";

/** Props specific to `FeatureCard`. It also accepts every native `<div>` attribute. */
export type FeatureCardOwnProps = {
  title: ReactNode;
  description: ReactNode;
  /** Icon shown in a padded, tinted tile. */
  icon?: ReactNode;
  /** Icon tile color. @defaultValue "blue" */
  tone?: IconTileOwnProps["tone"];
  /** Heading level of the title. @defaultValue "h4" */
  titleAs?: "h2" | "h3" | "h4";
};

export type FeatureCardProps = Omit<HTMLAttributes<HTMLDivElement>, keyof FeatureCardOwnProps> &
  FeatureCardOwnProps;

/**
 * Feature card, e.g. for a "why choose us" grid: icon tile, title and description; the
 * border tints with the primary color on hover.
 */
export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(function FeatureCard(
  { title, description, icon, tone = "blue", titleAs: Title = "h4", className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="feature-card"
      className={cn(
        "shadow-card-faint hover:border-primary/30 flex flex-col items-start gap-y-3.5 rounded-2xl border border-slate-100 bg-white p-6 transition-all duration-300 hover:shadow-md",
        className,
      )}
      {...props}
    >
      {icon ? (
        <IconTile tone={tone} size="padded" className="[&>svg]:size-6">
          {icon}
        </IconTile>
      ) : null}
      <Title className="text-base font-bold text-slate-800">{title}</Title>
      <p className="text-start text-xs leading-6 text-gray-500 md:text-sm">{description}</p>
    </div>
  );
});

FeatureCard.displayName = "FeatureCard";
