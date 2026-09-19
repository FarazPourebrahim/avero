"use client";

import { RadioGroup, RadioGroupItem } from "@averoui/react";
import { useId, useState } from "react";
import { useCopy } from "../copy";

const PLANS = ["monthly", "yearly"] as const;

export default function RadioGroupValidationDemo() {
  const labelId = useId();
  const errorId = useId();
  const [plan, setPlan] = useState("");
  const invalid = plan === "";
  const t = useCopy({
    fa: {
      heading: "دوره پرداخت",
      labels: { monthly: "ماهانه", yearly: "سالانه (دو ماه رایگان)" },
      error: "یک دوره پرداخت را انتخاب کنید.",
    },
    en: {
      heading: "Billing period",
      labels: { monthly: "Monthly", yearly: "Yearly (two months free)" },
      error: "Choose a billing period.",
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <p id={labelId} className="text-sm font-medium text-gray-800">
        {t.heading}
      </p>
      <RadioGroup
        aria-labelledby={labelId}
        aria-required
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? errorId : undefined}
        value={plan}
        onValueChange={setPlan}
      >
        {PLANS.map((value) => (
          <div key={value} className="flex items-center gap-2">
            <RadioGroupItem id={`plan-${value}`} value={value} />
            <label htmlFor={`plan-${value}`} className="text-sm text-gray-700">
              {t.labels[value]}
            </label>
          </div>
        ))}
      </RadioGroup>
      {invalid ? (
        <p id={errorId} role="alert" className="text-xs leading-5 text-red-600">
          {t.error}
        </p>
      ) : null}
    </div>
  );
}
