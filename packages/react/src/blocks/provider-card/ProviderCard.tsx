"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Avatar } from "../../components/avatar/index.js";
import { Button } from "../../components/button/index.js";
import { Card } from "../../components/card/index.js";
import { MiniStat } from "../../components/stat/index.js";
import { Eyebrow } from "../../components/typography/index.js";
import { UserCheckIcon } from "../../icons/internalIcons.js";
import { useAvero } from "../../i18n/AveroProvider.js";
import { cn } from "../../utils/cn.js";

/** One mini statistic in the provider card's grid. */
export type ProviderCardStat = {
  /** Caption above the figure, e.g. "تعداد دوره‌ها". */
  label: ReactNode;
  /** The figure itself. Pass a `Rating` for a starred score. */
  value: ReactNode;
};

/** Props specific to `ProviderCard`. It also accepts every native `<div>` attribute. */
export type ProviderCardOwnProps = {
  /** Provider's name: the card's heading, and the avatar's alternative text. */
  name: string;
  /** Avatar image. Without one the avatar falls back to the name's initials. */
  image?: string;
  /** Small uppercase label above the name. @defaultValue the `serviceProvider` dictionary string */
  eyebrow?: ReactNode;
  /** Line under the name, e.g. what the provider teaches or offers. */
  headline?: ReactNode;
  /** Mini statistics, laid out in a two-column grid. */
  stats?: readonly ProviderCardStat[];
  /** Where the profile link goes. Without it the link is not rendered. */
  profileHref?: string;
  /** Profile link text. @defaultValue the `viewProfile` dictionary string */
  profileLabel?: ReactNode;
};

export type ProviderCardProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof ProviderCardOwnProps | "children"
> &
  ProviderCardOwnProps;

/**
 * Provider card for a detail page's sidebar: an identity row of avatar, eyebrow, name and
 * headline, a grid of mini statistics, and an outlined link to the full profile.
 *
 * For a starred score, pass `<Rating value={4.5} size="sm" />` as a stat's `value`.
 */
export const ProviderCard = forwardRef<HTMLDivElement, ProviderCardProps>(function ProviderCard(
  { name, image, eyebrow, headline, stats, profileHref, profileLabel, className, ...props },
  ref,
) {
  const { dictionary } = useAvero();

  return (
    <Card
      ref={ref}
      variant="surface"
      elevation="xs"
      padding="none"
      className={cn("space-y-6 p-6", className)}
      data-slot="provider-card"
      {...props}
    >
      <div className="flex items-center gap-4">
        <Avatar src={image} name={name} size="lg" border="accent" />
        <div>
          <Eyebrow>{eyebrow ?? dictionary.serviceProvider}</Eyebrow>
          <h4 data-slot="provider-card-name" className="text-base font-black text-slate-900">
            {name}
          </h4>
          {headline ? <p className="text-xs font-medium text-slate-500">{headline}</p> : null}
        </div>
      </div>

      {stats && stats.length > 0 ? (
        <div data-slot="provider-card-stats" className="grid grid-cols-2 gap-3 pt-2">
          {stats.map((stat, index) => (
            <MiniStat key={index} label={stat.label} value={stat.value} />
          ))}
        </div>
      ) : null}

      {profileHref ? (
        <Button asChild variant="outline" size="sm" radius="2xl" block className="gap-2 py-3">
          <a href={profileHref}>
            <UserCheckIcon className="size-4" />
            {profileLabel ?? dictionary.viewProfile}
          </a>
        </Button>
      ) : null}
    </Card>
  );
});

ProviderCard.displayName = "ProviderCard";
