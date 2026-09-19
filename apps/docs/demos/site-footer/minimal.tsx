"use client";

import { SiteFooter } from "@averoui/react";
import { useCopy } from "../copy";

export default function SiteFooterMinimalDemo() {
  const t = useCopy({
    fa: {
      quick: "دسترسی سریع",
      courses: "دوره‌ها",
      blog: "وبلاگ",
      contact: "تماس با ما",
      long: "آورو مجموعه‌ای از آموزش‌های کوتاه و پروژه‌محور است برای کسانی که می‌خواهند کار در حوزه‌های دیجیتال را از صفر شروع کنند و با یک نمونه‌کار واقعی تمام کنند.",
      short: "آموزش‌های کوتاه و پروژه‌محور برای شروع کار در حوزه‌های دیجیتال.",
      copyright: "© ۱۴۰۵ آورو — همه حقوق محفوظ است.",
    },
    en: {
      quick: "Quick links",
      courses: "Courses",
      blog: "Blog",
      contact: "Contact us",
      long: "Avero is a set of short, project-led courses for anyone who wants to start out in a digital field from scratch and finish with a real piece of work.",
      short: "Short, project-led courses to start out in a digital field.",
      copyright: "© 2026 Avero — all rights reserved.",
    },
  });

  return (
    <div className="w-full">
      <SiteFooter
        logo={<span className="text-primary text-xl font-black">Avero</span>}
        groups={[
          {
            title: t.quick,
            links: [
              { label: t.courses, href: "#" },
              { label: t.blog, href: "#" },
              { label: t.contact, href: "#" },
            ],
          },
        ]}
        about={{ long: t.long, short: t.short }}
        copyright={t.copyright}
      />
    </div>
  );
}
