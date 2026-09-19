"use client";

import { Card, CardTitle, DashboardShell, SidebarNav, SidebarNavItem } from "@averoui/react";
import { BookOpen, LayoutDashboard, Menu } from "lucide-react";
import { useCopy } from "../copy";

export default function DashboardShellSectionsDemo() {
  const t = useCopy({
    fa: {
      menu: "منوی داشبورد",
      overview: "پیشخوان",
      courses: "دوره‌های من",
      panel: "پنل کاربری",
      openMenu: "باز کردن منو",
      sectionHeader: "سربرگ بخش",
      sectionBody: "محتوای داشبورد داخل کارت محتوای پوسته می‌نشیند.",
      secondCard: "کارت دوم",
    },
    en: {
      menu: "Dashboard menu",
      overview: "Overview",
      courses: "My courses",
      panel: "Your account",
      openMenu: "Open the menu",
      sectionHeader: "Section heading",
      sectionBody: "Dashboard content sits inside the shell's content card.",
      secondCard: "Second card",
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
            <SidebarNavItem href="#" icon={<BookOpen />}>
              {t.courses}
            </SidebarNavItem>
          </SidebarNav>
        }
        mobileBar={
          <div className="flex items-center justify-between gap-x-2">
            <span className="text-xs font-semibold text-gray-800">{t.panel}</span>
            <button type="button" aria-label={t.openMenu} className="rounded-xl p-2">
              <Menu className="size-5 text-gray-600" />
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <Card variant="flat" padding="md">
            <CardTitle size="sm">{t.sectionHeader}</CardTitle>
            <p className="mt-2 text-xs text-gray-500">{t.sectionBody}</p>
          </Card>
          <Card variant="muted" padding="md">
            <CardTitle size="sm">{t.secondCard}</CardTitle>
          </Card>
        </div>
      </DashboardShell>
    </div>
  );
}
