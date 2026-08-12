"use client";

import { forwardRef, useEffect, useId, type HTMLAttributes, type ReactNode } from "react";
import { useControllableState } from "../../hooks/useControllableState.js";
import { useAvero } from "../../i18n/AveroProvider.js";
import { ListUlSolidIcon } from "../../icons/publicIcons.js";
import { cn } from "../../utils/cn.js";

export type TocItem = {
  /** The `id` of the heading this entry links to. */
  id: string;
  label: ReactNode;
  /** Heading level. Level 3 entries render smaller, as sub-items. @defaultValue 2 */
  level?: 2 | 3;
};

/** Props specific to `TableOfContents`. It also accepts every native `<div>` attribute. */
export type TableOfContentsOwnProps = {
  /** Entries in document order. */
  items: TocItem[];
  /** Id of the highlighted entry (controlled). */
  activeId?: string;
  /** Initially highlighted entry (uncontrolled). @defaultValue the first entry */
  defaultActiveId?: string;
  /** Called when the highlighted entry changes, by clicking or scrolling. */
  onActiveChange?: (id: string) => void;
  /** Highlights the entry whose heading is at the top of the viewport while scrolling. @defaultValue true */
  spy?: boolean;
  /** Card title. @defaultValue the dictionary's `tocTitle` ("در این مقاله" / "On this page") */
  title?: ReactNode;
};

export type TableOfContentsProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof TableOfContentsOwnProps
> &
  TableOfContentsOwnProps;

/**
 * The article's "در این مقاله" card (N-07, R-01). Entries are real `#id` links, so they work
 * without JavaScript; the current section is highlighted with an indigo start border.
 */
export const TableOfContents = forwardRef<HTMLDivElement, TableOfContentsProps>(
  function TableOfContents(
    { items, activeId, defaultActiveId, onActiveChange, spy = true, title, className, ...props },
    ref,
  ) {
    const { dictionary } = useAvero();
    const titleId = useId();
    const [current, setCurrent] = useControllableState({
      value: activeId,
      defaultValue: defaultActiveId ?? items[0]?.id ?? "",
      onChange: onActiveChange,
    });
    const idsKey = items.map((item) => item.id).join("\n");

    useEffect(() => {
      if (!spy || !idsKey || typeof IntersectionObserver === "undefined") return;
      const ids = idsKey.split("\n");
      const visible = new Set<string>();
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visible.add(entry.target.id);
            else visible.delete(entry.target.id);
          }
          const topmost = ids.find((id) => visible.has(id));
          if (topmost) setCurrent(topmost);
        },
        { rootMargin: "0px 0px -70% 0px" },
      );
      for (const id of ids) {
        const heading = document.getElementById(id);
        if (heading) observer.observe(heading);
      }
      return () => observer.disconnect();
    }, [idsKey, spy, setCurrent]);

    return (
      <div
        ref={ref}
        data-slot="table-of-contents"
        className={cn("rounded-2xl border border-gray-100 bg-white p-4 shadow-sm", className)}
        {...props}
      >
        <p
          id={titleId}
          className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700"
        >
          <ListUlSolidIcon size={16} className="text-indigo-500" />
          {title ?? dictionary.tocTitle}
        </p>
        <nav aria-labelledby={titleId}>
          <ul className="space-y-2 text-sm text-gray-600">
            {items.map((item) => {
              const isActive = item.id === current;
              return (
                <li
                  key={item.id}
                  className={cn(
                    "border-s-2 pe-3 transition-colors",
                    isActive
                      ? "border-indigo-500 font-medium text-indigo-600"
                      : "border-transparent hover:border-gray-200",
                  )}
                >
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => setCurrent(item.id)}
                    className={cn(
                      "block w-full rounded-e px-2 py-1 text-start transition",
                      "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:outline-none",
                      item.level === 3 && "pe-6 text-xs text-gray-500",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  },
);

TableOfContents.displayName = "TableOfContents";
