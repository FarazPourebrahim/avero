import { Eyebrow, Text } from "@avero/react";

export default function TypographyTextDemo() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-3xl bg-white p-6">
      <Eyebrow>ارائه‌دهنده خدمت</Eyebrow>
      <Text>
        فریلنسری یکی از شکل‌های جدید و انعطاف‌پذیر همکاری است که در آن فرد مهارت خود را به‌صورت
        پروژه‌ای ارائه می‌کند.
      </Text>
      <Text variant="lead">ایده دورلنسر از دل یک دغدغه و نیاز ملموس جوانه زد.</Text>
      <Text variant="muted">روایت یک تصمیم برای تحول فضای دورکاری ✨</Text>
      <Text variant="caption">نظرات پس از بررسی و تایید مدیر منتشر خواهند شد.</Text>
    </div>
  );
}
