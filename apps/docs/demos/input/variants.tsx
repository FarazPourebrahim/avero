"use client";

import { Input } from "@averoui/react";
import { useCopy } from "../copy";

export default function InputVariantsDemo() {
  const t = useCopy({
    fa: {
      search: "جستجو",
      searchPlaceholder: "جستجو...",
      title: "عنوان",
      titlePlaceholder: "عنوان دوره",
      email: "ایمیل",
    },
    en: {
      search: "Search",
      searchPlaceholder: "Search…",
      title: "Title",
      titlePlaceholder: "Course title",
      email: "Email",
    },
  });

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input aria-label={t.search} placeholder={t.searchPlaceholder} />
      <Input variant="soft" aria-label={t.title} placeholder={t.titlePlaceholder} />
      <Input variant="slate" aria-label={t.email} placeholder="hello@example.com" />
    </div>
  );
}
