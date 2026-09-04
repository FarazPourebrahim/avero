"use client";

import { Button, ToastProvider, useToast } from "@avero/react";

function Triggers() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast({ tone: "success", title: "ذخیره شد", description: "تغییرات ذخیره شد." })
        }
      >
        موفق
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({ tone: "info", title: "جلسه تازه", description: "جلسه پنجم منتشر شد." })
        }
      >
        اطلاعیه
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            tone: "warning",
            title: "ظرفیت رو به اتمام",
            description: "۳ جای خالی مانده است.",
          })
        }
      >
        هشدار
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            tone: "danger",
            title: "پرداخت انجام نشد",
            description: "ارتباط با درگاه قطع شد.",
            action: {
              label: "تلاش دوباره",
              altText: "از صفحه سفارش دوباره پرداخت کنید",
              onClick: () => {},
            },
          })
        }
      >
        خطا
      </Button>
    </div>
  );
}

export default function ToastTonesDemo() {
  return (
    <ToastProvider>
      <Triggers />
    </ToastProvider>
  );
}
