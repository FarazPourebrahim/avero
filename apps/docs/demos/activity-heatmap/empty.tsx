"use client";

import { ActivityHeatmap, EmptyState } from "@averoui/react";
import { CalendarOff } from "lucide-react";
import { useCopy } from "../copy";

export default function ActivityHeatmapEmptyDemo() {
  const t = useCopy({
    fa: { empty: "هنوز فعالیتی ثبت نشده است. پس از نخستین جلسه، نقشه فعالیت اینجا پر می‌شود." },
    en: { empty: "No activity yet. The map fills in after your first session." },
  });

  return (
    <div className="w-full rounded-2xl border border-gray-100 p-3.5 sm:p-5">
      <ActivityHeatmap
        days={[]}
        emptyState={
          <EmptyState variant="circle" icon={<CalendarOff />}>
            {t.empty}
          </EmptyState>
        }
      />
    </div>
  );
}
