import type { Meta, StoryObj } from "@storybook/react-vite";
import { Briefcase, FileText, MessageSquare, Sparkles } from "lucide-react";
import { PillTab, PillTabs } from "./PillTabs.js";

const meta = {
  title: "Navigation/PillTabs",
  component: PillTabs,
  args: { "aria-label": "بخش‌های پروفایل" },
} satisfies Meta<typeof PillTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Profile: Story = {
  render: (args) => (
    <PillTabs {...args}>
      <PillTab href="#about" current icon={<FileText />}>
        درباره من
      </PillTab>
      <PillTab href="#service" icon={<Briefcase />}>
        خدمات (1)
      </PillTab>
      <PillTab href="#portfolio" icon={<Sparkles />}>
        نمونه کار (4)
      </PillTab>
      <PillTab href="#comments" icon={<MessageSquare />}>
        نظرات (0)
      </PillTab>
    </PillTabs>
  ),
};
