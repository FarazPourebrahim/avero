import { StatStrip, StatTile } from "@avero/react";
import { Briefcase, CircleCheckBig, Layers, Star } from "lucide-react";

const icon = "size-5 sm:size-6";

export default function StatsProfileDemo() {
  return (
    <div className="w-full">
      <StatStrip>
        <StatTile label="مدت تجربه کاری" value="3 سال" icon={<Briefcase className={icon} />} />
        <StatTile
          label="تعداد نمونه‌کار"
          value="4"
          icon={<Layers className={icon} />}
          tone="purple"
        />
        <StatTile
          label="تعداد خدمات"
          value="1"
          icon={<CircleCheckBig className={icon} />}
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
