"use client";

import { Combobox, Field, FieldControl, FieldDescription, FieldLabel } from "@averoui/react";
import type { ComboboxItem } from "@averoui/react";

const CITIES: ComboboxItem[] = [
  { value: "tehran", label: "تهران" },
  { value: "mashhad", label: "مشهد" },
  { value: "isfahan", label: "اصفهان", keywords: ["Isfahan"] },
  { value: "shiraz", label: "شیراز" },
  { value: "kish", label: "کیش", disabled: true },
];

export default function ComboboxFlatDemo() {
  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel>شهر برگزاری</FieldLabel>
        <FieldControl>
          <Combobox
            options={CITIES}
            defaultValue="tehran"
            emptyMessage="شهری با این نام پیدا نشد."
          />
        </FieldControl>
        <FieldDescription>فهرست بدون دسته‌بندی، با یک گزینه غیرفعال.</FieldDescription>
      </Field>
    </div>
  );
}
