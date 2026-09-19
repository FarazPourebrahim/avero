"use client";

import { Progress } from "@averoui/react";
import { useCopy } from "../copy";

export default function ProgressCapacityDemo() {
  const t = useCopy({
    fa: { label: "ظرفیت ثبت‌نام", count: "۳ از ۱۲" },
    en: { label: "Places taken", count: "3 of 12" },
  });

  return (
    <div className="w-full max-w-sm space-y-2 rounded-2xl bg-white p-6">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">{t.label}</span>
        <span className="font-medium text-gray-800">{t.count}</span>
      </div>
      <Progress value={3} max={12} aria-label={t.label} />
    </div>
  );
}
