"use client";

import { DatePicker, Field, FieldControl, FieldDescription, FieldLabel } from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

/** Fridays are the weekend in Iran, so no session is held on one. */
function isFriday(date: string) {
  return new Date(`${date}T00:00:00Z`).getUTCDay() === 5;
}

export default function DatePickerLimitsDemo() {
  const [session, setSession] = useState<string | null>(null);
  const t = useCopy({
    fa: {
      label: "جلسه مشاوره",
      description: "از ۲۴ شهریور تا ۲۳ مهر، به‌جز جمعه‌ها.",
    },
    en: {
      label: "Advice session",
      description: "From 15 September to 15 October, except Fridays.",
    },
  });

  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel>{t.label}</FieldLabel>
        <FieldControl>
          <DatePicker
            value={session}
            onValueChange={setSession}
            min="2026-09-15"
            max="2026-10-15"
            isDateDisabled={isFriday}
          />
        </FieldControl>
        <FieldDescription>{t.description}</FieldDescription>
      </Field>
    </div>
  );
}
