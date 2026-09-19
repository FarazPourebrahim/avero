"use client";

import { IconButton } from "@averoui/react";
import { Bell, House, Menu, X } from "lucide-react";
import { useCopy } from "../copy";

export default function IconButtonChromeDemo() {
  const t = useCopy({
    fa: { home: "خانه", notifications: "اعلان‌ها", menu: "منو", close: "بستن منو" },
    en: { home: "Home", notifications: "Notifications", menu: "Menu", close: "Close menu" },
  });

  return (
    <>
      <IconButton label={t.home}>
        <House className="size-5" />
      </IconButton>
      <IconButton label={t.notifications}>
        <Bell className="size-5" />
      </IconButton>
      <IconButton label={t.menu} variant="outline">
        <Menu className="size-6" />
      </IconButton>
      <IconButton label={t.close} variant="ghost" size="sm">
        <X className="size-5" />
      </IconButton>
    </>
  );
}
