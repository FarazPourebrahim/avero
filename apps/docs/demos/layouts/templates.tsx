import { ArticleLayout, ListingLayout, SplitDetailLayout } from "@avero/react";

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
  return (
    <div className="w-full space-y-6 rounded-2xl bg-gray-100 py-4">
      <ArticleLayout asideLabel="ستون کناری" aside={<Block>فهرست مطالب</Block>}>
        <Block className="min-h-40">مقاله (۸ ستون)</Block>
      </ArticleLayout>
      <ListingLayout asideLabel="فیلترها" aside={<Block>فیلترها</Block>}>
        <Block className="min-h-40">نتایج (۹ ستون)</Block>
      </ListingLayout>
      <SplitDetailLayout asideLabel="بنر" aside={<Block>بنر</Block>}>
        <Block className="min-h-40">جزئیات پروژه (۳ از ۴)</Block>
      </SplitDetailLayout>
    </div>
  );
}
