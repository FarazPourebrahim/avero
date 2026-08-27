"use client";

import { Pagination } from "@avero/react";
import { useState } from "react";

export default function PaginationResultsDemo() {
  const [page, setPage] = useState(7);

  return (
    <div className="flex flex-col items-center gap-3">
      <Pagination pageCount={24} page={page} onPageChange={setPage} />
      <p role="status" className="text-sm text-gray-700">
        صفحه {page} از ۲۴
      </p>
    </div>
  );
}
