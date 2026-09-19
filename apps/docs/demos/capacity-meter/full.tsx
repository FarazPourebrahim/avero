"use client";

import { CapacityMeter } from "@averoui/react";
import { useCopy } from "../copy";

export default function CapacityMeterFullDemo() {
  const t = useCopy({
    fa: {
      label: "ظرفیت ثبت‌نام",
      full: "تکمیل ظرفیت",
      signedUp: "۱۲ نفر ثبت‌نام کرده‌اند",
      max: "حداکثر ۱۲ نفر",
      workshop: "ظرفیت کارگاه",
    },
    en: {
      label: "Places taken",
      full: "Fully booked",
      signedUp: "12 people signed up",
      max: "12 places in total",
      workshop: "Workshop places",
    },
  });

  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <CapacityMeter
        variant="card"
        label={t.label}
        value={12}
        max={12}
        status={t.full}
        startCaption={t.signedUp}
        endCaption={t.max}
      />
      <CapacityMeter variant="detail" label={t.workshop} value={0} max={20} />
    </div>
  );
}
