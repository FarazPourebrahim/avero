import { TableOfContents, type TocItem } from "@avero/react";

const ITEMS: TocItem[] = [
  { id: "what", label: "فریلنسری چیست؟" },
  { id: "who", label: "فریلنسر کیست؟" },
  { id: "benefits", label: "مزایای فریلنسری چیست؟" },
  { id: "flexibility", label: "انعطاف‌پذیری در زمان و مکان", level: 3 },
  { id: "clients", label: "امکان همکاری با چند کارفرما", level: 3 },
  { id: "summary", label: "جمع‌بندی" },
];

export default function TableOfContentsArticleDemo() {
  return (
    <div className="w-80">
      <TableOfContents items={ITEMS} spy={false} defaultActiveId="benefits" />
    </div>
  );
}
