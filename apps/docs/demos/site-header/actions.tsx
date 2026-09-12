import { Button, Link, SiteHeader, SiteHeaderMenuButton } from "@avero/react";
import { Menu } from "lucide-react";

export default function SiteHeaderActionsDemo() {
  return (
    <div className="w-full rounded-2xl bg-gray-50 pb-8">
      <SiteHeader
        sticky={false}
        menu={
          <SiteHeaderMenuButton aria-label="باز کردن منو">
            <Menu className="size-5" />
          </SiteHeaderMenuButton>
        }
        logo={
          <a href="#" aria-label="Avero" className="flex items-center gap-x-3 py-2">
            <span className="text-primary text-lg font-black">Avero</span>
          </a>
        }
        nav={
          <>
            <Link variant="nav" href="#">
              دوره‌ها
            </Link>
            <Link variant="nav" href="#">
              وبلاگ
            </Link>
          </>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              ورود
            </Button>
            <Button size="sm">ثبت‌نام</Button>
          </div>
        }
      />
    </div>
  );
}
