import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleChip, ToggleChipGroup } from "./ToggleChipGroup.js";

const meta = {
  title: "Navigation/ToggleChipGroup",
  component: ToggleChipGroup,
  args: { "aria-label": "شاخص‌های نمودار", defaultValue: ["views", "likes"] },
} satisfies Meta<typeof ToggleChipGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChartMetrics: Story = {
  render: (args) => (
    <ToggleChipGroup {...args}>
      <ToggleChip value="views" color="var(--color-indigo-500)">
        بازدید
      </ToggleChip>
      <ToggleChip value="likes" color="var(--color-rose-500)">
        لایک
      </ToggleChip>
      <ToggleChip value="clicks" color="var(--color-emerald-500)">
        کلیک
      </ToggleChip>
      <ToggleChip value="comments" color="var(--color-amber-500)">
        نظر
      </ToggleChip>
    </ToggleChipGroup>
  ),
};
