"use client";

import { Input } from "@averoui/react";
import { useCopy } from "../copy";

export default function InputVariantsDemo() {
  const t = useCopy({
    fa: {
      name: "نام و نام خانوادگی",
      namePlaceholder: "سارا محمدی",
      search: "جستجو",
      searchPlaceholder: "جستجو...",
      title: "عنوان",
      titlePlaceholder: "عنوان دوره",
      email: "ایمیل",
    },
    en: {
      name: "Full name",
      namePlaceholder: "Sara Mohammadi",
      search: "Search",
      searchPlaceholder: "Search…",
      title: "Title",
      titlePlaceholder: "Course title",
      email: "Email",
    },
  });

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input aria-label={t.name} placeholder={t.namePlaceholder} />
      <Input variant="filter" aria-label={t.search} placeholder={t.searchPlaceholder} />
      <Input variant="soft" aria-label={t.title} placeholder={t.titlePlaceholder} />
      <Input variant="slate" aria-label={t.email} placeholder="hello@example.com" />
    </div>
  );
}
