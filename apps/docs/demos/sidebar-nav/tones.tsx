"use client";

import { SidebarNav, SidebarNavItem } from "@averoui/react";
import { BookOpen, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { useCopy } from "../copy";

export default function SidebarNavTonesDemo() {
  const t = useCopy({
    fa: {
      label: "منوی داشبورد",
      overview: "پیشخوان",
      courses: "دوره‌های من",
      settings: "تنظیمات",
      signOut: "خروج از حساب",
    },
    en: {
      label: "Dashboard menu",
      overview: "Overview",
      courses: "My courses",
      settings: "Settings",
      signOut: "Sign out",
    },
  });

  return (
    <div className="w-full max-w-xs rounded-2xl border border-gray-100 p-3">
      <SidebarNav aria-label={t.label}>
        <SidebarNavItem href="#dashboard" current icon={<LayoutDashboard />}>
          {t.overview}
        </SidebarNavItem>
        <SidebarNavItem href="#courses" icon={<BookOpen />}>
          {t.courses}
        </SidebarNavItem>
        <SidebarNavItem href="#settings" icon={<Settings />}>
          {t.settings}
        </SidebarNavItem>
        <SidebarNavItem tone="danger" icon={<LogOut />} onClick={() => {}}>
          {t.signOut}
        </SidebarNavItem>
      </SidebarNav>
    </div>
  );
}
