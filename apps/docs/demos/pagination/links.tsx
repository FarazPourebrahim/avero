"use client";

// `getHref` is a function, and a Server Component cannot hand a function to a Client Component, so
// a demo of the link mode is itself a Client Component.
import { Pagination } from "@avero/react";

export default function PaginationLinksDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-8">
      <Pagination
        pageCount={12}
        defaultPage={6}
        siblingCount={2}
        getHref={(page) => `?page=${page}`}
      />
      <Pagination pageCount={3} defaultPage={1} />
    </div>
  );
}
