"use client";

import { Avatar } from "@averoui/react";
import { useCopy } from "../copy";

export default function AvatarFallbackDemo() {
  const t = useCopy({
    fa: { first: "سارا محمدی", second: "علی کریمی", third: "نگار", broken: "تصویر خراب" },
    en: { first: "Sara Mohammadi", second: "Ali Karimi", third: "Negar", broken: "Broken image" },
  });

  return (
    <>
      <Avatar name={t.first} />
      <Avatar name={t.second} size="lg" />
      <Avatar name={t.third} size="lg" shape="2xl" />
      <Avatar name={t.broken} src="/does-not-exist.webp" size="lg" />
    </>
  );
}
