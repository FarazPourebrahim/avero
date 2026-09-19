"use client";

import { Field, FieldControl, FieldDescription, FieldLabel, PriceInput } from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function PriceInputBudgetDemo() {
  const [budget, setBudget] = useState<number | null>(2_500_000);
  const t = useCopy({
    fa: {
      label: "بودجه پروژه",
      description: "ارقام فارسی یا انگلیسی را وارد کنید.",
      value: "مقدار:",
    },
    en: {
      label: "Project budget",
      description: "Type the digits in Persian or English.",
      value: "Value:",
    },
  });

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Field>
        <FieldLabel>{t.label}</FieldLabel>
        <FieldControl>
          <PriceInput value={budget} onValueChange={setBudget} max={1_000_000_000} />
        </FieldControl>
        <FieldDescription>{t.description}</FieldDescription>
      </Field>
      <p className="text-sm text-gray-700">
        {t.value} <code dir="ltr">{String(budget)}</code>
      </p>
    </div>
  );
}
