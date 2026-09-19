"use client";

import { RelatedItem, RelatedList } from "@averoui/react";
import { useCopy } from "../copy";

export default function RelatedListCoursesDemo() {
  const t = useCopy({
    fa: {
      title: "دوره‌های مرتبط",
      figma: "طراحی سیستم طراحی در Figma",
      typography: "اصول تایپوگرافی فارسی",
      usability: "کارگاه آزمون کاربردپذیری",
      free: "رایگان",
    },
    en: {
      title: "Related courses",
      figma: "Building a design system in Figma",
      typography: "Persian typography basics",
      usability: "Usability testing workshop",
      free: "Free",
    },
  });

  return (
    <div className="w-full max-w-sm">
      <RelatedList title={t.title}>
        <RelatedItem title={t.figma} href="#" price={3500000} />
        <RelatedItem title={t.typography} href="#" price={2200000} />
        <RelatedItem title={t.usability} href="#" meta={<span>{t.free}</span>} />
      </RelatedList>
    </div>
  );
}
