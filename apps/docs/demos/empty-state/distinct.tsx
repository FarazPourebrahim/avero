"use client";

import { Button, EmptyState } from "@averoui/react";
import { BookOpen, SearchX } from "lucide-react";
import { useCopy } from "../copy";

export default function EmptyStateDistinctDemo() {
  const t = useCopy({
    fa: {
      noResults: "هیچ دوره‌ای با «تحلیل داده پیشرفته» پیدا نشد. واژه دیگری را امتحان کنید.",
      nothingYet: "هنوز در هیچ دوره‌ای ثبت‌نام نکرده‌اید.",
      browse: "دیدن فهرست دوره‌ها",
    },
    en: {
      noResults: "No courses match “advanced data analysis”. Try another word.",
      nothingYet: "You have not enrolled in a course yet.",
      browse: "Browse courses",
    },
  });

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <EmptyState variant="circle" icon={<SearchX />}>
        {t.noResults}
      </EmptyState>
      <EmptyState
        variant="circle"
        icon={<BookOpen />}
        action={<Button size="sm">{t.browse}</Button>}
      >
        {t.nothingYet}
      </EmptyState>
    </div>
  );
}
