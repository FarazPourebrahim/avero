"use client";

import { AchievementsPanel, HighlightPanel, InfoRow } from "@averoui/react";
import { useCopy } from "../copy";

export default function AchievementsPanelRankDemo() {
  const t = useCopy({
    fa: {
      title: "رتبه و دستاوردها",
      rank: "رتبه در جدول امتیازها",
      certificates: "گواهی‌ها",
      badges: "نشان‌ها",
      tests: "آزمون‌ها",
      count: "۰ عدد",
    },
    en: {
      title: "Rank and achievements",
      rank: "Leaderboard position",
      certificates: "Certificates",
      badges: "Badges",
      tests: "Tests",
      count: "0",
    },
  });

  return (
    <div className="w-full max-w-sm">
      <AchievementsPanel title={t.title}>
        <HighlightPanel label={t.rank} value="-" />
        <InfoRow label={t.certificates} value={t.count} tone="emerald" />
        <InfoRow label={t.badges} value={t.count} tone="purple" />
        <InfoRow label={t.tests} value={t.count} tone="blue" />
      </AchievementsPanel>
    </div>
  );
}
