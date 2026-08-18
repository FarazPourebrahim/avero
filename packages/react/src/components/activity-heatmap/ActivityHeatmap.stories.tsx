import type { Meta, StoryObj } from "@storybook/react-vite";
import { ActivityHeatmap, type ActivityDay } from "./ActivityHeatmap.js";

/** A deterministic pseudo-random series renders the same year on every load. */
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

const meta: Meta<typeof ActivityHeatmap> = {
  title: "Data display/ActivityHeatmap",
  component: ActivityHeatmap,
};

export default meta;
type Story = StoryObj<typeof ActivityHeatmap>;

export const Year: Story = {
  args: { days: year() },
  render: (args) => (
    <div className="max-w-3xl rounded-2xl border border-gray-100 bg-white p-3.5 sm:p-5">
      <div className="mb-3 flex flex-col justify-between gap-2 sm:mb-4 sm:flex-row sm:items-center">
        <h3 className="text-xs font-bold text-gray-800 sm:text-sm">نقشه فعالیت</h3>
        <span className="text-2xs text-gray-400 sm:text-xs">۱۲ ماه گذشته</span>
      </div>
      <ActivityHeatmap {...args} />
    </div>
  ),
};

export const Empty: Story = {
  args: {
    days: [],
    emptyState: (
      <p className="py-8 text-center text-xs text-gray-400">هنوز فعالیتی ثبت نشده است.</p>
    ),
  },
  render: (args) => (
    <div className="max-w-3xl rounded-2xl border border-gray-100 bg-white p-3.5 sm:p-5">
      <ActivityHeatmap {...args} />
    </div>
  ),
};
