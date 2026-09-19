"use client";

import { Heading } from "@averoui/react";
import { useCopy } from "../copy";

export default function TypographyHeadingsDemo() {
  const t = useCopy({
    fa: {
      display: "مبانی طراحی رابط کاربری",
      article: "چطور یک سیستم طراحی بسازیم؟",
      page: "داستان ما",
      section: "دوره‌های مرتبط",
      card: "دیدگاه‌ها",
      subsection: "پرداخت امن و بدون دغدغه",
    },
    en: {
      display: "UI design foundations",
      article: "How to build a design system",
      page: "Our story",
      section: "Related courses",
      card: "Comments",
      subsection: "Secure, straightforward payment",
    },
  });

  return (
    <div className="flex w-full flex-col gap-4 rounded-3xl bg-white p-6">
      <Heading size="display" as="h3">
        {t.display}
      </Heading>
      <Heading size="article" as="h3">
        {t.article}
      </Heading>
      <Heading size="page" as="h3">
        {t.page}
      </Heading>
      <Heading size="section" as="h3">
        {t.section}
      </Heading>
      <Heading size="card">{t.card}</Heading>
      <Heading size="subsection">{t.subsection}</Heading>
    </div>
  );
}
