"use client";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@averoui/react";
import { useCopy } from "../copy";

const PANELS = [
  { side: "end", size: "panel" },
  { side: "start", size: "wide" },
] as const;

export default function DrawerSidesDemo() {
  const t = useCopy({
    fa: {
      labels: { end: "از انتهای خط (پیش‌فرض)", start: "از ابتدای خط، عریض" },
      body: "جهت‌ها منطقی‌اند: `start` در صفحه راست‌به‌چپ از راست باز می‌شود و در چپ‌به‌راست از چپ.",
    },
    en: {
      labels: { end: "From the inline end (default)", start: "From the inline start, wide" },
      body: "The sides are logical: `start` opens from the right on a right-to-left page and from the left on a left-to-right one.",
    },
  });

  return (
    <div className="flex flex-wrap gap-2">
      {PANELS.map(({ side, size }) => (
        <Drawer key={side}>
          <DrawerTrigger asChild>
            <Button variant="outline">{t.labels[side]}</Button>
          </DrawerTrigger>
          <DrawerContent side={side} size={size} aria-describedby={undefined}>
            <DrawerHeader>
              <DrawerTitle>{t.labels[side]}</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>{t.body}</DrawerBody>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  );
}
