import { Divider } from "@avero/react";

export default function DividerBasicDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl bg-white p-6">
      <span className="text-sm text-gray-600">دسته‌بندی‌های مرتبط</span>
      <Divider />
      <div className="flex h-8 items-center gap-4 text-sm text-gray-600">
        <span>۶ بازدید</span>
        <Divider orientation="vertical" tone="strong" />
        <span>امتیاز: 0.00</span>
      </div>
    </div>
  );
}
