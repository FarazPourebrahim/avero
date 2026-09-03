"use client";

import { Alert, Button } from "@avero/react";

export default function AlertTonesDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Alert tone="info" title="اطلاعیه">
        جلسه بعدی دوره یکشنبه ساعت ۱۸ برگزار می‌شود.
      </Alert>
      <Alert tone="success" title="ذخیره شد">
        تغییرات پروفایل شما ذخیره شد.
      </Alert>
      <Alert tone="warning" title="ظرفیت رو به اتمام">
        تنها ۳ جای خالی باقی مانده است.
      </Alert>
      <Alert
        tone="danger"
        title="پرداخت انجام نشد"
        action={
          <Button size="sm" variant="danger">
            تلاش دوباره
          </Button>
        }
      >
        مبلغی از حساب شما کسر نشده است.
      </Alert>
      <Alert variant="bordered" tone="info" title="نکته">
        پیش از شروع، پروژه نمونه را دانلود کنید.
      </Alert>
    </div>
  );
}
