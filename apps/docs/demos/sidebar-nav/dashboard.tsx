"use client";

import { SidebarNav, SidebarNavItem } from "@averoui/react";
import { Eye, FileText, House, LogOut, Settings } from "lucide-react";
import { useCopy } from "../copy";

export default function SidebarNavDashboardDemo() {
  const t = useCopy({
    fa: {
      label: "منوی داشبورد",
      overview: "پیشخوان",
      profile: "مشاهده پروفایل",
      settings: "تنظیمات پروفایل",
      certificates: "گواهی‌های من",
      signOut: "خروج از حساب",
    },
    en: {
      label: "Dashboard menu",
      overview: "Overview",
      profile: "View profile",
      settings: "Profile settings",
      certificates: "My certificates",
      signOut: "Sign out",
    },
  });

  return (
    <div className="w-72">
      <SidebarNav aria-label={t.label}>
        <SidebarNavItem href="#dashboard" current icon={<House />}>
          {t.overview}
        </SidebarNavItem>
        <SidebarNavItem href="#profile" icon={<Eye />}>
          {t.profile}
        </SidebarNavItem>
        <SidebarNavItem href="#settings" icon={<Settings />}>
          {t.settings}
        </SidebarNavItem>
        <SidebarNavItem href="#certificates" icon={<FileText />}>
          {t.certificates}
        </SidebarNavItem>
        <SidebarNavItem tone="danger" icon={<LogOut />}>
          {t.signOut}
        </SidebarNavItem>
      </SidebarNav>
    </div>
  );
}
