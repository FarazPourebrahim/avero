"use client";

import { EmptyState } from "@averoui/react";
import { BarChart3, Bell } from "lucide-react";
import { useCopy } from "../copy";

export default function EmptyStateVariantsDemo() {
  const t = useCopy({
    fa: {
      article: "هنوز دیدگاهی برای این مقاله ثبت نشده است.",
      short: "هنوز دیدگاهی ثبت نشده است.",
      soon: "به‌زودی",
      noData: "داده‌ای برای نمایش وجود ندارد",
    },
    en: {
      article: "No comments on this article yet.",
      short: "No comments yet.",
      soon: "Coming soon",
      noData: "Nothing to show yet",
    },
  });

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <EmptyState>{t.article}</EmptyState>
      <EmptyState variant="slate">{t.short}</EmptyState>
      <EmptyState variant="icon" icon={<BarChart3 className="mx-auto size-8" />}>
        {t.soon}
      </EmptyState>
      <EmptyState variant="circle" icon={<Bell />}>
        {t.noData}
      </EmptyState>
    </div>
  );
}
