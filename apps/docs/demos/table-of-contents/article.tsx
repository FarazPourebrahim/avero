"use client";

import { TableOfContents, type TocItem } from "@averoui/react";
import { useCopy } from "../copy";

export default function TableOfContentsArticleDemo() {
  const t = useCopy({
    fa: {
      items: [
        { id: "what", label: "سیستم طراحی چیست؟" },
        { id: "why", label: "چرا به سیستم طراحی نیاز داریم؟" },
        { id: "steps", label: "گام‌های ساختن سیستم طراحی" },
        { id: "tokens", label: "تعریف توکن‌های طراحی", level: 3 },
        { id: "components", label: "ساختن کتابخانه کامپوننت", level: 3 },
        { id: "summary", label: "جمع‌بندی" },
      ] satisfies TocItem[],
    },
    en: {
      items: [
        { id: "what", label: "What is a design system?" },
        { id: "why", label: "Why you need one" },
        { id: "steps", label: "Building a design system" },
        { id: "tokens", label: "Defining design tokens", level: 3 },
        { id: "components", label: "Building the component library", level: 3 },
        { id: "summary", label: "In summary" },
      ] satisfies TocItem[],
    },
  });

  return (
    <div className="w-80">
      <TableOfContents items={t.items} spy={false} defaultActiveId="steps" />
    </div>
  );
}
