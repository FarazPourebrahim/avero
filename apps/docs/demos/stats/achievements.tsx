"use client";

import { HighlightPanel, InfoRow, MiniStat } from "@averoui/react";
import { FileCheck, Shield, Star, Trophy } from "lucide-react";
import { useCopy } from "../copy";

const icon = "size-4 sm:size-[18px]";

export default function StatsAchievementsDemo() {
  const t = useCopy({
    fa: {
      rank: "رتبه در جدول امتیازها",
      certificates: "گواهی‌ها",
      badges: "نشان‌ها",
      verified: "مهارت تأییدشده",
      count: "۰ عدد",
      courses: "تعداد دوره‌ها",
      rating: "امتیاز شرکت‌کنندگان",
    },
    en: {
      rank: "Leaderboard position",
      certificates: "Certificates",
      badges: "Badges",
      verified: "Verified skills",
      count: "0",
      courses: "Courses",
      rating: "Participant rating",
    },
  });

  return (
    <div className="flex w-full flex-wrap items-start gap-6">
      <div className="flex w-full max-w-sm flex-col gap-2.5 rounded-2xl border border-gray-100 bg-white p-5 sm:gap-3">
        <HighlightPanel label={t.rank} value="-" />
        <InfoRow
          label={t.certificates}
          value={t.count}
          icon={<FileCheck className={icon} />}
          tone="emerald"
        />
        <InfoRow
          label={t.badges}
          value={t.count}
          icon={<Trophy className={icon} />}
          tone="purple"
        />
        <InfoRow label={t.verified} value={t.count} icon={<Shield className={icon} />} />
      </div>
      <div className="grid w-full max-w-xs grid-cols-2 gap-3 rounded-3xl bg-white p-6">
        <MiniStat label={t.courses} value="3" />
        <MiniStat
          label={t.rating}
          value="4.80"
          icon={<Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />}
        />
      </div>
    </div>
  );
}
