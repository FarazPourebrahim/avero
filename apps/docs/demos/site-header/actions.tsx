"use client";

import { Button, Link, SiteHeader, SiteHeaderMenuButton } from "@averoui/react";
import { Menu } from "lucide-react";
import { useCopy } from "../copy";

export default function SiteHeaderActionsDemo() {
  const t = useCopy({
    fa: {
      openMenu: "باز کردن منو",
      courses: "دوره‌ها",
      blog: "وبلاگ",
      signIn: "ورود",
      signUp: "ثبت‌نام",
    },
    en: {
      openMenu: "Open the menu",
      courses: "Courses",
      blog: "Blog",
      signIn: "Sign in",
      signUp: "Sign up",
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
        nav={
          <>
            <Link variant="nav" href="#">
              {t.courses}
            </Link>
            <Link variant="nav" href="#">
              {t.blog}
            </Link>
          </>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              {t.signIn}
            </Button>
            <Button size="sm">{t.signUp}</Button>
          </div>
        }
      />
    </div>
  );
}
