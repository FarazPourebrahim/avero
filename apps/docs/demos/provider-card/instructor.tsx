"use client";

import { ProviderCard, Rating } from "@averoui/react";
import { useCopy } from "../copy";

export default function ProviderCardInstructorDemo() {
  const t = useCopy({
    fa: {
      name: "نگار رضایی",
      headline: "مدرس طراحی رابط کاربری",
      courses: "تعداد دوره‌ها",
      rating: "امتیاز شرکت‌کنندگان",
    },
    en: {
      name: "Negar Rezaei",
      headline: "UI design instructor",
      courses: "Courses",
      rating: "Participant rating",
    },
  });

  return (
    <div className="w-full max-w-sm">
      <ProviderCard
        name={t.name}
        headline={t.headline}
        stats={[
          { label: t.courses, value: "3" },
          { label: t.rating, value: <Rating value={4.8} size="sm" /> },
        ]}
        profileHref="#"
      />
    </div>
  );
}
