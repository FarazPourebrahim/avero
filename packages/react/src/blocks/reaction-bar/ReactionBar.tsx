"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import { BookmarkIcon, EyeIcon, HeartIcon, UserIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";

/** Shared shape of every pill in the bar. */
const PILL = "flex items-center gap-2 rounded-xl px-4 py-2 text-xs [&>svg]:size-4";

/** Props specific to `ReactionBar`. It also accepts every native `<div>` attribute. */
export type ReactionBarOwnProps = {
  /** Like count. The reference prints it unlocalised, so it is passed through as given. */
  likes?: number;
  /** Whether the viewer has liked. @defaultValue false */
  liked?: boolean;
  /** Called when the like control is activated. */
  onLike?: () => void;
  /** Accessible name of the like control. @defaultValue the `like` dictionary string */
  likeLabel?: string;
  /** View count, also passed through as given. Omit to hide the counter. */
  views?: number;
  /** Capacity note, e.g. "حداکثر ۱۵ رزومه". Omit to hide the blue pill. */
  capacity?: ReactNode;
  /** Whether the viewer has saved. Omit to hide the save control. */
  saved?: boolean;
  /** Called when the save control is activated. */
  onSave?: () => void;
  /** Visible text and accessible name of the save control. @defaultValue the `save` dictionary string */
  saveLabel?: string;
  /** Extra controls at the end of the row. */
  children?: ReactNode;
};

export type ReactionBarProps = Omit<HTMLAttributes<HTMLDivElement>, keyof ReactionBarOwnProps> &
  ReactionBarOwnProps;

/**
 * Project action row (B-19, R-07): like, views, remaining capacity and save, above a divider.
 *
 * Both toggles carry `aria-pressed`, so assistive technology announces whether the viewer has
 * already liked or saved — the reference sets it too, and this keeps it in step with `liked` and
 * `saved` rather than leaving it hard-coded to "false".
 */
export const ReactionBar = forwardRef<HTMLDivElement, ReactionBarProps>(function ReactionBar(
  {
    likes,
    liked = false,
    onLike,
    likeLabel,
    views,
    capacity,
    saved,
    onSave,
    saveLabel,
    children,
    className,
    ...props
  },
  ref,
) {
  const { dictionary } = useAvero();

  return (
    <div
      ref={ref}
      data-slot="reaction-bar"
      className={cn("flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4", className)}
      {...props}
    >
      {likes === undefined ? null : (
        <button
          type="button"
          data-slot="reaction-bar-like"
          aria-pressed={liked}
          aria-label={likeLabel ?? dictionary.like}
          onClick={onLike}
          className={cn(
            PILL,
            "cursor-pointer font-medium transition",
            liked
              ? "bg-red-50 text-red-500"
              : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500",
          )}
        >
          <HeartIcon />
          {likes}
        </button>
      )}

      {views === undefined ? null : (
        <span
          data-slot="reaction-bar-views"
          aria-label={dictionary.views}
          className={cn(PILL, "bg-gray-100 text-gray-500")}
        >
          <EyeIcon />
          {views}
        </span>
      )}

      {capacity ? (
        <span data-slot="reaction-bar-capacity" className={cn(PILL, "bg-blue-50 text-blue-600")}>
          <UserIcon />
          {capacity}
        </span>
      ) : null}

      {saved === undefined ? null : (
        <button
          type="button"
          data-slot="reaction-bar-save"
          aria-pressed={saved}
          onClick={onSave}
          className={cn(
            PILL,
            "cursor-pointer font-medium transition disabled:opacity-60",
            saved
              ? "bg-amber-50 text-amber-600"
              : "bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-600",
          )}
        >
          <BookmarkIcon />
          {saveLabel ?? dictionary.save}
        </button>
      )}

      {children}
    </div>
  );
});

ReactionBar.displayName = "ReactionBar";
