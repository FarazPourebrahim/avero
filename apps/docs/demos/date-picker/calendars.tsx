"use client";

import { DatePicker, Field, FieldControl, FieldDescription, FieldLabel } from "@avero/react";
import { useState } from "react";

export default function DatePickerCalendarsDemo() {
  const [date, setDate] = useState<string | null>("2026-09-18");

  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel>تاریخ میلادی</FieldLabel>
        <FieldControl>
          <DatePicker calendar="gregory" weekStartsOn={1} value={date} onValueChange={setDate} />
        </FieldControl>
        <FieldDescription>
          همان مقدار ذخیره‌شده: <code dir="ltr">{String(date)}</code>
        </FieldDescription>
      </Field>
    </div>
  );
}
