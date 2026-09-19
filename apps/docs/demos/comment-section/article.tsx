"use client";

import { CommentSection } from "@averoui/react";
import { useCopy } from "../copy";

export default function CommentSectionArticleDemo() {
  const t = useCopy({
    fa: {
      placeholder: "دیدگاه خود را درباره این مقاله بنویسید…",
      hint: "دیدگاه‌ها پس از بررسی منتشر می‌شوند.",
    },
    en: {
      placeholder: "Share what you thought of this article…",
      hint: "Comments appear once they have been reviewed.",
    },
  });

  return (
    <div className="w-full">
      <CommentSection count={0} placeholder={t.placeholder} hint={t.hint} />
    </div>
  );
}
