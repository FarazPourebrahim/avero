"use client";

import {
  Avatar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@averoui/react";
import { Award, LogOut, Settings, User } from "lucide-react";
import { useCopy } from "../copy";

export default function DropdownMenuUserMenuDemo() {
  const t = useCopy({
    fa: {
      menuLabel: "منوی حساب کاربری",
      name: "سارا محمدی",
      profile: "مشاهده پروفایل",
      certificates: "گواهی‌های من",
      settings: "تنظیمات",
      signOut: "خروج از حساب",
    },
    en: {
      menuLabel: "Account menu",
      name: "Sara Mohammadi",
      profile: "View profile",
      certificates: "My certificates",
      settings: "Settings",
      signOut: "Sign out",
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t.menuLabel}
          className="focus-visible:ring-primary/40 rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
        >
          <Avatar name={t.name} size="lg" className="rounded-2xl" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t.name}</DropdownMenuLabel>
        <DropdownMenuItem>
          <User aria-hidden />
          {t.profile}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Award aria-hidden />
          {t.certificates}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings aria-hidden />
          {t.settings}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem tone="danger">
          <LogOut aria-hidden />
          {t.signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
