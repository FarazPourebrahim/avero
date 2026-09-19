"use client";

import { SectionHeader } from "@averoui/react";
import { Target } from "lucide-react";
import { useCopy } from "../copy";

export default function SectionHeaderVariantsDemo() {
  const t = useCopy({
    fa: {
      story: "داستان ما",
      storySubtitle: "چطور از یک پرسش ساده به یک مدرسه آنلاین رسیدیم ✨",
      about: "درباره من",
      why: "چرا دوره‌های ما متفاوت‌اند؟",
      related: "دوره‌های مرتبط",
    },
    en: {
      story: "Our story",
      storySubtitle: "How one simple question turned into an online school ✨",
      about: "About me",
      why: "What makes our courses different",
      related: "Related courses",
    },
  });

  return (
    <div className="flex w-full flex-col gap-8 rounded-3xl bg-white p-6">
      <SectionHeader variant="accentBar" as="h3" title={t.story} subtitle={t.storySubtitle} />
      <SectionHeader variant="dot" as="h3" title={t.about} />
      <SectionHeader variant="icon" as="h3" title={t.why} icon={<Target />} />
      <SectionHeader title={t.related} as="h3" />
    </div>
  );
}
