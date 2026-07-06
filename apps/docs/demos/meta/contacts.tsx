import { ContactMethod, KeyValueRow } from "@avero/react";

export default function MetaContactsDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <ContactMethod href="mailto:hello@example.com" label="email:" value="hello@example.com" />
        <ContactMethod href="https://example.com" label="website:" value="example.com" external />
      </div>
      <div className="flex flex-col gap-y-7">
        <KeyValueRow label="ایمیل :" value="hello@example.com" href="mailto:hello@example.com" />
        <KeyValueRow label="شماره تماس :" value="09373860014" href="tel:09373860014" />
      </div>
    </div>
  );
}
