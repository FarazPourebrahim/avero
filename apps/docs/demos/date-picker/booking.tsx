"use client";

import {
  DatePicker,
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
  type DateRange,
} from "@avero/react";
import { useState } from "react";

export default function DatePickerBookingDemo() {
  const [start, setStart] = useState<string | null>("2026-09-11");
  const [stay, setStay] = useState<DateRange>({ from: "2026-09-20", to: "2026-09-24" });

  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Field>
        <FieldLabel>تاریخ شروع دوره</FieldLabel>
        <FieldControl>
          <DatePicker value={start} onValueChange={setStart} />
        </FieldControl>
        <FieldDescription>
          مقدار: <code dir="ltr">{String(start)}</code>
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel>مدت اقامت</FieldLabel>
        <FieldControl>
          <DatePicker mode="range" value={stay} onValueChange={setStay} min="2026-09-01" />
        </FieldControl>
        <FieldDescription>
          مقدار: <code dir="ltr">{JSON.stringify(stay)}</code>
        </FieldDescription>
      </Field>
    </div>
  );
}
