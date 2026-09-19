"use client";

import { PillTab, PillTabs } from "@averoui/react";
import { Award, BookOpen, FileText, MessageSquare } from "lucide-react";
import { useCopy } from "../copy";

export default function PillTabsProfileDemo() {
  const t = useCopy({
    fa: {
      label: "بخش‌های پروفایل",
      about: "درباره من",
      courses: "دوره‌ها (۳)",
      certificates: "گواهی‌ها (۲)",
      comments: "دیدگاه‌ها (۰)",
    },
    en: {
      label: "Profile sections",
      about: "About me",
      courses: "Courses (3)",
      certificates: "Certificates (2)",
      comments: "Comments (0)",
    },
  });

  return (
    <PillTabs aria-label={t.label}>
      <PillTab href="#about" current icon={<FileText />}>
        {t.about}
      </PillTab>
      <PillTab href="#courses" icon={<BookOpen />}>
        {t.courses}
      </PillTab>
      <PillTab href="#certificates" icon={<Award />}>
        {t.certificates}
      </PillTab>
      <PillTab href="#comments" icon={<MessageSquare />}>
        {t.comments}
      </PillTab>
    </PillTabs>
  );
}
