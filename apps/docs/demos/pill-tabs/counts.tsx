"use client";

import { PillTab, PillTabs } from "@averoui/react";
import { Award, BookOpen, FileText, MessageSquare, Star, Users } from "lucide-react";
import { useCopy } from "../copy";

const ICONS = {
  overview: <FileText />,
  sessions: <BookOpen />,
  reviews: <MessageSquare />,
  students: <Users />,
  certificates: <Award />,
  favorites: <Star />,
};

export default function PillTabsCountsDemo() {
  const t = useCopy({
    fa: {
      label: "بخش‌های دوره",
      tabs: {
        overview: "معرفی",
        sessions: "جلسه‌ها (۲۴)",
        reviews: "دیدگاه‌ها (۱۸)",
        students: "دانشجویان (۳۱۲)",
        certificates: "گواهی‌ها",
        favorites: "علاقه‌مندی‌ها",
      },
    },
    en: {
      label: "Course sections",
      tabs: {
        overview: "Overview",
        sessions: "Sessions (24)",
        reviews: "Reviews (18)",
        students: "Students (312)",
        certificates: "Certificates",
        favorites: "Favourites",
      },
    },
  });

  return (
    <div className="w-full max-w-md">
      <PillTabs aria-label={t.label}>
        {(Object.keys(ICONS) as Array<keyof typeof ICONS>).map((key) => (
          <PillTab key={key} href={`#${key}`} current={key === "overview"} icon={ICONS[key]}>
            {t.tabs[key]}
          </PillTab>
        ))}
      </PillTabs>
    </div>
  );
}
