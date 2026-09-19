"use client";

import { ContactMethod, KeyValueRow } from "@averoui/react";
import { useCopy } from "../copy";

export default function MetaContactsDemo() {
  const t = useCopy({
    fa: { email: "ایمیل :", phone: "شماره تماس :", phoneValue: "۰۲۱-۰۰۰۰۰۰۰۰" },
    en: { email: "Email:", phone: "Phone:", phoneValue: "021-00000000" },
  });

  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <ContactMethod href="mailto:hello@example.com" label="email:" value="hello@example.com" />
        <ContactMethod href="https://example.com" label="website:" value="example.com" external />
      </div>
      <div className="flex flex-col gap-y-7">
        <KeyValueRow label={t.email} value="hello@example.com" href="mailto:hello@example.com" />
        <KeyValueRow label={t.phone} value={t.phoneValue} href="tel:+982100000000" />
      </div>
    </div>
  );
}
