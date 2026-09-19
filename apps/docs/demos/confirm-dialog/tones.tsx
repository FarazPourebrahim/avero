"use client";

import { Button, ConfirmDialog } from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function ConfirmDialogTonesDemo() {
  const [status, setStatus] = useState("");
  const t = useCopy({
    fa: {
      trigger: "انتشار دوره",
      title: "دوره منتشر شود؟",
      description:
        "پس از انتشار، دوره برای همه قابل دیدن است و می‌توانید آن را دوباره پیش‌نویس کنید.",
      confirm: "انتشار",
      cancel: "فعلاً نه",
      done: "دوره منتشر شد.",
    },
    en: {
      trigger: "Publish course",
      title: "Publish this course?",
      description: "Once published anyone can see it, and you can move it back to draft later.",
      confirm: "Publish",
      cancel: "Not yet",
      done: "Course published.",
    },
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <ConfirmDialog
        trigger={<Button variant="outline">{t.trigger}</Button>}
        title={t.title}
        description={t.description}
        confirmLabel={t.confirm}
        cancelLabel={t.cancel}
        onConfirm={() => setStatus(t.done)}
      />
      <p role="status" className="min-h-5 text-sm text-gray-700">
        {status}
      </p>
    </div>
  );
}
