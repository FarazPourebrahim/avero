"use client";

import { Alert, Button } from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function AlertDismissibleDemo() {
  const [visible, setVisible] = useState(true);
  const t = useCopy({
    fa: {
      title: "پروفایل کامل نیست",
      body: "برای دیده‌شدن در فهرست مدرسان، درباره خودتان بنویسید.",
      restore: "نمایش دوباره پیام",
      plain: "پیامی بدون عنوان و بدون آیکن، برای یادداشت‌های کوتاه.",
    },
    en: {
      title: "Your profile is incomplete",
      body: "Write a short bio so you appear in the instructor list.",
      restore: "Show the message again",
      plain: "A message with no title and no icon, for short notes.",
    },
  });

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      {visible ? (
        <Alert tone="info" title={t.title} onDismiss={() => setVisible(false)}>
          {t.body}
        </Alert>
      ) : (
        <Button variant="outline" size="sm" onClick={() => setVisible(true)}>
          {t.restore}
        </Button>
      )}
      <Alert tone="neutral" icon={false}>
        {t.plain}
      </Alert>
    </div>
  );
}
