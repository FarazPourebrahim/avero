import { ContactMethod, ContactMethods, TelegramIcon } from "@averoui/react";

export default function ContactMethodsDirectDemo() {
  return (
    <ContactMethods
      title="راه‌های ارتباط با پشتیبانی"
      description="برای پرسش درباره ثبت‌نام یا دسترسی به دوره‌ها از راه‌های زیر با ما در تماس باشید:"
    >
      <ContactMethod
        href="mailto:hello@example.com"
        label="email:"
        value="hello@example.com"
        external
      />
      <ContactMethod href="tel:+982100000000" label="phone:" value="۰۲۱-۰۰۰۰۰۰۰۰" />
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
