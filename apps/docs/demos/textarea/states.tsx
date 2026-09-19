"use client";

import { Textarea } from "@averoui/react";
import { useCopy } from "../copy";

export default function TextareaStatesDemo() {
  const t = useCopy({
    fa: {
      invalidLabel: "دیدگاه نامعتبر",
      invalidValue: "کوتاه",
      closedLabel: "دیدگاه بسته",
      closedValue: "دیدگاه‌ها برای این مقاله بسته است.",
    },
    en: {
      invalidLabel: "Invalid comment",
      invalidValue: "Too short",
      closedLabel: "Comments closed",
      closedValue: "Comments are closed on this article.",
    },
  });

  // Keyed on the copy because `defaultValue` is read once on mount.
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Textarea
        key={t.invalidValue}
        aria-label={t.invalidLabel}
        aria-invalid
        defaultValue={t.invalidValue}
      />
      <Textarea
        key={t.closedValue}
        aria-label={t.closedLabel}
        disabled
        defaultValue={t.closedValue}
      />
    </div>
  );
}
