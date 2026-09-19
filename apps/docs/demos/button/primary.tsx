"use client";

import { Button } from "@averoui/react";
import { ArrowLeft } from "lucide-react";
import { useCopy } from "../copy";

export default function ButtonPrimaryDemo() {
  const t = useCopy({
    fa: { browse: "مشاهده دوره‌ها" },
    en: { browse: "Browse courses" },
  });

  return (
    <Button elevated>
      <span>{t.browse}</span>
      <ArrowLeft className="size-4 ltr:-scale-x-100" aria-hidden />
    </Button>
  );
}
