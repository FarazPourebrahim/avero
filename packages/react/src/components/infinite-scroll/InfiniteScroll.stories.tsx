import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { InfiniteScroll } from "./InfiniteScroll.js";

const TOTAL = 60;
const BATCH = 12;

function CourseFeed() {
  const [count, setCount] = useState(BATCH);
  const [loading, setLoading] = useState(false);

  function loadMore() {
    setLoading(true);
    // Stands in for a network request.
    window.setTimeout(() => {
      setCount((current) => Math.min(current + BATCH, TOTAL));
      setLoading(false);
    }, 600);
  }

  return (
    <div className="scrollbar-fancy h-96 max-w-sm overflow-y-auto rounded-2xl border border-gray-200 bg-white p-3">
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

const meta = {
  title: "Navigation/InfiniteScroll",
  component: CourseFeed,
} satisfies Meta<typeof CourseFeed>;

export default meta;

export const Feed: StoryObj<typeof meta> = {};
