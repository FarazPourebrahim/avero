"use client";

import { Field, FieldControl, FieldDescription, FieldLabel, OtpInput } from "@averoui/react";
import { useCopy } from "../copy";

export default function OtpInputLengthsDemo() {
  const t = useCopy({
    fa: {
      fourDigit: "کد چهار رقمی",
      description: "طول کد را با `length` تعیین کنید.",
      verified: "کد تأییدشده",
      partial: "۱۲",
      complete: "۴۸۱۹",
    },
    en: {
      fourDigit: "Four-digit code",
      description: "Set the length with `length`.",
      verified: "Verified code",
      partial: "12",
      complete: "4819",
    },
  });

  return (
    <div className="flex flex-col items-center gap-5">
      <Field>
        <FieldLabel>{t.fourDigit}</FieldLabel>
        <FieldControl>
          <OtpInput key={t.partial} length={4} defaultValue={t.partial} />
        </FieldControl>
        <FieldDescription>{t.description}</FieldDescription>
      </Field>
      <Field disabled>
        <FieldLabel>{t.verified}</FieldLabel>
        <FieldControl>
          <OtpInput key={t.complete} length={4} defaultValue={t.complete} />
        </FieldControl>
      </Field>
    </div>
  );
}
