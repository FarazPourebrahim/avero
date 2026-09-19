"use client";

import { Alert, Button } from "@averoui/react";
import { useCopy } from "../copy";

export default function AlertTonesDemo() {
  const t = useCopy({
    fa: {
      infoTitle: "اطلاعیه",
      infoBody: "جلسه بعدی دوره یکشنبه ساعت ۱۸ برگزار می‌شود.",
      successTitle: "ذخیره شد",
      successBody: "تغییرات پروفایل شما ذخیره شد.",
      warningTitle: "ظرفیت رو به اتمام",
      warningBody: "تنها ۳ جای خالی باقی مانده است.",
      dangerTitle: "پرداخت انجام نشد",
      dangerBody: "مبلغی از حساب شما کسر نشده است.",
      retry: "تلاش دوباره",
      noteTitle: "نکته",
      noteBody: "پیش از شروع، پروژه نمونه را دانلود کنید.",
    },
    en: {
      infoTitle: "Notice",
      infoBody: "The next session runs on Sunday at 18:00.",
      successTitle: "Saved",
      successBody: "Your profile changes have been saved.",
      warningTitle: "Almost full",
      warningBody: "Only 3 seats left.",
      dangerTitle: "Payment failed",
      dangerBody: "Nothing has been charged to your account.",
      retry: "Try again",
      noteTitle: "Note",
      noteBody: "Download the sample project before you start.",
    },
  });

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Alert tone="info" title={t.infoTitle}>
        {t.infoBody}
      </Alert>
      <Alert tone="success" title={t.successTitle}>
        {t.successBody}
      </Alert>
      <Alert tone="warning" title={t.warningTitle}>
        {t.warningBody}
      </Alert>
      <Alert
        tone="danger"
        title={t.dangerTitle}
        action={
          <Button size="sm" variant="danger">
            {t.retry}
          </Button>
        }
      >
        {t.dangerBody}
      </Alert>
      <Alert variant="bordered" tone="info" title={t.noteTitle}>
        {t.noteBody}
      </Alert>
    </div>
  );
}
