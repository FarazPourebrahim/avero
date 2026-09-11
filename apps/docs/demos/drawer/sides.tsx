"use client";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@avero/react";

const PANELS = [
  { side: "end", size: "panel", label: "از انتهای خط (پیش‌فرض)" },
  { side: "start", size: "wide", label: "از ابتدای خط، عریض" },
] as const;

export default function DrawerSidesDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {PANELS.map(({ side, size, label }) => (
        <Drawer key={side}>
          <DrawerTrigger asChild>
            <Button variant="outline">{label}</Button>
          </DrawerTrigger>
          <DrawerContent side={side} size={size} aria-describedby={undefined}>
            <DrawerHeader>
              <DrawerTitle>{label}</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
              جهت‌ها منطقی‌اند: `start` در صفحه راست‌به‌چپ از راست باز می‌شود و در چپ‌به‌راست از چپ.
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  );
}
