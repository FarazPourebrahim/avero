"use client";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@averoui/react";
import { LayoutDashboard } from "lucide-react";
import { useCopy } from "../copy";

export default function DrawerMenuDemo() {
  const t = useCopy({
    fa: {
      open: "باز کردن منوی داشبورد",
      title: "منوی داشبورد",
      nav: ["پیشخوان", "مشاهده پروفایل", "دوره‌های من", "گواهی‌ها"],
    },
    en: {
      open: "Open the dashboard menu",
      title: "Dashboard menu",
      nav: ["Overview", "View profile", "My courses", "Certificates"],
    },
  });

  return (
    <Drawer>
      <DrawerTrigger className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm">
        {t.open}
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined}>
        <DrawerHeader icon={<LayoutDashboard className="size-4 text-gray-500" />}>
          <DrawerTitle>{t.title}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          {t.nav.map((item, index) => (
            <a
              key={item}
              href="#"
              className={
                index === 0
                  ? "bg-primary flex w-full items-center gap-x-3 rounded-2xl px-3 py-4 text-sm font-medium text-white shadow-md"
                  : "flex w-full items-center gap-x-3 rounded-2xl px-3 py-4 text-sm font-medium text-zinc-600"
              }
            >
              {item}
            </a>
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
