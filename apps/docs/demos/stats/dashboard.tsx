import { StatCard } from "@avero/react";
import { Award, Briefcase, Eye, Trophy, Zap } from "lucide-react";

const icon = "size-4 sm:size-[18px]";

export default function StatsDashboardDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
      <StatCard label="خدمات" value="0" icon={<Briefcase className={icon} />} tone="blue" />
      <StatCard label="نمونه‌کار" value="0" icon={<Eye className={icon} />} tone="purple" />
      <StatCard label="استوری فعال" value="0" icon={<Zap className={icon} />} tone="amber" />
      <StatCard label="گواهینامه" value="0" icon={<Award className={icon} />} tone="emerald" />
      <StatCard label="نشان‌ها" value="0" icon={<Trophy className={icon} />} tone="rose" />
    </div>
  );
}
