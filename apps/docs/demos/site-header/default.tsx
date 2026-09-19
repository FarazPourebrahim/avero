"use client";

import { Avatar, Link, SiteHeader, SiteHeaderMenuButton } from "@averoui/react";
import { Menu } from "lucide-react";
import { useCopy } from "../copy";

export default function SiteHeaderDefaultDemo() {
  const t = useCopy({
    fa: {
      openMenu: "باز کردن منو",
      dashboard: "پیشخوان",
      name: "سارا محمدی",
      nav: [
        { label: "خانه", href: "#" },
        { label: "دوره‌ها", href: "#" },
        { label: "وبلاگ", href: "#", current: true },
      ],
    },
    en: {
      openMenu: "Open the menu",
      dashboard: "Dashboard",
      name: "Sara Mohammadi",
      nav: [
        { label: "Home", href: "#" },
        { label: "Courses", href: "#" },
        { label: "Blog", href: "#", current: true },
      ],
    },
  });

  return (
    <div className="w-full rounded-2xl bg-gray-50 pb-8">
      <SiteHeader
        sticky={false}
        menu={
          <SiteHeaderMenuButton aria-label={t.openMenu}>
            <Menu className="size-5" />
          </SiteHeaderMenuButton>
        }
        logo={
          <a href="#" aria-label="Avero" className="flex items-center gap-x-3 py-2">
            <span className="text-primary text-lg font-black">Avero</span>
          </a>
        }
        nav={t.nav.map((item) => (
          <Link
            key={item.label}
            variant="nav"
            href={item.href}
            aria-current={item.current ? "page" : undefined}
            className={item.current ? "font-bold" : undefined}
          >
            {item.label}
          </Link>
        ))}
        actions={
          <a href="#" title={t.dashboard}>
            <Avatar name={t.name} size="md" />
          </a>
        }
      />
    </div>
  );
}
