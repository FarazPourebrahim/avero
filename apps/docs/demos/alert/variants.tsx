"use client";

import { Alert } from "@averoui/react";
import { useCopy } from "../copy";

export default function AlertVariantsDemo() {
  const t = useCopy({
    fa: {
      title: "ظرفیت رو به اتمام",
      tinted: "پنج جای خالی باقی مانده است.",
      bordered: "همان پیام، در نوار کناره‌دار روی سطح سفید.",
    },
    en: {
      title: "Almost full",
      tinted: "Five seats left.",
      bordered: "The same message, in the bordered variant on white.",
    },
  });

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Alert tone="warning" title={t.title}>
        {t.tinted}
      </Alert>
      <Alert variant="bordered" tone="warning" title={t.title}>
        {t.bordered}
      </Alert>
    </div>
  );
}
