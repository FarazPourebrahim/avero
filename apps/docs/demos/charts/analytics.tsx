"use client";

import { AreaChart, ChartCard, chartPalette } from "@averoui/charts";
import { useCopy } from "../copy";

// A fixed series keeps the demo identical between builds.
const VIEWS = [4, 7, 3, 9, 6, 11, 8];
const LIKES = [1, 3, 0, 4, 2, 5, 3];

export default function ChartsAnalyticsDemo() {
  const t = useCopy({
    fa: {
      days: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"],
      title: "آنالیتیکس دوره‌ها",
      views: "بازدید",
      likes: "لایک",
      clicks: "کلیک",
      label: "آنالیتیکس دوره‌ها در هفته گذشته",
    },
    en: {
      days: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
      title: "Course analytics",
      views: "Views",
      likes: "Likes",
      clicks: "Clicks",
      label: "Course analytics over the past week",
    },
  });

  const data = t.days.map((name, index) => ({
    name,
    views: VIEWS[index],
    likes: LIKES[index],
  }));

  const series = [
    { dataKey: "views", name: t.views, color: chartPalette.views },
    { dataKey: "likes", name: t.likes, color: chartPalette.likes },
  ];

  return (
    <div className="w-full max-w-xl">
      <ChartCard
        title={t.title}
        actions={
          <>
            <button
              type="button"
              className="cursor-pointer rounded-lg px-2 py-1 text-[10px] font-medium text-white shadow-xs sm:px-2.5"
              style={{ backgroundColor: chartPalette.views }}
            >
              {t.views}
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-lg px-2 py-1 text-[10px] font-medium text-white shadow-xs sm:px-2.5"
              style={{ backgroundColor: chartPalette.likes }}
            >
              {t.likes}
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-lg bg-gray-50 px-2 py-1 text-[10px] font-medium text-gray-400 sm:px-2.5"
            >
              {t.clicks}
            </button>
          </>
        }
      >
        <AreaChart data={data} series={series} label={t.label} />
      </ChartCard>
    </div>
  );
}
