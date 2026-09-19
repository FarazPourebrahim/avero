"use client";

import { Input } from "@averoui/react";
import { useCopy } from "../copy";

export default function InputPrimaryDemo() {
  const t = useCopy({
    fa: { label: "جستجوی دوره", placeholder: "جستجو..." },
    en: { label: "Search courses", placeholder: "Search…" },
  });

  return (
    <div className="w-full max-w-sm">
      <Input aria-label={t.label} placeholder={t.placeholder} />
    </div>
  );
}
