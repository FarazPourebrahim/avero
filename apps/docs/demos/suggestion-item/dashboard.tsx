"use client";

import { SuggestionItem } from "@averoui/react";
import { useCopy } from "../copy";

export default function SuggestionItemDashboardDemo() {
  const t = useCopy({
    fa: {
      dataTitle: "مبانی تحلیل داده",
      dataDescription: "کار با داده‌های واقعی و رسم نمودار در Python",
      online: "آنلاین",
      figmaTitle: "طراحی سیستم طراحی در Figma",
      figmaDescription: "ساختن کتابخانه کامپوننت و توکن‌های طراحی",
      advanced: "پیشرفته",
    },
    en: {
      dataTitle: "Data analysis basics",
      dataDescription: "Working with real data and charting it in Python",
      online: "Online",
      figmaTitle: "Building a design system in Figma",
      figmaDescription: "Building a component library and design tokens",
      advanced: "Advanced",
    },
  });

  return (
    <div className="w-full max-w-xl space-y-3">
      <SuggestionItem
        title={t.dataTitle}
        href="#"
        description={t.dataDescription}
        tags={[t.online]}
        match={8}
      />
      <SuggestionItem
        title={t.figmaTitle}
        href="#"
        description={t.figmaDescription}
        tags={[t.advanced, t.online]}
        match={92}
      />
    </div>
  );
}
