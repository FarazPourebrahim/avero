"use client";

import { Container } from "@averoui/react";
import { useCopy } from "../copy";

const GUTTERS = ["default", "tight", "none"] as const;

export default function ContainerGuttersDemo() {
  const t = useCopy({
    fa: {
      labels: {
        default: "صفحه‌های سایت (۱۶ تا ۳۲px)",
        tight: "داشبورد (۱۲ تا ۳۲px)",
        none: "وقتی خودتان فاصله می‌دهید",
      },
      as: "`as` عنصر را عوض می‌کند — اینجا یک `section` با ستون خواندنی.",
    },
    en: {
      labels: {
        default: "site pages (16 to 32px)",
        tight: "dashboard (12 to 32px)",
        none: "when you handle the spacing yourself",
      },
      as: "`as` changes the element — here a `section` with a readable column.",
    },
  });

  return (
    <div className="w-full space-y-3 rounded-2xl bg-gray-100 py-4">
      {GUTTERS.map((gutter) => (
        <Container key={gutter} gutter={gutter}>
          <div className="rounded-xl bg-white p-4 text-xs text-gray-600 sm:text-sm">
            {gutter} — {t.labels[gutter]}
          </div>
        </Container>
      ))}
      <Container as="section" size="prose">
        <div className="rounded-xl border border-dashed border-gray-300 p-4 text-xs text-gray-600 sm:text-sm">
          {t.as}
        </div>
      </Container>
    </div>
  );
}
