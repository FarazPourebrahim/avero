import { TableOfContents, type TocItem } from "@avero/react";

const ITEMS: TocItem[] = [
  { id: "what", label: "سیستم طراحی چیست؟" },
  { id: "why", label: "چرا به سیستم طراحی نیاز داریم؟" },
  { id: "steps", label: "گام‌های ساختن سیستم طراحی" },
  { id: "tokens", label: "تعریف توکن‌های طراحی", level: 3 },
  { id: "components", label: "ساختن کتابخانه کامپوننت", level: 3 },
  { id: "summary", label: "جمع‌بندی" },
];

export default function TableOfContentsArticleDemo() {
  return (
    <div className="w-80">
      <TableOfContents items={ITEMS} spy={false} defaultActiveId="steps" />
    </div>
  );
}
