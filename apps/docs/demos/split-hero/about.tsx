"use client";

import { Button, SplitHero } from "@averoui/react";
import { tokens } from "@averoui/tokens";
import { useCopy } from "../copy";

// Inline SVG artwork keeps the demo deterministic and offline (no remote images).
const GROUND = tokens.colorPrimary.value;
const HIGHLIGHT = tokens.colorSurfaceGlass.value;
const ARTWORK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360"><rect width="480" height="360" rx="24" fill="${GROUND}"/><circle cx="240" cy="150" r="70" fill="${HIGHLIGHT}"/><rect x="120" y="260" width="240" height="28" rx="14" fill="${HIGHLIGHT}"/></svg>`,
  );

export default function SplitHeroAboutDemo() {
  const t = useCopy({
    fa: {
      eyebrow: "از سال ۱۴۰۰",
      note: "داستان ما",
      title: "جایی برای یادگیری ساده و لذت‌بخش",
      imageAlt: "تصویر معرفی",
      browse: "مشاهده دوره‌ها",
      contact: "تماس با پشتیبانی",
      first:
        "ما با یک پرسش ساده شروع کردیم: چرا یادگیری مهارت‌های تازه باید دشوار باشد؟ پاسخ ما دوره‌هایی کوتاه، عملی و در دسترس بود.",
      second: "باور داریم هر کسی، هر جا که باشد، باید بتواند با سرعت خودش پیش برود.",
    },
    en: {
      eyebrow: "Since 2021",
      note: "Our story",
      title: "A place to learn simply, and enjoy it",
      imageAlt: "Introductory illustration",
      browse: "Browse courses",
      contact: "Contact support",
      first:
        "We started with a simple question: why should picking up a new skill be hard? Our answer was short, practical courses that anyone can reach.",
      second: "We believe anyone, anywhere, should be able to move at their own pace.",
    },
  });

  return (
    <SplitHero
      eyebrow={t.eyebrow}
      note={t.note}
      title={t.title}
      image={ARTWORK}
      imageAlt={t.imageAlt}
      actions={
        <>
          <Button elevated>{t.browse}</Button>
          <Button variant="soft">{t.contact}</Button>
        </>
      }
    >
      <p>{t.first}</p>
      <p>{t.second}</p>
    </SplitHero>
  );
}
