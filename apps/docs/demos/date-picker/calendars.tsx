"use client";

import { DatePicker, Field, FieldControl, FieldDescription, FieldLabel } from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function DatePickerCalendarsDemo() {
  const [date, setDate] = useState<string | null>("2026-09-18");
  const t = useCopy({
    fa: { label: "تاریخ میلادی", stored: "همان مقدار ذخیره‌شده:" },
    en: { label: "Gregorian date", stored: "The same stored value:" },
  });

  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel>{t.label}</FieldLabel>
        <FieldControl>
          <DatePicker calendar="gregory" weekStartsOn={1} value={date} onValueChange={setDate} />
        </FieldControl>
        <FieldDescription>
          {t.stored} <code dir="ltr">{String(date)}</code>
        </FieldDescription>
      </Field>
    </div>
  );
}
