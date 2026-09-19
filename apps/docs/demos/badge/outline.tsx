"use client";

import { Badge } from "@averoui/react";
import { MapPin } from "lucide-react";
import { useCopy } from "../copy";

export default function BadgeOutlineDemo() {
  const t = useCopy({
    fa: { design: "طراحی", level: "سطح: مقدماتی", online: "آنلاین" },
    en: { design: "Design", level: "Level: beginner", online: "Online" },
  });

  return (
    <>
      <Badge variant="outline" tone="indigo">
        {t.design}
      </Badge>
      <Badge variant="outline" tone="emerald">
        {t.level}
      </Badge>
      <Badge variant="outline" tone="amber">
        <MapPin className="size-3.5" aria-hidden />
        {t.online}
      </Badge>
    </>
  );
}
