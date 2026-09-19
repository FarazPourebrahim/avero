"use client";

import { Button, ToastProvider, useToast } from "@averoui/react";
import { useCopy } from "../copy";

function Triggers() {
  const { toast } = useToast();
  const t = useCopy({
    fa: {
      actionButton: "با دکمه اقدام",
      deletedTitle: "دوره حذف شد",
      deletedBody: "«مبانی تحلیل داده» از فهرست شما برداشته شد.",
      undo: "بازگرداندن",
      undoAlt: "دوره را از صفحه دوره‌های حذف‌شده بازگردانید",
      stickyButton: "ماندگار",
      stickyTitle: "بارگذاری ناموفق",
      stickyBody: "تا بستن دستی باز می‌ماند.",
    },
    en: {
      actionButton: "With an action",
      deletedTitle: "Course deleted",
      deletedBody: "“Data analysis basics” was removed from your list.",
      undo: "Undo",
      undoAlt: "Restore the course from the deleted courses page",
      stickyButton: "Sticky",
      stickyTitle: "Upload failed",
      stickyBody: "Stays open until you dismiss it.",
    },
  });

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast({
            tone: "success",
            title: t.deletedTitle,
            description: t.deletedBody,
            action: { label: t.undo, altText: t.undoAlt, onClick: () => {} },
          })
        }
      >
        {t.actionButton}
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            tone: "danger",
            title: t.stickyTitle,
            description: t.stickyBody,
            duration: Infinity,
          })
        }
      >
        {t.stickyButton}
      </Button>
    </div>
  );
}

export default function ToastActionDemo() {
  return (
    <ToastProvider limit={2}>
      <Triggers />
    </ToastProvider>
  );
}
