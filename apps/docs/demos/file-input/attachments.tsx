"use client";

import { Field, FieldControl, FieldDescription, FieldLabel, FileInput } from "@averoui/react";
import { useCopy } from "../copy";

const MB = 1024 * 1024;

export default function FileInputAttachmentsDemo() {
  const t = useCopy({
    fa: { label: "پیوست‌ها", description: "تا ۳ فایل تصویری یا PDF." },
    en: { label: "Attachments", description: "Up to 3 images or PDFs." },
  });

  return (
    <div className="w-full max-w-md">
      <Field>
        <FieldLabel>{t.label}</FieldLabel>
        <FieldControl>
          <FileInput
            name="attachments"
            multiple
            maxFiles={3}
            maxSize={5 * MB}
            accept="image/*,.pdf"
          />
        </FieldControl>
        <FieldDescription>{t.description}</FieldDescription>
      </Field>
    </div>
  );
}
