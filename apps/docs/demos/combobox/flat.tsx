"use client";

import { Combobox, Field, FieldControl, FieldDescription, FieldLabel } from "@averoui/react";
import type { ComboboxItem } from "@averoui/react";
import { useCopy } from "../copy";

export default function ComboboxFlatDemo() {
  const t = useCopy({
    fa: {
      label: "شهر برگزاری",
      empty: "شهری با این نام پیدا نشد.",
      description: "فهرست بدون دسته‌بندی، با یک گزینه غیرفعال.",
      cities: [
        { value: "tehran", label: "تهران" },
        { value: "mashhad", label: "مشهد" },
        { value: "isfahan", label: "اصفهان", keywords: ["Isfahan"] },
        { value: "shiraz", label: "شیراز" },
        { value: "kish", label: "کیش", disabled: true },
      ] satisfies ComboboxItem[],
    },
    en: {
      label: "Host city",
      empty: "No city by that name.",
      description: "A flat list, with one option disabled.",
      cities: [
        { value: "tehran", label: "Tehran" },
        { value: "mashhad", label: "Mashhad" },
        { value: "isfahan", label: "Isfahan" },
        { value: "shiraz", label: "Shiraz" },
        { value: "kish", label: "Kish", disabled: true },
      ] satisfies ComboboxItem[],
    },
  });

  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel>{t.label}</FieldLabel>
        <FieldControl>
          <Combobox key={t.label} options={t.cities} defaultValue="tehran" emptyMessage={t.empty} />
        </FieldControl>
        <FieldDescription>{t.description}</FieldDescription>
      </Field>
    </div>
  );
}
