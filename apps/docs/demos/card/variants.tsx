"use client";

import { Card, CardTitle } from "@averoui/react";
import { useCopy } from "../copy";

const VARIANTS = ["surface", "flat", "glass", "muted"] as const;

export default function CardVariantsDemo() {
  const t = useCopy({
    fa: {
      labels: {
        surface: "کارت محتوای اصلی",
        flat: "کارت داشبورد",
        glass: "کارت فهرست روی تصویر",
        muted: "کاشی خنثی",
      },
    },
    en: {
      labels: {
        surface: "main content card",
        flat: "dashboard card",
        glass: "listing card over an image",
        muted: "neutral tile",
      },
    },
  });

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {VARIANTS.map((variant) => (
        <Card key={variant} variant={variant} padding="md">
          <CardTitle size="sm">
            {variant} — {t.labels[variant]}
          </CardTitle>
        </Card>
      ))}
    </div>
  );
}
