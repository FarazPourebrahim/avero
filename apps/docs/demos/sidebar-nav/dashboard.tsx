import { SidebarNav, SidebarNavItem } from "@avero/react";
import { Eye, FileText, House, LogOut, Settings } from "lucide-react";

export default function SidebarNavDashboardDemo() {
  return (
    <div className="w-72">
      <SidebarNav aria-label="منوی داشبورد">
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
    </div>
  );
}
