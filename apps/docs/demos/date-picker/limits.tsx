"use client";

import { DatePicker, Field, FieldControl, FieldDescription, FieldLabel } from "@avero/react";
import { useState } from "react";

/** Fridays are the weekend in Iran, so no session is held on one. */
function isFriday(date: string) {
  return new Date(`${date}T00:00:00Z`).getUTCDay() === 5;
}

export default function DatePickerLimitsDemo() {
  const [session, setSession] = useState<string | null>(null);

  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel>جلسه مشاوره</FieldLabel>
        <FieldControl>
          <DatePicker
            value={session}
            onValueChange={setSession}
            min="2026-09-15"
            max="2026-10-15"
            isDateDisabled={isFriday}
          />
        </FieldControl>
        <FieldDescription>از ۲۴ شهریور تا ۲۳ مهر، به‌جز جمعه‌ها.</FieldDescription>
      </Field>
    </div>
  );
}
