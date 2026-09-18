import { Card, CardTitle, DashboardShell, SidebarNav, SidebarNavItem } from "@averoui/react";
import { BookOpen, LayoutDashboard, Menu } from "lucide-react";

export default function DashboardShellSectionsDemo() {
  return (
    <div className="bg-background w-full rounded-2xl">
      <DashboardShell
        sidebar={
          <SidebarNav aria-label="منوی داشبورد">
            <SidebarNavItem href="#" icon={<LayoutDashboard />} current>
              پیشخوان
            </SidebarNavItem>
            <SidebarNavItem href="#" icon={<BookOpen />}>
              دوره‌های من
            </SidebarNavItem>
          </SidebarNav>
        }
        mobileBar={
          <div className="flex items-center justify-between gap-x-2">
            <span className="text-xs font-semibold text-gray-800">پنل کاربری</span>
            <button type="button" aria-label="باز کردن منو" className="rounded-xl p-2">
              <Menu className="size-5 text-gray-600" />
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <Card variant="flat" padding="md">
            <CardTitle size="sm">سربرگ بخش</CardTitle>
            <p className="mt-2 text-xs text-gray-500">
              محتوای داشبورد داخل کارت محتوای پوسته می‌نشیند.
            </p>
          </Card>
          <Card variant="muted" padding="md">
            <CardTitle size="sm">کارت دوم</CardTitle>
          </Card>
        </div>
      </DashboardShell>
    </div>
  );
}
