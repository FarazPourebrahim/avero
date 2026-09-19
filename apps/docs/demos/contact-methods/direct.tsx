"use client";

import { ContactMethod, ContactMethods, TelegramIcon } from "@averoui/react";
import { useCopy } from "../copy";

export default function ContactMethodsDirectDemo() {
  const t = useCopy({
    fa: {
      title: "راه‌های ارتباط با پشتیبانی",
      description:
        "برای پرسش درباره ثبت‌نام یا دسترسی به دوره‌ها از راه‌های زیر با ما در تماس باشید:",
      phoneValue: "۰۲۱-۰۰۰۰۰۰۰۰",
    },
    en: {
      title: "How to reach support",
      description: "Get in touch about signing up or getting access to a course:",
      phoneValue: "021-00000000",
    },
  });

  return (
    <ContactMethods title={t.title} description={t.description}>
      <ContactMethod
        href="mailto:hello@example.com"
        label="email:"
        value="hello@example.com"
        external
      />
      <ContactMethod href="tel:+982100000000" label="phone:" value={t.phoneValue} />
      <ContactMethod
        href="https://t.me/example"
        label="telegram:"
        value="@example"
        icon={<TelegramIcon className="text-sky-500" />}
        external
      />
    </ContactMethods>
  );
}
