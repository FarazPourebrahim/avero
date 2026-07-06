import type { Meta, StoryObj } from "@storybook/react-vite";
import { MatchScore } from "./MatchScore.js";

const meta: Meta<typeof MatchScore> = {
  title: "Data display/MatchScore",
  component: MatchScore,
  args: { value: 8 },
};

export default meta;
type Story = StoryObj<typeof MatchScore>;

export const Default: Story = {};

export const SuggestedProject: Story = {
  render: (args) => (
    <div className="max-w-md rounded-xl border border-gray-100 bg-white p-3 sm:p-4">
      <div className="flex items-start justify-between gap-2.5 sm:gap-3">
        <div className="min-w-0 flex-1">
          <h4 className="mb-1 truncate text-xs font-semibold text-gray-800 sm:text-sm">
            همکاری در پروژه‌های React
          </h4>
          <p className="text-2xs mb-2 truncate text-gray-500 sm:text-xs">راهکار نوین</p>
          <span className="text-3xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-400">
            freelance
          </span>
        </div>
        <MatchScore {...args} />
      </div>
    </div>
  ),
};
