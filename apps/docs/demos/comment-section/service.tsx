"use client";

import { CommentSection } from "@avero/react";

export default function CommentSectionServiceDemo() {
  return (
    <div className="w-full">
      <CommentSection
        variant="service"
        title="دیدگاه شرکت‌کنندگان"
        count={0}
        placeholder="دیدگاه خود را درباره این دوره بنویسید…"
      />
    </div>
  );
}
