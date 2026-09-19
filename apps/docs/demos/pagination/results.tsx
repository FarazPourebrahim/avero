"use client";

import { Pagination } from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function PaginationResultsDemo() {
  const [page, setPage] = useState(7);
  const t = useCopy({
    fa: { status: (current: number) => `صفحه ${current} از ۲۴` },
    en: { status: (current: number) => `Page ${current} of 24` },
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <Pagination pageCount={24} page={page} onPageChange={setPage} />
      <p role="status" className="text-sm text-gray-700">
        {t.status(page)}
      </p>
    </div>
  );
}
