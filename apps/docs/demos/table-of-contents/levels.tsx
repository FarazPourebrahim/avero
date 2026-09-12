"use client";

import { TableOfContents, type TocItem } from "@avero/react";
import { useState } from "react";

const ITEMS: TocItem[] = [
  { id: "intro", label: "چرا تحلیل داده" },
  { id: "tools", label: "ابزارها" },
  { id: "tools-spreadsheet", label: "صفحه گسترده", level: 3 },
  { id: "tools-sql", label: "پایگاه داده", level: 3 },
  { id: "practice", label: "تمرین هفتگی" },
];

export default function TableOfContentsLevelsDemo() {
  const [active, setActive] = useState("tools-sql");

  return (
    <div className="w-full max-w-xs">
      <TableOfContents
        items={ITEMS}
        activeId={active}
        onActiveChange={setActive}
        spy={false}
        title="در این مقاله"
      />
    </div>
  );
}
