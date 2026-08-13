import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Chip } from "../../components/chip/index.js";
import { MatchScore } from "../../components/match-score/index.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `SuggestionItem`. It also accepts every native `<div>` attribute. */
export type SuggestionItemOwnProps = {
  /** Item title. */
  title: string;
  /** Where the title links to. Without it the title is plain text. */
  href?: string;
  /** One-line summary, truncated to the row's width. */
  description?: string;
  /** Tags, e.g. `["آنلاین"]`. */
  tags?: readonly string[];
  /** Match percentage, 0–100. Omit to hide the score. */
  match?: number;
  /** Caption under the percentage. @defaultValue the `matchLabel` dictionary string */
  matchLabel?: ReactNode;
};

export type SuggestionItemProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof SuggestionItemOwnProps | "children"
> &
  SuggestionItemOwnProps;

/**
 * Suggestion row, e.g. a recommended course on a dashboard: title, summary and tags on one side,
 * a match percentage on the other.
 *
 * The title carries the link when `href` is given, so the row is reachable by keyboard.
 */
export const SuggestionItem = forwardRef<HTMLDivElement, SuggestionItemProps>(
  function SuggestionItem(
    { title, href, description, tags, match, matchLabel, className, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        data-slot="suggestion-item"
        className={cn(
          "rounded-xl border border-gray-100 p-3 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50/30 sm:p-4",
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-2.5 sm:gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h4
                data-slot="suggestion-item-title"
                className="max-w-full truncate text-xs font-semibold text-gray-800 sm:text-sm"
              >
                {href ? <a href={href}>{title}</a> : title}
              </h4>
            </div>
            {description ? (
              <p className="text-2xs mb-2 truncate text-gray-500 sm:text-xs">{description}</p>
            ) : null}
            {tags && tags.length > 0 ? (
              <div
                data-slot="suggestion-item-tags"
                className="text-2xs flex flex-wrap items-center gap-2 text-gray-400 sm:gap-3 sm:text-xs"
              >
                {tags.map((tag) => (
                  <Chip key={tag} variant="category" size="sm" className="text-gray-400">
                    {tag}
                  </Chip>
                ))}
              </div>
            ) : null}
          </div>

          {match === undefined ? null : (
            <MatchScore value={match} label={matchLabel} className="shrink-0" />
          )}
        </div>
      </div>
    );
  },
);

SuggestionItem.displayName = "SuggestionItem";
