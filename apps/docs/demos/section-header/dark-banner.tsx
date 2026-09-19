"use client";

import { Eyebrow, GlowOrbs, Heading } from "@averoui/react";
import { useCopy } from "../copy";

export default function DarkBannerDemo() {
  const t = useCopy({
    fa: {
      eyebrow: "مأموریت ما",
      heading: "یادگیری بدون مرز، برای همه",
      body: "هدف ما فقط برگزاری چند دوره نیست؛ می‌خواهیم هر کسی بتواند با سرعت خودش مهارتی تازه بیاموزد.",
    },
    en: {
      eyebrow: "Our mission",
      heading: "Learning without borders, for everyone",
      body: "We are not here just to run a few courses: we want anyone to be able to pick up a new skill at their own pace.",
    },
  });

  return (
    <div className="gradient-night relative w-full overflow-hidden rounded-3xl p-8 text-white shadow-xl md:p-12">
      <GlowOrbs />
      <div className="relative z-10 flex max-w-3xl flex-col gap-y-4">
        <Eyebrow tone="onDark">{t.eyebrow}</Eyebrow>
        <Heading size="section" as="h3" className="text-white">
          {t.heading}
        </Heading>
        <p className="text-sm leading-8 text-slate-300 md:text-base">{t.body}</p>
      </div>
    </div>
  );
}
