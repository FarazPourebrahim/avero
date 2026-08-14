import type { Meta, StoryObj } from "@storybook/react-vite";
import { AreaChart } from "./AreaChart.js";
import { ChartCard } from "./ChartCard.js";
import { LineChart } from "./LineChart.js";
import { chartPalette } from "../theme.js";

const DAYS = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];

// A fixed series keeps the visual baselines stable.
const DATA = DAYS.map((name, index) => ({
  name,
  views: [4, 7, 3, 9, 6, 11, 8][index],
  likes: [1, 3, 0, 4, 2, 5, 3][index],
}));

const SERIES = [
  { dataKey: "views", name: "بازدید", color: chartPalette.views },
  { dataKey: "likes", name: "لایک", color: chartPalette.likes },
];

const meta: Meta = {
  title: "Charts/ChartCard",
};

export default meta;
type Story = StoryObj;

export const Analytics: Story = {
  render: () => (
    <div className="max-w-xl">
      <ChartCard
        title="آنالیتیکس دوره‌ها"
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
        <AreaChart data={DATA} series={SERIES} label="آنالیتیکس دوره‌ها در هفته گذشته" />
      </ChartCard>
    </div>
  ),
};

export const Trend: Story = {
  render: () => (
    <div className="max-w-xl">
      <ChartCard title="روند کلی" size="sm">
        <LineChart data={DATA} series={[SERIES[0]!]} label="روند بازدید" />
      </ChartCard>
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="max-w-xl">
      <ChartCard
        title="روند کلی"
        size="sm"
        empty
        emptyState={<p className="text-xs text-gray-300">داده‌ای برای نمایش وجود ندارد</p>}
      >
        <LineChart data={[]} series={SERIES} />
      </ChartCard>
    </div>
  ),
};
