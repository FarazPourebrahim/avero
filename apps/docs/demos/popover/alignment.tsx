"use client";

import { Button, Popover, PopoverContent, PopoverTrigger } from "@averoui/react";

const ALIGNMENTS = [
  { align: "start", label: "ابتدا" },
  { align: "center", label: "میانه" },
  { align: "end", label: "انتها" },
] as const;

export default function PopoverAlignmentDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {ALIGNMENTS.map(({ align, label }) => (
        <Popover key={align}>
          <PopoverTrigger asChild>
            <Button variant="outline">{label}</Button>
          </PopoverTrigger>
          <PopoverContent align={align} aria-label={`چیدمان ${label}`} className="w-56">
            <p className="text-sm text-gray-600">
              `align` منطقی است: در صفحه راست‌به‌چپ، «ابتدا» سمت راست تریگر می‌نشیند.
            </p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
