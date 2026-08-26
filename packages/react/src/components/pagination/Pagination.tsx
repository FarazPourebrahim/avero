"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { useControllableState } from "../../hooks/useControllableState.js";
import { useAvero, useAveroFormatter } from "../../i18n/AveroProvider.js";
import { formatMessage } from "../../i18n/dictionaries.js";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";
import { IconButton } from "../icon-button/IconButton.js";

/** A page number, or a gap standing in for the pages hidden before or after the current ones. */
export type PaginationRangeItem = number | "ellipsis-start" | "ellipsis-end";

/**
 * The pages to show: always the first and last, the current page with `siblingCount` pages on
 * each side, and a gap where pages are skipped. The list keeps the same length while moving
 * through the middle, so the controls don't jump around.
 */
export function paginationRange(
  page: number,
  pageCount: number,
  siblingCount = 1,
): PaginationRangeItem[] {
  if (pageCount < 1) return [];
  const pages = (from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, index) => from + index);

  // First, last, current and two gaps.
  const slots = siblingCount * 2 + 5;
  if (pageCount <= slots) return pages(1, pageCount);

  const current = Math.min(Math.max(page, 1), pageCount);
  const start = Math.max(current - siblingCount, 1);
  const end = Math.min(current + siblingCount, pageCount);
  // A gap only hides two or more pages; a single hidden page is shown instead.
  const gapBefore = start > 3;
  const gapAfter = end < pageCount - 2;
  const edgeLength = slots - 2;

  if (!gapBefore) return [...pages(1, edgeLength), "ellipsis-end", pageCount];
  if (!gapAfter) {
    return [1, "ellipsis-start", ...pages(pageCount - edgeLength + 1, pageCount)];
  }
  return [1, "ellipsis-start", ...pages(start, end), "ellipsis-end", pageCount];
}

const pageItemClasses = cn(
  "flex h-9 min-w-9 items-center justify-center rounded-xl px-2 text-sm font-medium text-gray-600 transition",
  "hover:bg-gray-100 hover:text-gray-900",
  "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:outline-none",
  "aria-[current=page]:bg-primary aria-[current=page]:shadow-primary/20 aria-[current=page]:text-white aria-[current=page]:shadow-md",
);

/** Props specific to `Pagination`. It also accepts every native `<nav>` attribute. */
export type PaginationOwnProps = {
  /** Number of pages. Nothing is rendered below 1. */
  pageCount: number;
  /** The current page, 1-based (controlled). */
  page?: number;
  /** Initial page (uncontrolled). @defaultValue 1 */
  defaultPage?: number;
  /** Called with the page the user moves to. */
  onPageChange?: (page: number) => void;
  /** Renders pages as links to these URLs. Without it, pages are buttons. */
  getHref?: (page: number) => string;
  /** Pages shown on each side of the current one. @defaultValue 1 */
  siblingCount?: number;
};

export type PaginationProps = Omit<HTMLAttributes<HTMLElement>, keyof PaginationOwnProps> &
  PaginationOwnProps;

/**
 * Page navigation with previous and next controls. Pages are links when `getHref` is given, so
 * they work without JavaScript and can be opened in a new tab, and buttons otherwise.
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    pageCount,
    page,
    defaultPage = 1,
    onPageChange,
    getHref,
    siblingCount = 1,
    className,
    "aria-label": ariaLabel,
    ...props
  },
  ref,
) {
  const { dictionary } = useAvero();
  const format = useAveroFormatter();
  const [currentPage, setCurrentPage] = useControllableState({
    value: page,
    defaultValue: defaultPage,
    onChange: onPageChange,
  });

  if (pageCount < 1) return null;

  const current = Math.min(Math.max(currentPage, 1), pageCount);

  function goTo(target: number) {
    if (target !== current) setCurrentPage(target);
  }

  function pageControl(target: number, label: string, className: string, content: React.ReactNode) {
    const isCurrent = target === current;
    const shared = {
      "aria-label": label,
      "aria-current": isCurrent ? ("page" as const) : undefined,
      "data-slot": "pagination-page",
      className,
      onClick: () => goTo(target),
    };
    return getHref ? (
      <a href={getHref(target)} {...shared}>
        {content}
      </a>
    ) : (
      <button type="button" {...shared}>
        {content}
      </button>
    );
  }

  function stepControl(target: number, direction: "previous" | "next") {
    const label = direction === "previous" ? dictionary.previous : dictionary.next;
    // Previous points to the inline start: right in RTL, mirrored to the left in LTR.
    const Icon = direction === "previous" ? ChevronRightIcon : ChevronLeftIcon;
    const icon = <Icon className="size-4 ltr:-scale-x-100" />;
    const disabled = target < 1 || target > pageCount;
    const slot = `pagination-${direction}`;

    if (getHref && !disabled) {
      return (
        <IconButton asChild variant="outline" label={label} className="size-9">
          <a
            href={getHref(target)}
            rel={direction === "previous" ? "prev" : "next"}
            data-slot={slot}
            onClick={() => goTo(target)}
          >
            {icon}
          </a>
        </IconButton>
      );
    }
    return (
      <IconButton
        variant="outline"
        label={label}
        disabled={disabled}
        data-slot={slot}
        className="size-9"
        onClick={() => goTo(target)}
      >
        {icon}
      </IconButton>
    );
  }

  return (
    <nav
      ref={ref}
      aria-label={ariaLabel ?? dictionary.paginationLabel}
      data-slot="pagination"
      className={cn("flex", className)}
      {...props}
    >
      <ul className="flex flex-wrap items-center gap-1.5">
        <li>{stepControl(current - 1, "previous")}</li>
        {paginationRange(current, pageCount, siblingCount).map((item) =>
          typeof item === "number" ? (
            <li key={item}>
              {pageControl(
                item,
                formatMessage(dictionary.paginationPage, { page: format.number(item) }),
                pageItemClasses,
                format.number(item),
              )}
            </li>
          ) : (
            <li key={item} aria-hidden="true">
              <span
                data-slot="pagination-ellipsis"
                className="flex h-9 min-w-9 items-center justify-center text-sm text-gray-400"
              >
                …
              </span>
            </li>
          ),
        )}
        <li>{stepControl(current + 1, "next")}</li>
      </ul>
    </nav>
  );
});

Pagination.displayName = "Pagination";
