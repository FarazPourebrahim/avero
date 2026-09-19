"use client";

import { Field, FieldControl, FieldDescription, FieldLabel, OtpInput } from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function OtpInputVerifyDemo() {
  const [status, setStatus] = useState("");
  const t = useCopy({
    fa: {
      label: "کد تأیید",
      description: "کد ۶ رقمی پیامک‌شده به شماره شما را وارد کنید.",
      sent: (code: string) => `کد ${code} برای بررسی ارسال شد.`,
    },
    en: {
      label: "Verification code",
      description: "Enter the 6-digit code we sent you.",
      sent: (code: string) => `Code ${code} sent for checking.`,
    },
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <Field>
        <FieldLabel>{t.label}</FieldLabel>
        <FieldControl>
          <OtpInput
            onValueChange={() => setStatus("")}
            onComplete={(code) => setStatus(t.sent(code))}
          />
        </FieldControl>
        <FieldDescription>{t.description}</FieldDescription>
      </Field>
      <p role="status" className="min-h-5 text-sm text-gray-700">
        {status}
      </p>
    </div>
  );
}
