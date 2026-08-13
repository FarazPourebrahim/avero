import type { Meta, StoryObj } from "@storybook/react-vite";
import { Award, BookOpen, ClipboardList } from "lucide-react";
import { SegmentedControl, SegmentedControlItem } from "./SegmentedControl.js";

const meta = {
  title: "Navigation/SegmentedControl",
  component: SegmentedControl,
  args: { "aria-label": "نوع گزارش", defaultValue: "courses" },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Analytics: Story = {
  render: (args) => (
    <SegmentedControl {...args}>
      <SegmentedControlItem value="courses">
        <BookOpen className="size-3.5 sm:size-4" aria-hidden />
        دوره‌ها
      </SegmentedControlItem>
      <SegmentedControlItem value="certificates">
        <Award className="size-3.5 sm:size-4" aria-hidden />
        گواهی‌ها
      </SegmentedControlItem>
      <SegmentedControlItem value="assignments">
        <ClipboardList className="size-3.5 sm:size-4" aria-hidden />
        تمرین‌ها
      </SegmentedControlItem>
    </SegmentedControl>
  ),
};
