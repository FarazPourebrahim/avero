"use client";

import { CategoryLinks, Chip } from "@averoui/react";
import { useCopy } from "../copy";

export default function CategoryLinksRelatedDemo() {
  const t = useCopy({
    fa: {
      title: "دسته‌بندی‌های مرتبط",
      description: "موضوع‌ها و زمینه‌های مرتبط با این مقاله",
      categories: ["TypeScript", "React", "طراحی رابط کاربری", "دسترس‌پذیری"],
    },
    en: {
      title: "Related categories",
      description: "Topics and subjects this article touches on",
      categories: ["TypeScript", "React", "UI design", "Accessibility"],
    },
  });

  return (
    <CategoryLinks title={t.title} description={t.description}>
      {t.categories.map((category) => (
        <Chip key={category} asChild variant="tag">
          <a href="#">{category}</a>
        </Chip>
      ))}
    </CategoryLinks>
  );
}
