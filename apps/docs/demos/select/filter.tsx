"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@averoui/react";
import { useCopy } from "../copy";

export default function SelectFilterDemo() {
  const t = useCopy({
    fa: {
      label: "دسته‌بندی",
      all: "همه دسته‌ها",
      design: "طراحی",
      data: "داده",
      photography: "عکاسی",
    },
    en: {
      label: "Category",
      all: "All categories",
      design: "Design",
      data: "Data",
      photography: "Photography",
    },
  });

  return (
    <div className="w-full max-w-sm">
      <Select>
        <SelectTrigger aria-label={t.label}>
          <SelectValue placeholder={t.all} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t.all}</SelectItem>
          <SelectItem value="design">{t.design}</SelectItem>
          <SelectItem value="data">{t.data}</SelectItem>
          <SelectItem value="photography" disabled>
            {t.photography}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
