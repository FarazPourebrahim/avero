"use client";

import { PriceTag } from "@averoui/react";
import { useCopy } from "../copy";

export default function PriceTagVariantsDemo() {
  const t = useCopy({
    fa: { label: "قیمت پایه دوره" },
    en: { label: "Base course price" },
  });

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div>
        <div className="mb-4 text-xs font-bold text-slate-400">{t.label}</div>
        <PriceTag amount={4_500_000} />
      </div>
      <div className="border-t border-gray-100 pt-3">
        <PriceTag variant="inline" amount={4_500_000} />
      </div>
      <PriceTag variant="compact" amount={3_800_000} />
    </div>
  );
}
