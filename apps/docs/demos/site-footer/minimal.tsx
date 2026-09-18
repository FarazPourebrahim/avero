import { SiteFooter } from "@averoui/react";

export default function SiteFooterMinimalDemo() {
  return (
    <div className="w-full">
      <SiteFooter
        logo={<span className="text-primary text-xl font-black">Avero</span>}
        groups={[
          {
            title: "دسترسی سریع",
            links: [
              { label: "دوره‌ها", href: "#" },
              { label: "وبلاگ", href: "#" },
              { label: "تماس با ما", href: "#" },
            ],
          },
        ]}
        about={{
          long: "آورو مجموعه‌ای از آموزش‌های کوتاه و پروژه‌محور است برای کسانی که می‌خواهند کار در حوزه‌های دیجیتال را از صفر شروع کنند و با یک نمونه‌کار واقعی تمام کنند.",
          short: "آموزش‌های کوتاه و پروژه‌محور برای شروع کار در حوزه‌های دیجیتال.",
        }}
        copyright="© ۱۴۰۵ آورو — همه حقوق محفوظ است."
      />
    </div>
  );
}
