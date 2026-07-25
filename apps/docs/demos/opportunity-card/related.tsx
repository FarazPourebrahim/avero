"use client";

import { OpportunityCard } from "@avero/react";

export default function OpportunityCardRelatedDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      <OpportunityCard
        title="توسعه دهنده php"
        href="#"
        date="تاریخ نامشخص"
        tags={["remote"]}
        description="توسعه بخش مدیریت سایت و رفع اشکالات موجود"
        capacityLabel="ظرفیت ارسال رزومه"
        value={3}
        max={12}
        status="9 جای خالی"
        startCaption="3 رزومه ارسال شده"
        endCaption="حداکثر 12 نفر"
      />
      <OpportunityCard
        title="تبدیل قالب HTML به وردپرس"
        href="#"
        date="تاریخ نامشخص"
        tags={["freelance"]}
        capacityLabel="ظرفیت ارسال رزومه"
        value={5}
        max={5}
        status="تکمیل ظرفیت"
        startCaption="5 رزومه ارسال شده"
        endCaption="حداکثر 5 نفر"
        full
      />
    </div>
  );
}
