"use client";

import { Button, ToastProvider, useToast } from "@averoui/react";
import { useCopy } from "../copy";

function Triggers() {
  const { toast } = useToast();
  const t = useCopy({
    fa: {
      successButton: "موفق",
      successTitle: "ذخیره شد",
      successBody: "تغییرات ذخیره شد.",
      infoButton: "اطلاعیه",
      infoTitle: "جلسه تازه",
      infoBody: "جلسه پنجم منتشر شد.",
      warningButton: "هشدار",
      warningTitle: "ظرفیت رو به اتمام",
      warningBody: "۳ جای خالی مانده است.",
      dangerButton: "خطا",
      dangerTitle: "پرداخت انجام نشد",
      dangerBody: "ارتباط با درگاه قطع شد.",
      retry: "تلاش دوباره",
      retryAlt: "از صفحه سفارش دوباره پرداخت کنید",
    },
    en: {
      successButton: "Success",
      successTitle: "Saved",
      successBody: "Your changes have been saved.",
      infoButton: "Notice",
      infoTitle: "New session",
      infoBody: "Session five is now available.",
      warningButton: "Warning",
      warningTitle: "Almost full",
      warningBody: "3 seats left.",
      dangerButton: "Error",
      dangerTitle: "Payment failed",
      dangerBody: "The connection to the payment provider dropped.",
      retry: "Try again",
      retryAlt: "Pay again from the order page",
    },
  });

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast({ tone: "success", title: t.successTitle, description: t.successBody })
        }
      >
        {t.successButton}
      </Button>
      <Button
        variant="outline"
        onClick={() => toast({ tone: "info", title: t.infoTitle, description: t.infoBody })}
      >
        {t.infoButton}
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({ tone: "warning", title: t.warningTitle, description: t.warningBody })
        }
      >
        {t.warningButton}
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            tone: "danger",
            title: t.dangerTitle,
            description: t.dangerBody,
            action: { label: t.retry, altText: t.retryAlt, onClick: () => {} },
          })
        }
      >
        {t.dangerButton}
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
