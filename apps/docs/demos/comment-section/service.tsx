"use client";

import { CommentSection } from "@averoui/react";
import { useCopy } from "../copy";

export default function CommentSectionServiceDemo() {
  const t = useCopy({
    fa: {
      title: "دیدگاه شرکت‌کنندگان",
      placeholder: "دیدگاه خود را درباره این دوره بنویسید…",
    },
    en: {
      title: "What participants said",
      placeholder: "Share what you thought of this course…",
    },
  });

  return (
    <div className="w-full">
      <CommentSection variant="service" title={t.title} count={0} placeholder={t.placeholder} />
    </div>
  );
}
