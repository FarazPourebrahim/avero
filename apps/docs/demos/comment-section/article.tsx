"use client";

import { CommentSection } from "@averoui/react";

export default function CommentSectionArticleDemo() {
  return (
    <div className="w-full">
      <CommentSection
        count={0}
        placeholder="دیدگاه خود را درباره این مقاله بنویسید…"
        hint="دیدگاه‌ها پس از بررسی منتشر می‌شوند."
      />
    </div>
  );
}
