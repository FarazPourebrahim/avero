"use client";

import { OpportunityCard } from "@averoui/react";
import { useCopy } from "../copy";

export default function OpportunityCardRelatedDemo() {
  const t = useCopy({
    fa: {
      uxTitle: "کارگاه طراحی تجربه کاربری",
      uxDate: "۱۵ مهر",
      online: "آنلاین",
      uxDescription: "کارگاه عملی سه‌روزه برای آشنایی با فرایند طراحی و آزمون کاربردپذیری",
      capacity: "ظرفیت ثبت‌نام",
      seatsLeft: "۹ جای خالی",
      signedUp3: "۳ نفر ثبت‌نام کرده‌اند",
      max12: "حداکثر ۱۲ نفر",
      photoTitle: "کارگاه عکاسی با موبایل",
      photoDate: "۲۲ مهر",
      inPerson: "حضوری",
      full: "ظرفیت تکمیل شد",
      signedUp5: "۵ نفر ثبت‌نام کرده‌اند",
      max5: "حداکثر ۵ نفر",
    },
    en: {
      uxTitle: "UX design workshop",
      uxDate: "7 October",
      online: "Online",
      uxDescription: "A hands-on three-day workshop on the design process and usability testing",
      capacity: "Places available",
      seatsLeft: "9 seats left",
      signedUp3: "3 people signed up",
      max12: "12 places in total",
      photoTitle: "Mobile photography workshop",
      photoDate: "14 October",
      inPerson: "In person",
      full: "Fully booked",
      signedUp5: "5 people signed up",
      max5: "5 places in total",
    },
  });

  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      <OpportunityCard
        title={t.uxTitle}
        href="#"
        date={t.uxDate}
        tags={[t.online]}
        description={t.uxDescription}
        capacityLabel={t.capacity}
        value={3}
        max={12}
        status={t.seatsLeft}
        startCaption={t.signedUp3}
        endCaption={t.max12}
      />
      <OpportunityCard
        title={t.photoTitle}
        href="#"
        date={t.photoDate}
        tags={[t.inPerson]}
        capacityLabel={t.capacity}
        value={5}
        max={5}
        status={t.full}
        startCaption={t.signedUp5}
        endCaption={t.max5}
        full
      />
    </div>
  );
}
