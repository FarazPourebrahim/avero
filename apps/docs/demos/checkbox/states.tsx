"use client";

import { Checkbox, Field, FieldControl, FieldError, FieldLabel } from "@averoui/react";
import { useCopy } from "../copy";

const STATES = [
  { id: "state-on", checked: true as const },
  { id: "state-mixed", checked: "indeterminate" as const },
  { id: "state-off", checked: false as const },
  { id: "state-disabled", checked: true as const, disabled: true },
];

export default function CheckboxStatesDemo() {
  const t = useCopy({
    fa: {
      labels: {
        "state-on": "انتخاب‌شده",
        "state-mixed": "بخشی انتخاب‌شده",
        "state-off": "انتخاب‌نشده",
        "state-disabled": "غیرفعال",
      },
      terms: "قوانین را می‌پذیرم",
      error: "برای ادامه باید قوانین را بپذیرید.",
    },
    en: {
      labels: {
        "state-on": "Checked",
        "state-mixed": "Partly checked",
        "state-off": "Unchecked",
        "state-disabled": "Disabled",
      },
      terms: "I accept the terms",
      error: "You need to accept the terms to continue.",
    },
  });

  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <div className="flex flex-col gap-3">
        {STATES.map(({ id, ...props }) => (
          <div key={id} className="flex items-center gap-2">
            <Checkbox id={id} {...props} />
            <label htmlFor={id} className="text-sm text-gray-700">
              {t.labels[id as keyof typeof t.labels]}
            </label>
          </div>
        ))}
      </div>
      <Field invalid required>
        <div className="flex items-center gap-2">
          <FieldControl>
            <Checkbox />
          </FieldControl>
          <FieldLabel>{t.terms}</FieldLabel>
        </div>
        <FieldError>{t.error}</FieldError>
      </Field>
    </div>
  );
}
