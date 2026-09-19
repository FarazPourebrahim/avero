"use client";

import { Input } from "@averoui/react";
import { useCopy } from "../copy";

export default function InputTypesDemo() {
  const t = useCopy({
    fa: {
      search: "جستجوی دوره",
      searchPlaceholder: "جستجو...",
      email: "ایمیل",
      phone: "شماره تماس",
    },
    en: { search: "Search courses", searchPlaceholder: "Search…", email: "Email", phone: "Phone" },
  });

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input type="search" aria-label={t.search} placeholder={t.searchPlaceholder} />
      <Input type="email" dir="ltr" aria-label={t.email} placeholder="hello@example.com" />
      <Input type="tel" dir="ltr" aria-label={t.phone} placeholder="+98 912 000 0000" />
    </div>
  );
}
