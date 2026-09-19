"use client";

import { Rating } from "@averoui/react";
import { useCopy } from "../copy";

export default function RatingUsagesDemo() {
  const t = useCopy({
    fa: { label: "امتیاز:" },
    en: { label: "Rating:" },
  });

  return (
    <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
      <Rating value={4.8} />
      <Rating
        value={0}
        label={t.label}
        className="gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-1.5"
      />
      <Rating
        value={5}
        size="sm"
        fractionDigits={0}
        className="text-base font-black text-slate-900"
      />
    </div>
  );
}
