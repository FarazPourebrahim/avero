import type { Meta, StoryObj } from "@storybook/react-vite";
import { Eye, FileText, House, LogOut, Settings } from "lucide-react";
import { SidebarNav, SidebarNavItem } from "./SidebarNav.js";

const meta = {
  title: "Navigation/SidebarNav",
  component: SidebarNav,
  args: { "aria-label": "منوی داشبورد" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
  render: (args) => (
    <SidebarNav {...args}>
      <SidebarNavItem href="#dashboard" current icon={<House />}>
        پیشخوان
      </SidebarNavItem>
      <SidebarNavItem href="#profile" icon={<Eye />}>
        مشاهده پروفایل
      </SidebarNavItem>
      <SidebarNavItem href="#settings" icon={<Settings />}>
        تنظیمات پروفایل
      </SidebarNavItem>
      <SidebarNavItem href="#certificates" icon={<FileText />}>
        گواهی‌های من
      </SidebarNavItem>
      <SidebarNavItem tone="danger" icon={<LogOut />}>
        خروج از حساب
      </SidebarNavItem>
    </SidebarNav>
  ),
};
