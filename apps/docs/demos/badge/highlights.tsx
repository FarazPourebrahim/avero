"use client";

import { Badge } from "@averoui/react";
import { ShieldCheck, Sparkles, ZoomIn } from "lucide-react";
import { useCopy } from "../copy";

export default function BadgeHighlightsDemo() {
  const t = useCopy({
    fa: {
      featured: "دوره ویژه",
      since: "از سال ۱۴۰۰",
      zoom: "مشاهده بزرگ‌نمایی",
      details: "مشاهده جزئیات کامل",
      full: "ظرفیت تکمیل شد",
    },
    en: {
      featured: "Featured course",
      since: "Since 2021",
      zoom: "View larger",
      details: "See full details",
      full: "Fully booked",
    },
  });

  return (
    <>
      <Badge variant="premium">
        <Sparkles className="size-4 animate-pulse text-amber-500" aria-hidden />
        <span>{t.featured}</span>
        <ShieldCheck className="size-4 text-amber-600" aria-hidden />
      </Badge>
      <Badge variant="label">
        <Sparkles className="size-4" aria-hidden />
        {t.since}
      </Badge>
      <span className="flex gap-3 rounded-2xl bg-slate-400 p-4">
        <Badge variant="overlay">
          <ZoomIn className="size-4" aria-hidden />
          {t.zoom}
        </Badge>
        <Badge variant="overlay" tone="blue">
          {t.details}
        </Badge>
        <Badge variant="solid" tone="danger">
          {t.full}
        </Badge>
      </span>
    </>
  );
}
