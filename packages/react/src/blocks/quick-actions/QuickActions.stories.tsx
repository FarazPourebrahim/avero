import type { Meta, StoryObj } from "@storybook/react-vite";
import { ActionTile } from "../../components/action-tile/index.js";
import { PaperPlaneSolidIcon } from "../../icons/publicIcons.js";
import { QuickActions } from "./QuickActions.js";

const meta: Meta<typeof QuickActions> = {
  title: "Blocks/QuickActions",
  component: QuickActions,
};

export default meta;
type Story = StoryObj<typeof QuickActions>;

const ACTIONS = [
  { label: "افزودن خدمت", tone: "blue" },
  { label: "افزودن نمونه‌کار", tone: "purple" },
  { label: "ثبت استوری", tone: "amber" },
  { label: "ویرایش پروفایل", tone: "emerald" },
  { label: "پیام‌ها", tone: "rose" },
  { label: "تنظیمات", tone: "indigo" },
] as const;

export const Dashboard: Story = {
  render: () => (
    <QuickActions label="دسترسی سریع">
      {ACTIONS.map((action) => (
        <ActionTile key={action.label} tone={action.tone} icon={<PaperPlaneSolidIcon size={18} />}>
          {action.label}
        </ActionTile>
      ))}
    </QuickActions>
  ),
};

export const FourColumns: Story = {
  render: () => (
    <QuickActions columns={4}>
      {ACTIONS.slice(0, 4).map((action) => (
        <ActionTile key={action.label} tone={action.tone} icon={<PaperPlaneSolidIcon size={18} />}>
          {action.label}
        </ActionTile>
      ))}
    </QuickActions>
  ),
};
