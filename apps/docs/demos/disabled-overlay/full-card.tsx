"use client";

import { CapacityMeter, DisabledOverlay } from "@averoui/react";
import { useCopy } from "../copy";

export default function DisabledOverlayFullCardDemo() {
  const t = useCopy({
    fa: {
      title: "کارگاه عکاسی با موبایل",
      capacity: "ظرفیت ثبت‌نام",
      full: "ظرفیت تکمیل شد",
      start: "۵ نفر ثبت‌نام کرده‌اند",
      end: "حداکثر ۵ نفر",
    },
    en: {
      title: "Mobile photography workshop",
      capacity: "Places available",
      full: "Fully booked",
      start: "5 people signed up",
      end: "5 places in total",
    },
  });

  return (
    <div
      aria-disabled="true"
      className="relative flex w-full max-w-sm flex-col gap-5 rounded-xl border border-gray-200 p-5 opacity-70 blur-[1px] select-none"
    >
      <h3 className="text-primary text-base font-bold">{t.title}</h3>
      <CapacityMeter
        variant="card"
        label={t.capacity}
        value={5}
        max={5}
        status={t.full}
        startCaption={t.start}
        endCaption={t.end}
      />
      <DisabledOverlay>{t.full}</DisabledOverlay>
    </div>
  );
}
