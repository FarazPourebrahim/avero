"use client";

import { CommentSection } from "@avero/react";

export default function CommentSectionServiceDemo() {
  return (
    <div className="w-full">
      <CommentSection
        variant="service"
        title="نظرات و دیدگاه‌های کاربران"
        count={0}
        placeholder="نظر خود را درباره این خدمت بنویسید..."
      />
    </div>
  );
}
