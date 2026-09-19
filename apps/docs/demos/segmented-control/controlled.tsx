"use client";

import { SegmentedControl, SegmentedControlItem } from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

const RANGES = ["week", "month", "year"] as const;

export default function SegmentedControlControlledDemo() {
  const [range, setRange] = useState<(typeof RANGES)[number]>("month");
  const t = useCopy({
    fa: {
      label: "بازه گزارش",
      ranges: { week: "۷ روز", month: "۳۰ روز", year: "یک سال" },
      status: (label: string) => `گزارش ${label}`,
    },
    en: {
      label: "Report range",
      ranges: { week: "7 days", month: "30 days", year: "One year" },
      status: (label: string) => `${label} report`,
    },
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <SegmentedControl
        aria-label={t.label}
        value={range}
        onValueChange={(value) => setRange(value as (typeof RANGES)[number])}
      >
        {RANGES.map((value) => (
          <SegmentedControlItem key={value} value={value}>
            {t.ranges[value]}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
      <p role="status" className="text-sm text-gray-700">
        {t.status(t.ranges[range])}
      </p>
    </div>
  );
}
