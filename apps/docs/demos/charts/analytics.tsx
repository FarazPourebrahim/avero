"use client";

import { AreaChart, ChartCard, chartPalette } from "@avero/charts";

const DAYS = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];

// A fixed series keeps the demo identical between builds.
const DATA = DAYS.map((name, index) => ({
  name,
  views: [4, 7, 3, 9, 6, 11, 8][index],
  likes: [1, 3, 0, 4, 2, 5, 3][index],
}));

const SERIES = [
  { dataKey: "views", name: "بازدید", color: chartPalette.views },
  { dataKey: "likes", name: "لایک", color: chartPalette.likes },
];

export default function ChartsAnalyticsDemo() {
  return (
    <div className="w-full max-w-xl">
      <ChartCard
        title="آنالیتیکس خدمات"
        actions={
          <>
            <button
              type="button"
              className="cursor-pointer rounded-lg px-2 py-1 text-[10px] font-medium text-white shadow-xs sm:px-2.5"
              style={{ backgroundColor: chartPalette.views }}
            >
              بازدید
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-lg px-2 py-1 text-[10px] font-medium text-white shadow-xs sm:px-2.5"
              style={{ backgroundColor: chartPalette.likes }}
            >
              لایک
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-lg bg-gray-50 px-2 py-1 text-[10px] font-medium text-gray-400 sm:px-2.5"
            >
              کلیک
            </button>
          </>
        }
      >
        <AreaChart data={DATA} series={SERIES} label="آنالیتیکس خدمات در هفته گذشته" />
      </ChartCard>
    </div>
  );
}
