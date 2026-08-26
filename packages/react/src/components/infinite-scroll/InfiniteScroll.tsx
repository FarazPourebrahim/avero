"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import { cn } from "../../utils/cn.js";
import { Button } from "../button/Button.js";

/** Props specific to `InfiniteScroll`. It also accepts every native `<div>` attribute. */
export type InfiniteScrollOwnProps = {
  /** Called when the end of the list comes into view and more items can be loaded. */
  onLoadMore: () => void;
  /** Whether there are more items to load. Loading stops once this is `false`. */
  hasMore: boolean;
  /** Whether a batch is loading. No further loads are requested until it finishes. @defaultValue false */
  loading?: boolean;
  /** Shown while loading, and announced politely. @defaultValue the dictionary's `loading` */
  loader?: ReactNode;
  /** How far before the end of the list loading starts, as a CSS margin. @defaultValue "200px" */
  rootMargin?: string;
};

export type InfiniteScrollProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof InfiniteScrollOwnProps
> &
  InfiniteScrollOwnProps;

/**
 * Loads the next batch of items when the end of its content scrolls into view, using an
 * `IntersectionObserver` on a sentinel after the children. Where the observer isn't available, a
 * "load more" button does the same job.
 */
export const InfiniteScroll = forwardRef<HTMLDivElement, InfiniteScrollProps>(
  function InfiniteScroll(
    {
      onLoadMore,
      hasMore,
      loading = false,
      loader,
      rootMargin = "200px",
      className,
      children,
      ...props
    },
    ref,
  ) {
    const { dictionary } = useAvero();
    const sentinelRef = useRef<HTMLDivElement>(null);
    const onLoadMoreRef = useRef(onLoadMore);
    onLoadMoreRef.current = onLoadMore;
    // Assumed until the browser says otherwise, so the server and the first client render agree.
    const [observerSupported, setObserverSupported] = useState(true);

    useEffect(() => {
      const sentinel = sentinelRef.current;
      // While loading, the observer is dropped; a fresh one reports right away if the end is still
      // in view, which keeps loading until the viewport is filled.
      if (!sentinel || !hasMore || loading) return;
      if (typeof IntersectionObserver === "undefined") {
        setObserverSupported(false);
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) onLoadMoreRef.current();
        },
        { rootMargin },
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    }, [hasMore, loading, rootMargin]);

    return (
      <div ref={ref} data-slot="infinite-scroll" className={cn(className)} {...props}>
        {children}
        <div
          ref={sentinelRef}
          aria-hidden="true"
          data-slot="infinite-scroll-sentinel"
          className="h-px"
        />
        <div role="status" data-slot="infinite-scroll-status">
          {loading ? (
            <div
              data-slot="infinite-scroll-loader"
              className="py-4 text-center text-sm text-gray-500"
            >
              {loader ?? dictionary.loading}
            </div>
          ) : null}
        </div>
        {!observerSupported && hasMore && !loading ? (
          <div className="flex justify-center py-4">
            <Button
              variant="outline"
              size="sm"
              radius="xl"
              data-slot="infinite-scroll-load-more"
              onClick={() => onLoadMoreRef.current()}
            >
              {dictionary.loadMore}
            </Button>
          </div>
        ) : null}
      </div>
    );
  },
);

InfiniteScroll.displayName = "InfiniteScroll";
