"use client";

import { Button, ToastProvider, useToast } from "@averoui/react";

function Triggers() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast({
            tone: "success",
            title: "دوره حذف شد",
            description: "«مبانی تحلیل داده» از فهرست شما برداشته شد.",
            action: {
              label: "بازگرداندن",
              altText: "دوره را از صفحه دوره‌های حذف‌شده بازگردانید",
              onClick: () => {},
            },
          })
        }
      >
        با دکمه اقدام
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            tone: "danger",
            title: "بارگذاری ناموفق",
            description: "تا بستن دستی باز می‌ماند.",
            duration: Infinity,
          })
        }
      >
        ماندگار
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
