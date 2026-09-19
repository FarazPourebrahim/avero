"use client";

import { CapacityMeter } from "@averoui/react";
import { useCopy } from "../copy";

export default function CapacityMeterUsagesDemo() {
  const t = useCopy({
    fa: {
      label: "ظرفیت ثبت‌نام",
      seatsLeft: "۹ جای خالی",
      signedUp3: "۳ نفر ثبت‌نام کرده‌اند",
      max12: "حداکثر ۱۲ نفر",
      full: "ظرفیت تکمیل شد",
      signedUp5: "۵ نفر ثبت‌نام کرده‌اند",
      max5: "حداکثر ۵ نفر",
    },
    en: {
      label: "Places taken",
      seatsLeft: "9 seats left",
      signedUp3: "3 people signed up",
      max12: "12 places in total",
      full: "Fully booked",
      signedUp5: "5 people signed up",
      max5: "5 places in total",
    },
  });

  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <CapacityMeter label={t.label} value={3} max={12} />
      <div className="rounded-xl border border-gray-200 p-5">
        <CapacityMeter
          variant="card"
          label={t.label}
          value={3}
          max={12}
          status={t.seatsLeft}
          startCaption={t.signedUp3}
          endCaption={t.max12}
        />
      </div>
      <div className="rounded-xl border border-gray-200 p-5">
        <CapacityMeter
          variant="card"
          label={t.label}
          value={5}
          max={5}
          status={t.full}
          startCaption={t.signedUp5}
          endCaption={t.max5}
        />
      </div>
    </div>
  );
}
