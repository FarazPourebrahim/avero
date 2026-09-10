import { Input } from "@avero/react";

export default function InputTypesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input type="search" aria-label="جستجوی دوره" placeholder="جستجو..." />
      <Input type="email" dir="ltr" aria-label="ایمیل" placeholder="hello@example.com" />
      <Input type="tel" dir="ltr" aria-label="شماره تماس" placeholder="+98 912 000 0000" />
    </div>
  );
}
