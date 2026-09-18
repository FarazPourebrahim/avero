import { Input } from "@averoui/react";

export default function InputStatesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input aria-label="نام دوره" defaultValue="طراحی رابط کاربری" />
      <Input aria-label="کد تخفیف نامعتبر" aria-invalid defaultValue="OFF-2020" />
      <Input aria-label="شناسه کاربر" readOnly defaultValue="۱۴۰۲۸۸۳۱" />
      <Input aria-label="ایمیل سازمانی" disabled defaultValue="ثبت‌نام بسته است" />
    </div>
  );
}
