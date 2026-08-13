import type { Meta, StoryObj } from "@storybook/react-vite";
import { HighlightPanel, InfoRow } from "../../components/stat/index.js";
import { StarIcon } from "../../icons/internalIcons.js";
import { AchievementsPanel } from "./AchievementsPanel.js";

const meta: Meta<typeof AchievementsPanel> = {
  title: "Blocks/AchievementsPanel",
  component: AchievementsPanel,
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AchievementsPanel>;

export const RankAndAchievements: Story = {
  render: () => (
    <AchievementsPanel
      title="رتبه و دستاوردها"
      icon={<StarIcon className="size-4 shrink-0 text-amber-500" />}
    >
      <HighlightPanel label="رتبه در جدول امتیازها" value="-" />
      <InfoRow label="گواهی‌ها" value="0 عدد" tone="emerald" icon={<StarIcon />} />
      <InfoRow label="نشان‌ها" value="0 عدد" tone="purple" icon={<StarIcon />} />
      <InfoRow label="آزمون‌ها" value="0 عدد" tone="blue" icon={<StarIcon />} />
    </AchievementsPanel>
  ),
};
