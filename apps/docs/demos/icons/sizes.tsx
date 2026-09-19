"use client";

import { HeartSolidIcon, TelegramIcon } from "@averoui/react";
import { useCopy } from "../copy";

// Measurements, not sample copy: the size scale reads the same in either direction, so the digits
// stay Latin alongside the Latin unit.
const SIZES = [
  { className: "size-3.5", label: "14px" },
  { className: "size-4", label: "16px" },
  { className: "size-5", label: "20px" },
  { className: "size-6", label: "24px" },
];

export default function IconsSizesDemo() {
  const t = useCopy({
    fa: {
      telegram: "تلگرام",
      note: "آیکن‌ها به‌صورت پیش‌فرض `aria-hidden` هستند؛ برای آیکن معنادار نامی بدهید.",
    },
    en: {
      telegram: "Telegram",
      note: "Icons are `aria-hidden` by default; give a meaningful icon a name.",
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end gap-6">
        {SIZES.map(({ className, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-xs text-gray-500">
            <HeartSolidIcon className={`${className} text-rose-500`} />
            {label}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 text-sm text-gray-600">
        <TelegramIcon
          className="size-5 text-sky-500"
          aria-hidden={false}
          role="img"
          aria-label={t.telegram}
        />
        <span>{t.note}</span>
      </div>
    </div>
  );
}
