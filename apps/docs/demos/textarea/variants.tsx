"use client";

import { Textarea } from "@averoui/react";
import { useCopy } from "../copy";

export default function TextareaVariantsDemo() {
  const t = useCopy({
    fa: {
      articleLabel: "دیدگاه مقاله",
      articlePlaceholder: "دیدگاه خود را درباره این مقاله بنویسید…",
      courseLabel: "دیدگاه دوره",
      coursePlaceholder: "دیدگاه خود را درباره این دوره بنویسید…",
    },
    en: {
      articleLabel: "Article comment",
      articlePlaceholder: "Share what you thought of this article…",
      courseLabel: "Course comment",
      coursePlaceholder: "Share what you thought of this course…",
    },
  });

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Textarea aria-label={t.articleLabel} placeholder={t.articlePlaceholder} />
      <Textarea
        variant="slate"
        rows={3}
        aria-label={t.courseLabel}
        placeholder={t.coursePlaceholder}
      />
    </div>
  );
}
