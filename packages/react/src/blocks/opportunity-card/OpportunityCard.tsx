"use client";

import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { CapacityMeter } from "../../components/capacity-meter/index.js";
import { Chip } from "../../components/chip/index.js";
import { DisabledOverlay } from "../../components/disabled-overlay/index.js";
import { useAvero } from "../../i18n/AveroProvider.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `OpportunityCard`. It also accepts every native `<a>` attribute. */
export type OpportunityCardOwnProps = {
  /** Item title, e.g. a workshop or an event. */
  title: string;
  /** Where the card links to. */
  href: string;
  /** Date shown opposite the title, e.g. "15 مهر". */
  date?: ReactNode;
  /** Tags, e.g. `["آنلاین"]`. */
  tags?: readonly string[];
  /** Short description, clamped to two lines. */
  description?: string;
  /** Capacity label, e.g. "ظرفیت ثبت‌نام". Omit to hide the meter. */
  capacityLabel?: ReactNode;
  /** Places taken. */
  value?: number;
  /** Total places. */
  max?: number;
  /** Capacity pill, e.g. "9 جای خالی". Turns red once the meter is full. */
  status?: ReactNode;
  /** Caption under the meter's start, e.g. "3 نفر ثبت‌نام کرده‌اند". */
  startCaption?: ReactNode;
  /** Caption under the meter's end, e.g. "حداکثر 12 نفر". */
  endCaption?: ReactNode;
  /** Footer call to action. @defaultValue the `view` dictionary string */
  actionLabel?: ReactNode;
  /** Marks the item as full: the card dims, blurs and stops responding. @defaultValue false */
  full?: boolean;
  /** Reason shown on the overlay. @defaultValue the `capacityFull` dictionary string */
  fullLabel?: ReactNode;
};

export type OpportunityCardProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof OpportunityCardOwnProps | "children"
> &
  OpportunityCardOwnProps;

/**
 * Opportunity card, e.g. for a workshop with limited places: title and date, tags, a clamped
 * description and a capacity meter, inside one link.
 *
 * Once capacity is full the card blurs and dims, stops responding to the pointer and is covered by
 * a `DisabledOverlay` with the reason.
 *
 * Carousel sizing (`w-[85%]`, `snap-center`, `flex-none`) belongs to the carousel, not the card, so
 * pass it through `className`.
 */
export const OpportunityCard = forwardRef<HTMLAnchorElement, OpportunityCardProps>(
  function OpportunityCard(
    {
      title,
      href,
      date,
      tags,
      description,
      capacityLabel,
      value = 0,
      max = 0,
      status,
      startCaption,
      endCaption,
      actionLabel,
      full = false,
      fullLabel,
      className,
      ...props
    },
    ref,
  ) {
    const { dictionary } = useAvero();

    return (
      <a
        ref={ref}
        href={href}
        data-slot="opportunity-card"
        data-full={full ? "true" : undefined}
        aria-disabled={full ? true : undefined}
        className={cn(
          "bg-surface-glass relative flex min-h-[260px] flex-col gap-5 rounded-xl border border-gray-200 p-5 no-underline transition hover:-translate-y-1 hover:shadow-lg",
          full && "pointer-events-none opacity-70 blur-[1px]",
          className,
        )}
        {...props}
      >
        {full ? (
          <DisabledOverlay radius="xl">{fullLabel ?? dictionary.capacityFull}</DisabledOverlay>
        ) : null}

        <div>
          <div className="flex justify-between gap-3">
            <h3
              data-slot="opportunity-card-title"
              className="text-primary line-clamp-2 text-base font-bold md:text-lg"
            >
              {title}
            </h3>
            {date ? <span className="text-xs whitespace-nowrap text-gray-400">{date}</span> : null}
          </div>
          {tags && tags.length > 0 ? (
            <div
              data-slot="opportunity-card-tags"
              className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500"
            >
              {tags.map((tag) => (
                <Chip key={tag} variant="category" className="text-gray-500">
                  {tag}
                </Chip>
              ))}
            </div>
          ) : null}
        </div>

        <p className="line-clamp-2 flex-1 text-sm leading-7 text-gray-500">{description}</p>

        {capacityLabel ? (
          <CapacityMeter
            variant="card"
            label={capacityLabel}
            value={value}
            max={max}
            status={status}
            startCaption={startCaption}
            endCaption={endCaption}
          />
        ) : null}

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex gap-2" />
          {full ? null : (
            <span className="text-xs text-gray-500">
              {actionLabel ?? dictionary.view} <span aria-hidden="true">→</span>
            </span>
          )}
        </div>
      </a>
    );
  },
);

OpportunityCard.displayName = "OpportunityCard";
