"use client";

import { Textarea } from "@averoui/react";
import { useCopy } from "../copy";

export default function TextareaPrimaryDemo() {
  const t = useCopy({
    fa: { label: "دیدگاه مقاله", placeholder: "دیدگاه خود را درباره این مقاله بنویسید…" },
    en: { label: "Article comment", placeholder: "Share what you thought of this article…" },
  });

  return (
    <div className="w-full max-w-xl">
      <Textarea rows={3} aria-label={t.label} placeholder={t.placeholder} />
    </div>
  );
}
