"use client";

import { CalendarSolidIcon, ClockSolidIcon, EyeSolidIcon, MetaBar, MetaItem } from "@averoui/react";
import { useCopy } from "../copy";

export default function MetaArticleDemo() {
  const t = useCopy({
    fa: {
      published: "انتشار:",
      publishedValue: "۳ شهریور ۱۴۰۵",
      readingTime: "زمان مطالعه:",
      readingValue: "۵ دقیقه",
      views: "بازدید:",
      viewsValue: "۱۵",
    },
    en: {
      published: "Published:",
      publishedValue: "25 August 2026",
      readingTime: "Reading time:",
      readingValue: "5 min",
      views: "Views:",
      viewsValue: "15",
    },
  });

  return (
    <MetaBar className="max-w-xl">
      <MetaItem
        icon={<CalendarSolidIcon size={14} className="text-gray-500" />}
        label={t.published}
      >
        {t.publishedValue}
      </MetaItem>
      <MetaItem icon={<ClockSolidIcon size={14} className="text-gray-500" />} label={t.readingTime}>
        {t.readingValue}
      </MetaItem>
      <MetaItem icon={<EyeSolidIcon size={14} className="text-gray-500" />} label={t.views}>
        {t.viewsValue}
      </MetaItem>
    </MetaBar>
  );
}
