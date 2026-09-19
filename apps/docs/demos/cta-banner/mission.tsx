"use client";

import { CtaBanner } from "@averoui/react";
import { useCopy } from "../copy";

export default function CtaBannerMissionDemo() {
  const t = useCopy({
    fa: {
      eyebrow: "مأموریت ما",
      title: "یادگیری بدون مرز، برای همه",
      body: "هدف ما فقط برگزاری چند دوره نیست؛ می‌خواهیم جایی بسازیم که هر کسی بتواند با سرعت خودش مهارتی تازه بیاموزد و آن را در کار و زندگی به کار بگیرد.",
    },
    en: {
      eyebrow: "Our mission",
      title: "Learning without borders, for everyone",
      body: "We are not here just to run a few courses. We want to build somewhere anyone can pick up a new skill at their own pace, and put it to use in their work and their life.",
    },
  });

  return (
    <div className="w-full">
      <CtaBanner eyebrow={t.eyebrow} title={t.title}>
        {t.body}
      </CtaBanner>
    </div>
  );
}
