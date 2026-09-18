"use client";

import { Field, FieldControl, FieldDescription, FieldLabel, OtpInput } from "@averoui/react";
import { useState } from "react";

export default function OtpInputVerifyDemo() {
  const [status, setStatus] = useState("");

  return (
    <div className="flex flex-col items-center gap-3">
      <Field>
        <FieldLabel>کد تأیید</FieldLabel>
        <FieldControl>
          <OtpInput
            onValueChange={() => setStatus("")}
            onComplete={(code) => setStatus(`کد ${code} برای بررسی ارسال شد.`)}
          />
        </FieldControl>
        <FieldDescription>کد ۶ رقمی پیامک‌شده به شماره شما را وارد کنید.</FieldDescription>
      </Field>
      <p role="status" className="min-h-5 text-sm text-gray-700">
        {status}
      </p>
    </div>
  );
}
