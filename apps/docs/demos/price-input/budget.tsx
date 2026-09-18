"use client";

import { Field, FieldControl, FieldDescription, FieldLabel, PriceInput } from "@averoui/react";
import { useState } from "react";

export default function PriceInputBudgetDemo() {
  const [budget, setBudget] = useState<number | null>(2_500_000);

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Field>
        <FieldLabel>بودجه پروژه</FieldLabel>
        <FieldControl>
          <PriceInput value={budget} onValueChange={setBudget} max={1_000_000_000} />
        </FieldControl>
        <FieldDescription>ارقام فارسی یا انگلیسی را وارد کنید.</FieldDescription>
      </Field>
      <p className="text-sm text-gray-700">
        مقدار: <code dir="ltr">{String(budget)}</code>
      </p>
    </div>
  );
}
