"use client";

import { CommentSection } from "@avero/react";

export default function CommentSectionArticleDemo() {
  return (
    <div className="w-full">
      <CommentSection
        count={0}
        placeholder="نظر خود را درباره این مقاله بنویسید..."
        hint="نظرات پس از بررسی و تایید مدیر منتشر خواهند شد."
      />
    </div>
  );
}
