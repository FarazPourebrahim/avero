import { Avatar, DashboardShell, SidebarNav, SidebarNavItem, StatCard } from "@avero/react";
import { Bell, LayoutDashboard, LogOut, Menu, User } from "lucide-react";

export default function DashboardShellLearnerDemo() {
  return (
    <div className="bg-background w-full rounded-2xl">
      <DashboardShell
        sidebar={
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
        }
        mobileBar={
          <div className="flex items-center justify-between gap-x-2">
            <div className="flex min-w-0 items-center gap-x-3">
              <Avatar name="سارا محمدی" size="lg" className="rounded-2xl" />
              <span className="truncate text-xs font-semibold text-gray-800">پنل کاربری</span>
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
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold text-gray-900">پیشخوان من</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <StatCard label="دوره‌ها" value={3} />
            <StatCard label="گواهی‌ها" value={2} />
            <StatCard label="ساعت یادگیری" value={15} />
          </div>
        </div>
      </DashboardShell>
    </div>
  );
}
