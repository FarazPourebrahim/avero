"use client";

import { CheckboxCard, PriceTag } from "@averoui/react";
import { useCopy } from "../copy";

const ADD_ONS = [
  { id: "mentor", price: 1_200_000, defaultChecked: true },
  { id: "certificate", price: 350_000, defaultChecked: false },
  { id: "recordings", price: 0, disabled: true },
] as const;

export default function CheckboxCardsDemo() {
  const t = useCopy({
    fa: {
      title: {
        mentor: "جلسه‌های منتورینگ",
        certificate: "گواهی چاپی",
        recordings: "دسترسی دائمی به ویدیوها",
      },
      description: {
        mentor: "چهار جلسه یک‌به‌یک با مدرس، در طول دوره",
        certificate: "ارسال با پست، دو هفته پس از پایان دوره",
        recordings: "برای همه ثبت‌نام‌ها فعال است",
      },
      included: "رایگان",
    },
    en: {
      title: {
        mentor: "Mentoring sessions",
        certificate: "Printed certificate",
        recordings: "Lifetime access to recordings",
      },
      description: {
        mentor: "Four one-to-one sessions with the instructor during the course",
        certificate: "Posted two weeks after the course ends",
        recordings: "Included with every enrolment",
      },
      included: "Free",
    },
  });

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {ADD_ONS.map(({ id, price, ...props }) => (
        <CheckboxCard
          key={id}
          name="add-ons"
          value={id}
          title={t.title[id]}
          description={t.description[id]}
          aside={
            price > 0 ? (
              <PriceTag amount={price} variant="compact" />
            ) : (
              <span className="text-xs font-semibold text-emerald-700">{t.included}</span>
            )
          }
          {...props}
        />
      ))}
    </div>
  );
}
