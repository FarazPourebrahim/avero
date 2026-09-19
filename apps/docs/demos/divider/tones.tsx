"use client";

import { Divider } from "@averoui/react";
import { useCopy } from "../copy";

const TONES = ["gray", "slate", "strong"] as const;

export default function DividerTonesDemo() {
  const t = useCopy({
    fa: {
      labels: { gray: "داخل کارت‌ها", slate: "صفحه پروفایل", strong: "پاورقی" },
      semantic: "جداکننده معنادار بین دو بخش",
    },
    en: {
      labels: { gray: "inside cards", slate: "profile page", strong: "footer" },
      semantic: "A meaningful divider between two sections",
    },
  });

  return (
    <div className="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-white p-6">
      {TONES.map((tone) => (
        <div key={tone} className="flex flex-col gap-2">
          <span className="text-xs text-gray-500">
            {tone} — {t.labels[tone]}
          </span>
          <Divider tone={tone} />
        </div>
      ))}
      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-500">{t.semantic}</span>
        <Divider decorative={false} />
      </div>
    </div>
  );
}
