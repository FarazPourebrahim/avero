import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rating } from "./Rating.js";

const meta: Meta<typeof Rating> = {
  title: "Data display/Rating",
  component: Rating,
  args: { value: 4.8 },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {};

export const StatChip: Story = {
  args: { value: 0, label: "امتیاز:" },
  render: (args) => (
    <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
      <Rating
        {...args}
        className="gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-1.5"
      />
    </div>
  ),
};

export const ProviderStat: Story = {
  args: { value: 5, size: "sm", fractionDigits: 0 },
  render: (args) => (
    <div className="w-40 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center">
      <span className="text-3xs block font-bold text-slate-400">امتیاز شرکت‌کنندگان</span>
      <Rating {...args} className="text-base font-black text-slate-900" />
    </div>
  ),
};
