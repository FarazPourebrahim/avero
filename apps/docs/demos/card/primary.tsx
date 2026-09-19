"use client";

import { Card, CardHeader, CardTitle } from "@averoui/react";
import { useCopy } from "../copy";

export default function CardPrimaryDemo() {
  const t = useCopy({
    fa: {
      title: "مبانی تحلیل داده",
      sessions: "۸ جلسه",
      body: "از پاک‌سازی داده تا ساختن اولین گزارش، با تمرین‌های هفتگی.",
    },
    en: {
      title: "Data analysis basics",
      sessions: "8 sessions",
      body: "From cleaning data to building your first report, with weekly exercises.",
    },
  });

  return (
    <Card className="max-w-sm" elevation="soft">
      <CardHeader className="mb-3">
        <CardTitle>{t.title}</CardTitle>
        <span className="text-xs text-gray-400">{t.sessions}</span>
      </CardHeader>
      <p className="text-sm leading-7 text-gray-600">{t.body}</p>
    </Card>
  );
}
