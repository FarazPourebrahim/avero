import { Input } from "@avero/react";

export default function InputVariantsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input aria-label="جستجو" placeholder="جستجو..." />
      <Input variant="soft" aria-label="عنوان" placeholder="عنوان دوره" />
      <Input variant="slate" aria-label="ایمیل" placeholder="hello@example.com" />
    </div>
  );
}
