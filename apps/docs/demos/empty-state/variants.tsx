import { EmptyState } from "@averoui/react";
import { BarChart3, Bell } from "lucide-react";

export default function EmptyStateVariantsDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <EmptyState>هنوز دیدگاهی برای این مقاله ثبت نشده است.</EmptyState>
      <EmptyState variant="slate">هنوز دیدگاهی ثبت نشده است.</EmptyState>
      <EmptyState variant="icon" icon={<BarChart3 className="mx-auto size-8" />}>
        به‌زودی
      </EmptyState>
      <EmptyState variant="circle" icon={<Bell />}>
        داده‌ای برای نمایش وجود ندارد
      </EmptyState>
    </div>
  );
}
