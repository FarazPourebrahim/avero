import { Eyebrow, Text } from "@avero/react";

export default function TypographyTextDemo() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-3xl bg-white p-6">
      <Eyebrow>مدرس دوره</Eyebrow>
      <Text>
        در این دوره از اصول چیدمان و رنگ شروع می‌کنیم و قدم‌به‌قدم تا ساختن نخستین نمونه اولیه پیش
        می‌رویم.
      </Text>
      <Text variant="lead">ما با یک پرسش ساده شروع کردیم: چرا یادگیری باید دشوار باشد؟</Text>
      <Text variant="muted">چطور از یک پرسش ساده به یک مدرسه آنلاین رسیدیم ✨</Text>
      <Text variant="caption">دیدگاه‌ها پس از بررسی منتشر می‌شوند.</Text>
    </div>
  );
}
