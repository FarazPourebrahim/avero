import { AchievementsPanel, HighlightPanel, InfoRow } from "@avero/react";

export default function AchievementsPanelRankDemo() {
  return (
    <div className="w-full max-w-sm">
      <AchievementsPanel title="رتبه و دستاوردها">
        <HighlightPanel label="رتبه در دورلنسر" value="-" />
        <InfoRow label="گواهینامه‌ها" value="0 عدد" tone="emerald" />
        <InfoRow label="نشان‌ها" value="0 عدد" tone="purple" />
        <InfoRow label="آزمون‌ها" value="0 عدد" tone="blue" />
      </AchievementsPanel>
    </div>
  );
}
