"use client";

import { Button, Popover, PopoverContent, PopoverTrigger } from "@averoui/react";
import { useCopy } from "../copy";

const ALIGNMENTS = ["start", "center", "end"] as const;

export default function PopoverAlignmentDemo() {
  const t = useCopy({
    fa: {
      labels: { start: "ابتدا", center: "میانه", end: "انتها" },
      ariaLabel: (label: string) => `چیدمان ${label}`,
      body: "`align` منطقی است: در صفحه راست‌به‌چپ، «ابتدا» سمت راست تریگر می‌نشیند.",
    },
    en: {
      labels: { start: "Start", center: "Center", end: "End" },
      ariaLabel: (label: string) => `${label} alignment`,
      body: "`align` is logical: on a right-to-left page, “start” sits to the right of the trigger.",
    },
  });

  return (
    <div className="flex flex-wrap gap-2">
      {ALIGNMENTS.map((align) => (
        <Popover key={align}>
          <PopoverTrigger asChild>
            <Button variant="outline">{t.labels[align]}</Button>
          </PopoverTrigger>
          <PopoverContent align={align} aria-label={t.ariaLabel(t.labels[align])} className="w-56">
            <p className="text-sm text-gray-600">{t.body}</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
