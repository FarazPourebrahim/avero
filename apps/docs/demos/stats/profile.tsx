"use client";

import { StatStrip, StatTile } from "@averoui/react";
import { BookOpen, GraduationCap, Star, Users } from "lucide-react";
import { useCopy } from "../copy";

const icon = "size-5 sm:size-6";

export default function StatsProfileDemo() {
  const t = useCopy({
    fa: {
      teaching: "سابقه تدریس",
      teachingValue: "۳ سال",
      courses: "تعداد دوره‌ها",
      participants: "شرکت‌کنندگان",
      noAverage: "بدون میانگین",
    },
    en: {
      teaching: "Teaching experience",
      teachingValue: "3 years",
      courses: "Courses",
      participants: "Participants",
      noAverage: "No average yet",
    },
  });

  return (
    <div className="w-full">
      <StatStrip>
        <StatTile
          label={t.teaching}
          value={t.teachingValue}
          icon={<GraduationCap className={icon} />}
        />
        <StatTile label={t.courses} value="4" icon={<BookOpen className={icon} />} tone="purple" />
        <StatTile
          label={t.participants}
          value="120"
          icon={<Users className={icon} />}
          tone="emerald"
        />
        <StatTile
          label={t.noAverage}
          value="—"
          icon={<Star className={`${icon} text-slate-300`} />}
          tone="amber"
        />
      </StatStrip>
    </div>
  );
}
