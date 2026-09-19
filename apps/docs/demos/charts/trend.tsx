"use client";

import { ChartCard, LineChart, chartPalette } from "@averoui/charts";
import { useCopy } from "../copy";

const DATA = [4, 7, 3, 9, 6, 11, 8].map((views, index) => ({ name: `${index + 1}`, views }));

export default function ChartsTrendDemo() {
  const t = useCopy({
    fa: {
      title: "روند کلی",
      views: "بازدید",
      label: "روند بازدید",
      empty: "داده‌ای برای نمایش وجود ندارد",
    },
    en: {
      title: "Overall trend",
      views: "Views",
      label: "View trend",
      empty: "Nothing to show yet",
    },
  });

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4 sm:flex-row">
      <div className="flex-1">
        <ChartCard title={t.title} size="sm">
          <LineChart
            data={DATA}
            series={[{ dataKey: "views", name: t.views, color: chartPalette.views }]}
            label={t.label}
          />
        </ChartCard>
      </div>
      <div className="flex-1">
        <ChartCard
          title={t.title}
          size="sm"
          empty
          emptyState={<p className="text-xs text-gray-300">{t.empty}</p>}
        >
          <LineChart data={[]} series={[{ dataKey: "views" }]} />
        </ChartCard>
      </div>
    </div>
  );
}
