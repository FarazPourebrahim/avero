"use client";

import { RadioGroup, RadioGroupItem } from "@avero/react";
import { useId, useState } from "react";

const PLANS = [
  { value: "monthly", label: "ماهانه" },
  { value: "yearly", label: "سالانه (دو ماه رایگان)" },
];

export default function RadioGroupValidationDemo() {
  const labelId = useId();
  const errorId = useId();
  const [plan, setPlan] = useState("");
  const invalid = plan === "";

  return (
    <div className="flex flex-col gap-2">
      <p id={labelId} className="text-sm font-medium text-gray-800">
        دوره پرداخت
      </p>
      <RadioGroup
        aria-labelledby={labelId}
        aria-required
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? errorId : undefined}
        value={plan}
        onValueChange={setPlan}
      >
        {PLANS.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <RadioGroupItem id={`plan-${option.value}`} value={option.value} />
            <label htmlFor={`plan-${option.value}`} className="text-sm text-gray-700">
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroup>
      {invalid ? (
        <p id={errorId} role="alert" className="text-xs leading-5 text-red-600">
          یک دوره پرداخت را انتخاب کنید.
        </p>
      ) : null}
    </div>
  );
}
