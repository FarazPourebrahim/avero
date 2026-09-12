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
