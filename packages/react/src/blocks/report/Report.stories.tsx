import type { Meta, StoryObj } from "@storybook/react-vite";
import { ReportAction, ReportCard } from "./Report.js";

const meta: Meta<typeof ReportAction> = {
  title: "Blocks/Report",
  component: ReportAction,
};

export default meta;
type Story = StoryObj<typeof ReportAction>;

export const Actions: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <ReportAction />
      <ReportAction variant="text" />
      <ReportAction variant="soft" />
    </div>
  ),
};

export const Panel: Story = {
  render: () => (
    <div className="max-w-sm">
      <ReportCard />
    </div>
  ),
};
