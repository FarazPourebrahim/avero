import type { Meta, StoryObj } from "@storybook/react-vite";
import { Award, BookOpen, FileText, MessageSquare } from "lucide-react";
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
      <PillTab href="#courses" icon={<BookOpen />}>
        دوره‌ها (3)
      </PillTab>
      <PillTab href="#certificates" icon={<Award />}>
        گواهی‌ها (2)
      </PillTab>
      <PillTab href="#comments" icon={<MessageSquare />}>
        دیدگاه‌ها (0)
      </PillTab>
    </PillTabs>
  ),
};
