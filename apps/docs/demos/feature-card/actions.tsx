import { ActionTile } from "@averoui/react";
import { Award, BookOpen, CalendarPlus, Shield, TrendingUp, Zap } from "lucide-react";

const icon = "size-4 sm:size-5";

export default function ActionTilesDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
      <ActionTile tone="blue" icon={<BookOpen className={icon} />}>
        افزودن دوره
      </ActionTile>
      <ActionTile tone="purple" icon={<CalendarPlus className={icon} />}>
        افزودن جلسه
      </ActionTile>
      <ActionTile tone="amber" icon={<Zap className={icon} />}>
        ساخت تمرین
      </ActionTile>
      <ActionTile tone="emerald" icon={<Award className={icon} />}>
        شرکت در آزمون
      </ActionTile>
      <ActionTile tone="rose" icon={<TrendingUp className={icon} />}>
        ارتقای اشتراک
      </ActionTile>
      <ActionTile tone="slate" icon={<Shield className={icon} />}>
        ویرایش پروفایل
      </ActionTile>
    </div>
  );
}
