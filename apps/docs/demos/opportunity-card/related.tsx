"use client";

import { OpportunityCard } from "@avero/react";

export default function OpportunityCardRelatedDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      <OpportunityCard
        title="کارگاه طراحی تجربه کاربری"
        href="#"
        date="15 مهر"
        tags={["آنلاین"]}
        description="کارگاه عملی سه‌روزه برای آشنایی با فرایند طراحی و آزمون کاربردپذیری"
        capacityLabel="ظرفیت ثبت‌نام"
        value={3}
        max={12}
        status="9 جای خالی"
        startCaption="3 نفر ثبت‌نام کرده‌اند"
        endCaption="حداکثر 12 نفر"
      />
      <OpportunityCard
        title="کارگاه عکاسی با موبایل"
        href="#"
        date="22 مهر"
        tags={["حضوری"]}
        capacityLabel="ظرفیت ثبت‌نام"
        value={5}
        max={5}
        status="ظرفیت تکمیل شد"
        startCaption="5 نفر ثبت‌نام کرده‌اند"
        endCaption="حداکثر 5 نفر"
        full
      />
    </div>
  );
}
