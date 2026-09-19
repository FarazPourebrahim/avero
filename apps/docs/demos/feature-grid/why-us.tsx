"use client";

import { FeatureCard, FeatureGrid } from "@averoui/react";
import { useCopy } from "../copy";

const TONES = ["emerald", "blue", "purple", "amber"] as const;

export default function FeatureGridWhyUsDemo() {
  const t = useCopy({
    fa: {
      heading: "چرا دوره‌های ما متفاوت‌اند؟",
      cards: [
        { title: "پرداخت امن و بدون دغدغه", description: "بازگشت وجه تا هفت روز پس از ثبت‌نام." },
        { title: "مدرس‌های باتجربه", description: "متخصصانی با سال‌ها تجربه در همان حوزه." },
        { title: "گواهی پایان دوره", description: "پس از گذراندن پروژه پایانی." },
        { title: "پشتیبانی همیشگی", description: "انجمن پرسش و پاسخ برای هر دوره." },
      ],
    },
    en: {
      heading: "What makes our courses different",
      cards: [
        {
          title: "Secure, straightforward payment",
          description: "A refund up to seven days after you sign up.",
        },
        {
          title: "Experienced instructors",
          description: "Specialists with years of experience in the field.",
        },
        { title: "Certificate of completion", description: "Once you finish the final project." },
        { title: "Support that lasts", description: "A Q&A forum for every course." },
      ],
    },
  });

  return (
    <FeatureGrid title={t.heading}>
      {t.cards.map((card, index) => (
        <FeatureCard key={card.title} tone={TONES[index]} {...card} />
      ))}
    </FeatureGrid>
  );
}
