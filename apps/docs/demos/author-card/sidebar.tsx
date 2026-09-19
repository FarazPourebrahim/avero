"use client";

import { AuthorCard } from "@averoui/react";
import { useCopy } from "../copy";

export default function AuthorCardSidebarDemo() {
  const t = useCopy({
    fa: {
      name: "سارا محمدی",
      role: "سردبیر وبلاگ",
      bio: "طراح محصول و علاقه‌مند به آموزش؛ در این وبلاگ از تجربه‌های روزمره‌ام در طراحی رابط کاربری و ساختن سیستم‌های طراحی می‌نویسم. ✏️",
    },
    en: {
      name: "Sara Mohammadi",
      role: "Blog editor",
      bio: "Product designer and keen teacher. Here I write about the everyday work of designing interfaces and building design systems. ✏️",
    },
  });

  return (
    <div className="w-full max-w-sm">
      <AuthorCard name={t.name} roleLabel={t.role} bio={t.bio} />
    </div>
  );
}
