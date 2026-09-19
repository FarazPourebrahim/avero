"use client";

import { ArticleLayout, ListingLayout, SplitDetailLayout } from "@averoui/react";
import { useCopy } from "../copy";

function Block({ children, className }: { children: string; className?: string }) {
  return (
    <div
      className={`flex min-h-20 items-center justify-center rounded-2xl bg-white text-sm text-gray-500 shadow-xs ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export default function LayoutsTemplatesDemo() {
  const t = useCopy({
    fa: {
      sidebar: "ستون کناری",
      toc: "فهرست مطالب",
      article: "مقاله (۸ ستون)",
      filters: "فیلترها",
      results: "نتایج (۹ ستون)",
      banner: "بنر",
      courseDetail: "جزئیات دوره (۳ از ۴)",
    },
    en: {
      sidebar: "Sidebar",
      toc: "Table of contents",
      article: "Article (8 columns)",
      filters: "Filters",
      results: "Results (9 columns)",
      banner: "Banner",
      courseDetail: "Course detail (3 of 4)",
    },
  });

  return (
    <div className="w-full space-y-6 rounded-2xl bg-gray-100 py-4">
      <ArticleLayout asideLabel={t.sidebar} aside={<Block>{t.toc}</Block>}>
        <Block className="min-h-40">{t.article}</Block>
      </ArticleLayout>
      <ListingLayout asideLabel={t.filters} aside={<Block>{t.filters}</Block>}>
        <Block className="min-h-40">{t.results}</Block>
      </ListingLayout>
      <SplitDetailLayout asideLabel={t.banner} aside={<Block>{t.banner}</Block>}>
        <Block className="min-h-40">{t.courseDetail}</Block>
      </SplitDetailLayout>
    </div>
  );
}
