"use client";

import { Rating } from "@averoui/react";
import { useCopy } from "../copy";

export default function RatingPrecisionDemo() {
  const t = useCopy({
    fa: { none: "هنوز امتیازی ثبت نشده:" },
    en: { none: "No ratings yet:" },
  });

  return (
    <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-600">
      <Rating value={5} fractionDigits={0} />
      <Rating value={4.75} fractionDigits={1} />
      <Rating value={4.75} />
      <Rating value={0} label={t.none} />
    </div>
  );
}
