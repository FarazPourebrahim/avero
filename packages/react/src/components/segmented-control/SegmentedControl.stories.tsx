import type { Meta, StoryObj } from "@storybook/react-vite";
import { Briefcase, Eye, Zap } from "lucide-react";
import { SegmentedControl, SegmentedControlItem } from "./SegmentedControl.js";

const meta = {
  title: "Navigation/SegmentedControl",
  component: SegmentedControl,
  args: { "aria-label": "نوع آنالیتیکس", defaultValue: "services" },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Analytics: Story = {
  render: (args) => (
    <SegmentedControl {...args}>
      <SegmentedControlItem value="services">
        <Briefcase className="size-3.5 sm:size-4" aria-hidden />
        خدمات
      </SegmentedControlItem>
      <SegmentedControlItem value="portfolio">
        <Eye className="size-3.5 sm:size-4" aria-hidden />
        نمونه‌کار
      </SegmentedControlItem>
      <SegmentedControlItem value="stories">
        <Zap className="size-3.5 sm:size-4" aria-hidden />
        استوری
      </SegmentedControlItem>
    </SegmentedControl>
  ),
};
