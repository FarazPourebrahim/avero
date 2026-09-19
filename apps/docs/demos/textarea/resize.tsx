"use client";

import { Textarea } from "@averoui/react";
import { useCopy } from "../copy";

export default function TextareaResizeDemo() {
  const t = useCopy({
    fa: {
      noteLabel: "یادداشت کوتاه",
      notePlaceholder: "ارتفاع ثابت است.",
      courseLabel: "توضیح دوره",
      coursePlaceholder: "گوشه پایین را بکشید تا بلندتر شود.",
    },
    en: {
      noteLabel: "Short note",
      notePlaceholder: "The height is fixed.",
      courseLabel: "Course description",
      coursePlaceholder: "Drag the bottom corner to make it taller.",
    },
  });

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Textarea rows={2} aria-label={t.noteLabel} placeholder={t.notePlaceholder} />
      <Textarea
        resize="vertical"
        rows={3}
        aria-label={t.courseLabel}
        placeholder={t.coursePlaceholder}
      />
    </div>
  );
}
