"use client";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@avero/react";
import { LayoutDashboard } from "lucide-react";

const NAV = ["پیشخوان", "مشاهده پروفایل", "دوره‌های من", "گواهی‌ها"];

export default function DrawerMenuDemo() {
  return (
    <Drawer>
      <DrawerTrigger className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm">
        باز کردن منوی داشبورد
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined}>
        <DrawerHeader icon={<LayoutDashboard className="size-4 text-gray-500" />}>
          <DrawerTitle>منوی داشبورد</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          {NAV.map((item, index) => (
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
