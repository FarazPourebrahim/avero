"use client";

import { SegmentedControl, SegmentedControlItem } from "@avero/react";
import { useState } from "react";

const RANGES = [
  { value: "week", label: "۷ روز" },
  { value: "month", label: "۳۰ روز" },
  { value: "year", label: "یک سال" },
];

export default function SegmentedControlControlledDemo() {
  const [range, setRange] = useState("month");

  return (
    <div className="flex flex-col items-center gap-3">
      <SegmentedControl aria-label="بازه گزارش" value={range} onValueChange={setRange}>
        {RANGES.map((option) => (
          <SegmentedControlItem key={option.value} value={option.value}>
            {option.label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
      <p role="status" className="text-sm text-gray-700">
        گزارش {RANGES.find((option) => option.value === range)?.label}
      </p>
    </div>
  );
}
