"use client";

import { StatCard } from "@averoui/react";
import { Award, BookOpen, Calendar, Trophy, Zap } from "lucide-react";
import { useCopy } from "../copy";

const icon = "size-4 sm:size-[18px]";

export default function StatsDashboardDemo() {
  const t = useCopy({
    fa: {
      courses: "دوره‌ها",
      sessions: "جلسه‌ها",
      active: "تمرین فعال",
      certificates: "گواهی",
      badges: "نشان‌ها",
    },
    en: {
      courses: "Courses",
      sessions: "Sessions",
      active: "Active exercises",
      certificates: "Certificates",
      badges: "Badges",
    },
  });

  return (
    <div className="grid w-full grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
      <StatCard label={t.courses} value="0" icon={<BookOpen className={icon} />} tone="blue" />
      <StatCard label={t.sessions} value="0" icon={<Calendar className={icon} />} tone="purple" />
      <StatCard label={t.active} value="0" icon={<Zap className={icon} />} tone="amber" />
      <StatCard label={t.certificates} value="0" icon={<Award className={icon} />} tone="emerald" />
      <StatCard label={t.badges} value="0" icon={<Trophy className={icon} />} tone="rose" />
    </div>
  );
}
