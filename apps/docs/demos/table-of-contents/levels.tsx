"use client";

import { TableOfContents, type TocItem } from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function TableOfContentsLevelsDemo() {
  const [active, setActive] = useState("tools-sql");
  const t = useCopy({
    fa: {
      title: "در این مقاله",
      items: [
        { id: "intro", label: "چرا تحلیل داده" },
        { id: "tools", label: "ابزارها" },
        { id: "tools-spreadsheet", label: "صفحه گسترده", level: 3 },
        { id: "tools-sql", label: "پایگاه داده", level: 3 },
        { id: "practice", label: "تمرین هفتگی" },
      ] satisfies TocItem[],
    },
    en: {
      title: "In this article",
      items: [
        { id: "intro", label: "Why analyse data" },
        { id: "tools", label: "Tools" },
        { id: "tools-spreadsheet", label: "Spreadsheets", level: 3 },
        { id: "tools-sql", label: "Databases", level: 3 },
        { id: "practice", label: "Weekly practice" },
      ] satisfies TocItem[],
    },
  });

  return (
    <div className="w-full max-w-xs">
      <TableOfContents
        items={t.items}
        activeId={active}
        onActiveChange={setActive}
        spy={false}
        title={t.title}
      />
    </div>
  );
}
