"use client";

import { InfiniteScroll } from "@averoui/react";
import { useState } from "react";

const PAGE_SIZE = 4;
const TOTAL = 12;

export default function InfiniteScrollEndDemo() {
  const [count, setCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const hasMore = count < TOTAL;

  function loadMore() {
    setLoading(true);
    // Stands in for the next page request.
    window.setTimeout(() => {
      setCount((current) => Math.min(TOTAL, current + PAGE_SIZE));
      setLoading(false);
    }, 600);
  }

  return (
    <div className="scrollbar-fancy h-72 w-full max-w-sm overflow-y-auto rounded-2xl border border-gray-200 bg-white p-3">
      <InfiniteScroll
        onLoadMore={loadMore}
        hasMore={hasMore}
        loading={loading}
        rootMargin="40px"
        loader="در حال آوردن جلسه‌های بعدی…"
      >
        <ul aria-label="جلسه‌های دوره" className="flex flex-col gap-2">
          {Array.from({ length: count }, (_, index) => (
            <li key={index} className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
              جلسه {index + 1}
            </li>
          ))}
        </ul>
      </InfiniteScroll>
      {hasMore ? null : (
        <p className="py-3 text-center text-sm text-gray-500">پایان فهرست — ۱۲ جلسه</p>
      )}
    </div>
  );
}
