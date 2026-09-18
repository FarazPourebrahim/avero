import { StatStrip, StatTile } from "@averoui/react";
import { BookOpen, GraduationCap, Star, Users } from "lucide-react";

const icon = "size-5 sm:size-6";

export default function StatsProfileDemo() {
  return (
    <div className="w-full">
      <StatStrip>
        <StatTile label="سابقه تدریس" value="3 سال" icon={<GraduationCap className={icon} />} />
        <StatTile
          label="تعداد دوره‌ها"
          value="4"
          icon={<BookOpen className={icon} />}
          tone="purple"
        />
        <StatTile
          label="شرکت‌کنندگان"
          value="120"
          icon={<Users className={icon} />}
          tone="emerald"
        />
        <StatTile
          label="بدون میانگین"
          value="—"
          icon={<Star className={`${icon} text-slate-300`} />}
          tone="amber"
        />
      </StatStrip>
    </div>
  );
}
