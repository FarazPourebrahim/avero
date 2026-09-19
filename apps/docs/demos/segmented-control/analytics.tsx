"use client";

import { SegmentedControl, SegmentedControlItem } from "@averoui/react";
import { BookOpen, FileText, Zap } from "lucide-react";
import { useCopy } from "../copy";

export default function SegmentedControlAnalyticsDemo() {
  const t = useCopy({
    fa: {
      label: "نوع آنالیتیکس",
      courses: "دوره‌ها",
      articles: "مقاله‌ها",
      workshops: "کارگاه‌ها",
    },
    en: {
      label: "Analytics type",
      courses: "Courses",
      articles: "Articles",
      workshops: "Workshops",
    },
  });

  return (
    <SegmentedControl aria-label={t.label} defaultValue="courses">
      <SegmentedControlItem value="courses">
        <BookOpen className="size-3.5 sm:size-4" aria-hidden />
        {t.courses}
      </SegmentedControlItem>
      <SegmentedControlItem value="articles">
        <FileText className="size-3.5 sm:size-4" aria-hidden />
        {t.articles}
      </SegmentedControlItem>
      <SegmentedControlItem value="workshops">
        <Zap className="size-3.5 sm:size-4" aria-hidden />
        {t.workshops}
      </SegmentedControlItem>
    </SegmentedControl>
  );
}
