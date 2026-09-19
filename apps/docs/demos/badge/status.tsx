"use client";

import { Badge } from "@averoui/react";
import { useCopy } from "../copy";

export default function BadgeStatusDemo() {
  const t = useCopy({
    fa: { published: "منتشر شده", seats: "۹ جای خالی", full: "ظرفیت تکمیل شد", online: "آنلاین" },
    en: { published: "Published", seats: "9 seats left", full: "Fully booked", online: "Online" },
  });

  return (
    <>
      <Badge tone="success">{t.published}</Badge>
      <Badge tone="success" className="py-1">
        {t.seats}
      </Badge>
      <Badge tone="danger" className="py-1">
        {t.full}
      </Badge>
      <Badge>{t.online}</Badge>
      <Badge variant="counter">0</Badge>
    </>
  );
}
