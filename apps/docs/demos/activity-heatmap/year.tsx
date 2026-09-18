import { ActivityHeatmap, type ActivityDay } from "@averoui/react";

/** A deterministic pseudo-random series keeps the demo stable between builds. */
function year(): ActivityDay[] {
  const start = new Date(2025, 8, 8);
  let seed = 7;
  return Array.from({ length: 369 }, (_, index) => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    const roll = seed % 100;
    return {
      date: new Date(start.getFullYear(), start.getMonth(), start.getDate() + index),
      count: roll > 78 ? roll % 9 : 0,
    };
  });
}

export default function ActivityHeatmapYearDemo() {
  return (
    <div className="w-full rounded-2xl border border-gray-100 p-3.5 sm:p-5">
      <div className="mb-3 flex flex-col justify-between gap-2 sm:mb-4 sm:flex-row sm:items-center">
        <h3 className="text-xs font-bold text-gray-800 sm:text-sm">نقشه فعالیت</h3>
        <span className="text-2xs text-gray-400 sm:text-xs">۱۲ ماه گذشته</span>
      </div>
      <ActivityHeatmap days={year()} />
    </div>
  );
}
