import { ContactMethod, ContactMethods, TelegramIcon } from "@avero/react";

export default function ContactMethodsDirectDemo() {
  return (
    <ContactMethods
      title="راه‌های ارتباط مستقیم"
      description="جهت مشاوره و هماهنگی سریع می‌توانید از راه‌های ارتباطی تاییدشده زیر استفاده نمایید:"
    >
      <ContactMethod
        href="mailto:hello@example.com"
        label="email:"
        value="hello@example.com"
        external
      />
      <ContactMethod href="tel:+989221257181" label="phone:" value="۰۹۲۲۱۲۵۷۱۸۱" />
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
