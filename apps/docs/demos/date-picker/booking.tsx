"use client";

import {
  DatePicker,
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
  type DateRange,
} from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function DatePickerBookingDemo() {
  const [start, setStart] = useState<string | null>("2026-09-11");
  const [stay, setStay] = useState<DateRange>({ from: "2026-09-20", to: "2026-09-24" });
  const t = useCopy({
    fa: { startLabel: "تاریخ شروع دوره", stayLabel: "مدت اقامت", value: "مقدار:" },
    en: { startLabel: "Course start date", stayLabel: "Length of stay", value: "Value:" },
  });

  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Field>
        <FieldLabel>{t.startLabel}</FieldLabel>
        <FieldControl>
          <DatePicker value={start} onValueChange={setStart} />
        </FieldControl>
        <FieldDescription>
          {t.value} <code dir="ltr">{String(start)}</code>
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel>{t.stayLabel}</FieldLabel>
        <FieldControl>
          <DatePicker mode="range" value={stay} onValueChange={setStay} min="2026-09-01" />
        </FieldControl>
        <FieldDescription>
          {t.value} <code dir="ltr">{JSON.stringify(stay)}</code>
        </FieldDescription>
      </Field>
    </div>
  );
}
