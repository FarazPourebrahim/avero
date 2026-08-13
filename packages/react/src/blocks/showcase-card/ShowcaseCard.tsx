"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Button } from "../../components/button/index.js";
import { Chip } from "../../components/chip/index.js";
import { IconButton } from "../../components/icon-button/index.js";
import { Image } from "../../components/image/index.js";
import { useAvero } from "../../i18n/AveroProvider.js";
import { HeartIcon, Share2Icon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `ShowcaseCard`. It also accepts every native `<div>` attribute. */
export type ShowcaseCardOwnProps = {
  /** Item title. */
  title: string;
  /** Where the title links to. Without it the title is plain text. */
  href?: string;
  /** Cover image. */
  image?: string;
  /** Short description under the title, clamped to two lines. */
  description?: string;
  /** Technology tags, rendered as `mini` chips. */
  tags?: readonly string[];
  /** Overlay pill shown on hover. @defaultValue the `viewDetails` dictionary string */
  overlayLabel?: ReactNode;
  /** Like count. Omit to hide the like control. */
  likes?: number;
  /** Marks the like control as pressed. @defaultValue false */
  liked?: boolean;
  /** Called when the like control is activated. */
  onLike?: () => void;
  /** Called when the share control is activated. Omit to hide it. */
  onShare?: () => void;
  /** Report control, supplied by `ReportAction`. */
  report?: ReactNode;
};

export type ShowcaseCardProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof ShowcaseCardOwnProps | "children"
> &
  ShowcaseCardOwnProps;

/**
 * Showcase card, e.g. for projects in a gallery: a white card whose cover zooms on hover behind a
 * dark gradient and a "view details" pill, over a title, description, technology tags and an
 * action row.
 *
 * Nesting controls inside a link is invalid, so the title carries the link and the like, share and
 * report buttons stay its siblings.
 */
export const ShowcaseCard = forwardRef<HTMLDivElement, ShowcaseCardProps>(function ShowcaseCard(
  {
    title,
    href,
    image,
    description,
    tags,
    overlayLabel,
    likes,
    liked = false,
    onLike,
    onShare,
    report,
    className,
    ...props
  },
  ref,
) {
  const { dictionary } = useAvero();

  return (
    <div
      ref={ref}
      data-slot="showcase-card"
      className={cn(
        "group flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl",
        className,
      )}
      {...props}
    >
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <Image src={image} alt="" zoom="group" className="h-full w-full" />
        <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="rounded-xl bg-blue-600/90 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-xs">
            {overlayLabel ?? dictionary.viewDetails}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between space-y-3 p-5">
        <div>
          <h4
            data-slot="showcase-card-title"
            className="line-clamp-1 text-base font-bold text-gray-900 transition-colors group-hover:text-blue-600"
          >
            {href ? <a href={href}>{title}</a> : title}
          </h4>
          {description ? (
            <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-gray-500">{description}</p>
          ) : null}
        </div>

        {tags && tags.length > 0 ? (
          <div data-slot="showcase-card-tags" className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Chip key={tag} variant="mini">
                {tag}
              </Chip>
            ))}
          </div>
        ) : null}

        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2">
            {likes === undefined ? null : (
              <Button
                variant="soft"
                tone="slate"
                size="xs"
                aria-pressed={liked}
                aria-label={dictionary.like}
                onClick={onLike}
                className="py-1.5"
              >
                <HeartIcon className="size-4" />
                <span>{likes}</span>
              </Button>
            )}
            {onShare ? (
              <IconButton variant="soft" tone="slate" label={dictionary.share} onClick={onShare}>
                <Share2Icon className="size-4" />
              </IconButton>
            ) : null}
          </div>
          {report}
        </div>
      </div>
    </div>
  );
});

ShowcaseCard.displayName = "ShowcaseCard";
