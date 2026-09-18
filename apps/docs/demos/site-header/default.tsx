import { Avatar, Link, SiteHeader, SiteHeaderMenuButton } from "@averoui/react";
import { Menu } from "lucide-react";

const NAV = [
  { label: "خانه", href: "#" },
  { label: "دوره‌ها", href: "#" },
  { label: "وبلاگ", href: "#", current: true },
];

export default function SiteHeaderDefaultDemo() {
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
        nav={NAV.map((item) => (
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
          <a href="#" title="پیشخوان">
            <Avatar name="سارا محمدی" size="md" />
          </a>
        }
      />
    </div>
  );
}
