"use client";

import { RadioGroup, RadioGroupItem } from "@averoui/react";
import { useCopy } from "../copy";

const OPTIONS: ReadonlyArray<{ value: "online" | "in-person" | "hybrid"; disabled?: boolean }> = [
  { value: "online" },
  { value: "in-person" },
  { value: "hybrid", disabled: true },
];

export default function RadioGroupDeliveryDemo() {
  const t = useCopy({
    fa: {
      heading: "نحوه برگزاری",
      labels: { online: "آنلاین", "in-person": "حضوری", hybrid: "ترکیبی (به‌زودی)" },
    },
    en: {
      heading: "How it runs",
      labels: { online: "Online", "in-person": "In person", hybrid: "Hybrid (coming soon)" },
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <p id="delivery-label" className="text-sm font-medium text-gray-800">
        {t.heading}
      </p>
      <RadioGroup aria-labelledby="delivery-label" defaultValue="online">
        {OPTIONS.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <RadioGroupItem id={option.value} value={option.value} disabled={option.disabled} />
            <label htmlFor={option.value} className="text-sm text-gray-700">
              {t.labels[option.value]}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
