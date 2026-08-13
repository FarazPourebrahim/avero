import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Card } from "../../components/card/index.js";

/** Props specific to `AchievementsPanel`. It also accepts every native `<section>` attribute. */
export type AchievementsPanelOwnProps = {
  /** Panel title, e.g. "رتبه و دستاوردها". */
  title: ReactNode;
  /** Icon before the title. It keeps its own color, unlike a `CardTitle` icon. */
  icon?: ReactNode;
  /** The panel's contents: a `HighlightPanel` for the rank, then `InfoRow`s. */
  children: ReactNode;
  /** Heading level of the title. @defaultValue "h3" */
  titleAs?: "h2" | "h3" | "h4";
};

export type AchievementsPanelProps = Omit<
  HTMLAttributes<HTMLElement>,
  keyof AchievementsPanelOwnProps
> &
  AchievementsPanelOwnProps;

/**
 * Rank and achievements panel: a dashboard card with a titled header over a stack of
 * tinted rows.
 *
 * The title is a plain heading rather than `CardTitle`, so an icon such as a trophy keeps its own
 * color; `CardTitle` tints every icon indigo.
 */
export const AchievementsPanel = forwardRef<HTMLElement, AchievementsPanelProps>(
  function AchievementsPanel(
    { title, icon, children, titleAs: Title = "h3", className, ...props },
    ref,
  ) {
    return (
      <Card asChild variant="flat" padding="sm" className={className}>
        <section ref={ref} data-slot="achievements-panel" {...props}>
          <Title className="mb-3 flex items-center gap-2 text-xs font-bold text-gray-800 sm:mb-4 sm:text-sm">
            {icon}
            {title}
          </Title>
          <div data-slot="achievements-panel-items" className="space-y-2.5 sm:space-y-3">
            {children}
          </div>
        </section>
      </Card>
    );
  },
);

AchievementsPanel.displayName = "AchievementsPanel";
