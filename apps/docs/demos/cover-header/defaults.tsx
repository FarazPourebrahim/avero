"use client";

import { CoverHeader } from "@averoui/react";
import { useCopy } from "../copy";

export default function CoverHeaderDefaultsDemo() {
  const t = useCopy({
    fa: {
      noCover: "بدون تصویر جلد",
      noCoverBody: "جلد پیش‌فرض یک گرادیان آبی به بنفش است و جای آواتار خالی می‌ماند.",
      initials: "س‌م",
      custom: "جلد و آواتار دلخواه",
      customBody: "هر دو جایگاه هر محتوایی را می‌پذیرند.",
    },
    en: {
      noCover: "Without a cover image",
      noCoverBody:
        "The default cover is a blue-to-purple gradient, and the avatar slot stays empty.",
      initials: "SM",
      custom: "Your own cover and avatar",
      customBody: "Both slots accept any content.",
    },
  });

  return (
    <div className="flex w-full flex-col gap-8">
      <CoverHeader className="w-full">
        <h3 className="text-lg font-bold text-gray-900">{t.noCover}</h3>
        <p className="mt-1 text-sm text-gray-500">{t.noCoverBody}</p>
      </CoverHeader>
      <CoverHeader
        className="w-full"
        cover={<div className="gradient-night size-full" />}
        avatar={
          <span className="flex size-full items-center justify-center bg-slate-100 text-lg font-bold text-slate-600">
            {t.initials}
          </span>
        }
      >
        <h3 className="text-lg font-bold text-gray-900">{t.custom}</h3>
        <p className="mt-1 text-sm text-gray-500">{t.customBody}</p>
      </CoverHeader>
    </div>
  );
}
