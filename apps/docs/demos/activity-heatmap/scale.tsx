import { ActivityHeatmap, type ActivityDay } from "@averoui/react";

/** Eight weeks of steadily busier days, so the five shades appear in order. */
function weeks(): ActivityDay[] {
  const start = new Date(2026, 6, 4);
  return Array.from({ length: 56 }, (_, index) => ({
    date: new Date(start.getFullYear(), start.getMonth(), start.getDate() + index),
    count: index % 7 === 0 ? 0 : Math.ceil(index / 8),
  }));
}

export default function ActivityHeatmapScaleDemo() {
  return (
    <div className="w-full rounded-2xl border border-gray-100 p-3.5 sm:p-5">
      <ActivityHeatmap days={weeks()} maxCount={8} legend={false} weekStartsOn={0} />
    </div>
  );
}
