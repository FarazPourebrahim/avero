import { DetailLayout, ProfileLayout } from "@averoui/react";

function Block({ children, className }: { children: string; className?: string }) {
  return (
    <div
      className={`flex min-h-20 items-center justify-center rounded-2xl bg-white text-sm text-gray-500 shadow-xs ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export default function LayoutsDetailDemo() {
  return (
    <div className="w-full space-y-6 rounded-2xl bg-gray-100 py-4">
      <DetailLayout asideLabel="خلاصه دوره" aside={<Block>کارت ثبت‌نام</Block>}>
        <Block className="min-h-40">جزئیات (۸ ستون)</Block>
      </DetailLayout>
      <ProfileLayout>
        <Block>سربرگ پروفایل</Block>
        <Block className="min-h-40">دوره‌های مدرس</Block>
      </ProfileLayout>
    </div>
  );
}
