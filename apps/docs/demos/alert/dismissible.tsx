"use client";

import { Alert, Button } from "@averoui/react";
import { useState } from "react";

export default function AlertDismissibleDemo() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      {visible ? (
        <Alert tone="info" title="پروفایل کامل نیست" onDismiss={() => setVisible(false)}>
          برای دیده‌شدن در فهرست مدرسان، درباره خودتان بنویسید.
        </Alert>
      ) : (
        <Button variant="outline" size="sm" onClick={() => setVisible(true)}>
          نمایش دوباره پیام
        </Button>
      )}
      <Alert tone="neutral" icon={false}>
        پیامی بدون عنوان و بدون آیکن، برای یادداشت‌های کوتاه.
      </Alert>
    </div>
  );
}
