"use client";

import { Avatar, DashboardShell, SidebarNav, SidebarNavItem, StatCard } from "@averoui/react";
import { Bell, LayoutDashboard, LogOut, Menu, User } from "lucide-react";
import { useCopy } from "../copy";

export default function DashboardShellLearnerDemo() {
  const t = useCopy({
    fa: {
      menu: "منوی داشبورد",
      overview: "پیشخوان",
      profile: "مشاهده پروفایل",
      notifications: "تاریخچه اعلان‌ها",
      signOut: "خروج از حساب",
      name: "سارا محمدی",
      panel: "پنل کاربری",
      openMenu: "باز کردن منو",
      heading: "پیشخوان من",
      courses: "دوره‌ها",
      certificates: "گواهی‌ها",
      hours: "ساعت یادگیری",
    },
    en: {
      menu: "Dashboard menu",
      overview: "Overview",
      profile: "View profile",
      notifications: "Notification history",
      signOut: "Sign out",
      name: "Sara Mohammadi",
      panel: "Your account",
      openMenu: "Open the menu",
      heading: "My dashboard",
      courses: "Courses",
      certificates: "Certificates",
      hours: "Hours learned",
    },
  });

  return (
    <div className="bg-background w-full rounded-2xl">
      <DashboardShell
        sidebar={
          <SidebarNav aria-label={t.menu}>
            <SidebarNavItem href="#" icon={<LayoutDashboard />} current>
              {t.overview}
            </SidebarNavItem>
            <SidebarNavItem href="#" icon={<User />}>
              {t.profile}
            </SidebarNavItem>
            <SidebarNavItem href="#" icon={<Bell />}>
              {t.notifications}
            </SidebarNavItem>
            <SidebarNavItem icon={<LogOut />} tone="danger">
              {t.signOut}
            </SidebarNavItem>
          </SidebarNav>
        }
        mobileBar={
          <div className="flex items-center justify-between gap-x-2">
            <div className="flex min-w-0 items-center gap-x-3">
              <Avatar name={t.name} size="lg" className="rounded-2xl" />
              <span className="truncate text-xs font-semibold text-gray-800">{t.panel}</span>
            </div>
            <button
              type="button"
              aria-label={t.openMenu}
              className="bg-primary rounded-xl p-2 text-white shadow-xs"
            >
              <Menu className="size-5" />
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold text-gray-900">{t.heading}</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <StatCard label={t.courses} value={3} />
            <StatCard label={t.certificates} value={2} />
            <StatCard label={t.hours} value={15} />
          </div>
        </div>
      </DashboardShell>
    </div>
  );
}
