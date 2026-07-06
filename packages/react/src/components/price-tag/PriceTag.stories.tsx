import type { Meta, StoryObj } from "@storybook/react-vite";
import { PriceTag } from "./PriceTag.js";

const meta: Meta<typeof PriceTag> = {
  title: "Data display/PriceTag",
  component: PriceTag,
  args: { amount: 20_000_000 },
};

export default meta;
type Story = StoryObj<typeof PriceTag>;

export const Display: Story = {
  render: (args) => (
    <div className="max-w-sm rounded-3xl border border-slate-100 bg-white p-6 shadow-xs">
      <div className="mb-4 text-xs font-bold text-slate-400">قیمت پایه خدمت</div>
      <PriceTag {...args} />
    </div>
  ),
};

export const Inline: Story = {
  args: { variant: "inline" },
  render: (args) => (
    <div className="flex max-w-sm items-center justify-between border-t border-gray-100 bg-white p-4 pt-3">
      <PriceTag {...args} />
    </div>
  ),
};

export const Compact: Story = {
  args: { variant: "compact", amount: 35_000_000 },
  render: (args) => (
    <div className="max-w-xs space-y-3 rounded-2xl bg-white p-4">
      <h5 className="truncate text-xs font-bold text-slate-900">
        سئو SEO سایت با رویکرد فروش و مارکتینگ
      </h5>
      <PriceTag {...args} />
    </div>
  ),
};
