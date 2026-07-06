import { HighlightPanel, InfoRow, MiniStat } from "@avero/react";
import { FileCheck, Shield, Star, Trophy } from "lucide-react";

const icon = "size-4 sm:size-[18px]";

export default function StatsAchievementsDemo() {
  return (
    <div className="flex w-full flex-wrap items-start gap-6">
      <div className="flex w-full max-w-sm flex-col gap-2.5 rounded-2xl border border-gray-100 bg-white p-5 sm:gap-3">
        <HighlightPanel label="رتبه در دورلنسر" value="-" />
        <InfoRow
          label="گواهینامه‌ها"
          value="0 عدد"
          icon={<FileCheck className={icon} />}
          tone="emerald"
        />
        <InfoRow label="نشان‌ها" value="0 عدد" icon={<Trophy className={icon} />} tone="purple" />
        <InfoRow label="مهارت تأیید شده" value="0 عدد" icon={<Shield className={icon} />} />
      </div>
      <div className="grid w-full max-w-xs grid-cols-2 gap-3 rounded-3xl bg-white p-6">
        <MiniStat label="تعداد خدمات" value="1" />
        <MiniStat
          label="امتیاز رضایت"
          value="0.00"
          icon={<Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />}
        />
      </div>
    </div>
  );
}
