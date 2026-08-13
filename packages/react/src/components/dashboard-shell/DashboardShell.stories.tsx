import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, Home, LayoutDashboard, LogOut, Menu, User } from "lucide-react";
import { Avatar } from "../avatar/Avatar.js";
import { SidebarNav, SidebarNavItem } from "../sidebar-nav/SidebarNav.js";
import { StatCard } from "../stat/Stat.js";
import { DashboardShell } from "./DashboardShell.js";

const meta: Meta<typeof DashboardShell> = {
  title: "Layout/DashboardShell",
  component: DashboardShell,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof DashboardShell>;

function Greeting() {
  return (
    <div className="relative flex w-full items-center gap-x-3">
      <Avatar name="فراز" size="xl" className="rounded-3xl" />
      <div className="flex flex-col items-start gap-y-2 text-sm font-normal">
        <span>ظهر بخیر</span>
        <span>۱۲ مهر</span>
      </div>
      <div className="ms-auto flex items-center gap-x-2">
        <span className="flex items-center justify-center rounded-xl border border-zinc-200/50 bg-zinc-50 p-2 text-zinc-600">
          <Home className="size-5" />
        </span>
        <span className="flex items-center justify-center rounded-xl border border-zinc-200/50 bg-zinc-50 p-2 text-zinc-600">
          <Bell className="size-5" />
        </span>
      </div>
    </div>
  );
}

export const Learner: Story = {
  render: (args) => (
    <div className="bg-background min-h-screen">
      <DashboardShell
        {...args}
        sidebar={
          <>
            <Greeting />
            <SidebarNav aria-label="منوی داشبورد">
              <SidebarNavItem href="#" icon={<LayoutDashboard />} current>
                پیشخوان
              </SidebarNavItem>
              <SidebarNavItem href="#" icon={<User />}>
                مشاهده پروفایل
              </SidebarNavItem>
              <SidebarNavItem href="#" icon={<Bell />}>
                تاریخچه اعلان‌ها
              </SidebarNavItem>
              <SidebarNavItem icon={<LogOut />} tone="danger">
                خروج از حساب
              </SidebarNavItem>
            </SidebarNav>
          </>
        }
        mobileBar={
          <div className="flex items-center justify-between gap-x-2">
            <div className="flex min-w-0 items-center gap-x-3">
              <Avatar name="فراز" size="lg" className="rounded-2xl" />
              <div className="flex min-w-0 flex-col items-start gap-y-0.5 text-xs font-normal sm:text-sm">
                <span className="truncate font-semibold text-gray-800">Faraz Pourebrahim</span>
                <span className="text-gray-500">پنل کاربری</span>
              </div>
            </div>
            <button
              type="button"
              aria-label="باز کردن منو"
              className="bg-primary rounded-xl p-2 text-white shadow-xs"
            >
              <Menu className="size-5" />
            </button>
          </div>
        }
      >
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl md:text-3xl">
            پیشخوان من
          </h1>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
            <StatCard label="دوره‌ها" value={3} />
            <StatCard label="گواهی‌ها" value={1} />
            <StatCard label="ساعت یادگیری" value={15} />
          </div>
        </div>
      </DashboardShell>
    </div>
  ),
};
