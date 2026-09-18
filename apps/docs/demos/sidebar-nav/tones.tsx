"use client";

import { SidebarNav, SidebarNavItem } from "@averoui/react";
import { BookOpen, LayoutDashboard, LogOut, Settings } from "lucide-react";

export default function SidebarNavTonesDemo() {
  return (
    <div className="w-full max-w-xs rounded-2xl border border-gray-100 p-3">
      <SidebarNav aria-label="منوی داشبورد">
        <SidebarNavItem href="#dashboard" current icon={<LayoutDashboard />}>
          پیشخوان
        </SidebarNavItem>
        <SidebarNavItem href="#courses" icon={<BookOpen />}>
          دوره‌های من
        </SidebarNavItem>
        <SidebarNavItem href="#settings" icon={<Settings />}>
          تنظیمات
        </SidebarNavItem>
        <SidebarNavItem tone="danger" icon={<LogOut />} onClick={() => {}}>
          خروج از حساب
        </SidebarNavItem>
      </SidebarNav>
    </div>
  );
}
