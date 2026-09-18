"use client";

import { InfiniteScroll } from "@averoui/react";
import { useState } from "react";

const TOTAL = 48;
const BATCH = 12;

export default function InfiniteScrollFeedDemo() {
  const [count, setCount] = useState(BATCH);
  const [loading, setLoading] = useState(false);

  function loadMore() {
    setLoading(true);
    // Stands in for a request to the next page of results.
    window.setTimeout(() => {
      setCount((current) => Math.min(current + BATCH, TOTAL));
      setLoading(false);
    }, 600);
  }

  return (
    <div className="scrollbar-fancy h-80 w-full max-w-sm overflow-y-auto rounded-2xl border border-gray-200 bg-white p-3">
      <InfiniteScroll hasMore={count < TOTAL} loading={loading} onLoadMore={loadMore}>
        <ul aria-label="دوره‌ها" className="flex flex-col gap-2">
          {Array.from({ length: count }, (_, index) => (
            <li key={index} className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
              دوره شماره {index + 1}
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}
