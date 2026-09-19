"use client";

import { Image } from "@averoui/react";
import { cover } from "../artwork";
import { useCopy } from "../copy";

export default function ImageCardAndFallbackDemo() {
  const t = useCopy({
    fa: { course: "مبانی طراحی رابط کاربری", missing: "تصویر در دسترس نیست" },
    en: { course: "UI design foundations", missing: "Image unavailable" },
  });

  return (
    <>
      <div className="group h-40 w-60 overflow-hidden rounded-3xl bg-slate-100">
        <Image src={cover} alt={t.course} zoom="group" className="size-full" />
      </div>
      <Image src="/does-not-exist.webp" alt={t.missing} radius="xl" className="h-40 w-60" />
    </>
  );
}
