"use client";

import { Button, ConfirmDialog } from "@avero/react";
import { useState } from "react";

export default function ConfirmDialogDeleteCourseDemo() {
  const [status, setStatus] = useState("");

  return (
    <div className="flex flex-col items-center gap-3">
      <ConfirmDialog
        trigger={<Button variant="danger">حذف دوره</Button>}
        title="این دوره حذف شود؟"
        description="همه جلسه‌ها و دیدگاه‌های دوره برای همیشه پاک می‌شوند."
        confirmLabel="حذف دوره"
        tone="danger"
        onConfirm={() =>
          // Stands in for the delete request.
          new Promise<void>((resolve) => window.setTimeout(resolve, 1200)).then(() =>
            setStatus("دوره حذف شد."),
          )
        }
      />
      <p role="status" className="min-h-5 text-sm text-gray-700">
        {status}
      </p>
    </div>
  );
}
