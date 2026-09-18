import { ActivityHeatmap, EmptyState } from "@averoui/react";
import { CalendarOff } from "lucide-react";

export default function ActivityHeatmapEmptyDemo() {
  return (
    <div className="w-full rounded-2xl border border-gray-100 p-3.5 sm:p-5">
      <ActivityHeatmap
        days={[]}
        emptyState={
          <EmptyState variant="circle" icon={<CalendarOff />}>
            هنوز فعالیتی ثبت نشده است. پس از نخستین جلسه، نقشه فعالیت اینجا پر می‌شود.
          </EmptyState>
        }
      />
    </div>
  );
}
