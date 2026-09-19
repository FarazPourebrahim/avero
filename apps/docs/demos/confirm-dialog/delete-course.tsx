"use client";

import { Button, ConfirmDialog } from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function ConfirmDialogDeleteCourseDemo() {
  const [status, setStatus] = useState("");
  const t = useCopy({
    fa: {
      trigger: "حذف دوره",
      title: "این دوره حذف شود؟",
      description: "همه جلسه‌ها و دیدگاه‌های دوره برای همیشه پاک می‌شوند.",
      done: "دوره حذف شد.",
    },
    en: {
      trigger: "Delete course",
      title: "Delete this course?",
      description: "Every session and comment on it is removed for good.",
      done: "Course deleted.",
    },
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <ConfirmDialog
        trigger={<Button variant="danger">{t.trigger}</Button>}
        title={t.title}
        description={t.description}
        confirmLabel={t.trigger}
        tone="danger"
        onConfirm={() =>
          // Stands in for the delete request.
          new Promise<void>((resolve) => window.setTimeout(resolve, 1200)).then(() =>
            setStatus(t.done),
          )
        }
      />
      <p role="status" className="min-h-5 text-sm text-gray-700">
        {status}
      </p>
    </div>
  );
}
