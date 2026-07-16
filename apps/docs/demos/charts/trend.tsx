"use client";

import { ChartCard, LineChart, chartPalette } from "@avero/charts";

const DATA = [4, 7, 3, 9, 6, 11, 8].map((views, index) => ({ name: `${index + 1}`, views }));

export default function ChartsTrendDemo() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4 sm:flex-row">
      <div className="flex-1">
        <ChartCard title="روند کلی" size="sm">
          <LineChart
            data={DATA}
            series={[{ dataKey: "views", name: "بازدید", color: chartPalette.views }]}
            label="روند بازدید"
          />
        </ChartCard>
      </div>
      <div className="flex-1">
        <ChartCard
          title="روند کلی"
          size="sm"
          empty
          emptyState={<p className="text-xs text-gray-300">داده‌ای برای نمایش وجود ندارد</p>}
        >
          <LineChart data={[]} series={[{ dataKey: "views" }]} />
        </ChartCard>
      </div>
    </div>
  );
}
