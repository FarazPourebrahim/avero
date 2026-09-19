"use client";

import { Eyebrow, Text } from "@averoui/react";
import { useCopy } from "../copy";

export default function TypographyTextDemo() {
  const t = useCopy({
    fa: {
      eyebrow: "مدرس دوره",
      body: "در این دوره از اصول چیدمان و رنگ شروع می‌کنیم و قدم‌به‌قدم تا ساختن نخستین نمونه اولیه پیش می‌رویم.",
      lead: "ما با یک پرسش ساده شروع کردیم: چرا یادگیری باید دشوار باشد؟",
      muted: "چطور از یک پرسش ساده به یک مدرسه آنلاین رسیدیم ✨",
      caption: "دیدگاه‌ها پس از بررسی منتشر می‌شوند.",
    },
    en: {
      eyebrow: "Course instructor",
      body: "We start with the principles of layout and colour, then build up step by step to your first prototype.",
      lead: "We started with a simple question: why should learning be hard?",
      muted: "How one simple question turned into an online school ✨",
      caption: "Comments appear once they have been reviewed.",
    },
  });

  return (
    <div className="flex w-full flex-col gap-3 rounded-3xl bg-white p-6">
      <Eyebrow>{t.eyebrow}</Eyebrow>
      <Text>{t.body}</Text>
      <Text variant="lead">{t.lead}</Text>
      <Text variant="muted">{t.muted}</Text>
      <Text variant="caption">{t.caption}</Text>
    </div>
  );
}
