"use client";

import { Divider } from "@averoui/react";
import { useCopy } from "../copy";

export default function DividerBasicDemo() {
  const t = useCopy({
    fa: { related: "دسته‌بندی‌های مرتبط", views: "۶ بازدید", rating: "امتیاز: 0.00" },
    en: { related: "Related categories", views: "6 views", rating: "Rating: 0.00" },
  });

  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl bg-white p-6">
      <span className="text-sm text-gray-600">{t.related}</span>
      <Divider />
      <div className="flex h-8 items-center gap-4 text-sm text-gray-600">
        <span>{t.views}</span>
        <Divider orientation="vertical" tone="strong" />
        <span>{t.rating}</span>
      </div>
    </div>
  );
}
