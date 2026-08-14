import { StatCard } from "@avero/react";
import { Award, BookOpen, Calendar, Trophy, Zap } from "lucide-react";

const icon = "size-4 sm:size-[18px]";

export default function StatsDashboardDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
      <StatCard label="دوره‌ها" value="0" icon={<BookOpen className={icon} />} tone="blue" />
      <StatCard label="جلسه‌ها" value="0" icon={<Calendar className={icon} />} tone="purple" />
      <StatCard label="تمرین فعال" value="0" icon={<Zap className={icon} />} tone="amber" />
      <StatCard label="گواهی" value="0" icon={<Award className={icon} />} tone="emerald" />
      <StatCard label="نشان‌ها" value="0" icon={<Trophy className={icon} />} tone="rose" />
    </div>
  );
}
