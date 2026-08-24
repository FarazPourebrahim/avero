"use client";

import { Field, FieldControl, FieldDescription, FieldLabel, FileInput } from "@avero/react";

const MB = 1024 * 1024;

export default function FileInputAttachmentsDemo() {
  return (
    <div className="w-full max-w-md">
      <Field>
        <FieldLabel>پیوست‌ها</FieldLabel>
        <FieldControl>
          <FileInput
            name="attachments"
            multiple
            maxFiles={3}
            maxSize={5 * MB}
            accept="image/*,.pdf"
          />
        </FieldControl>
        <FieldDescription>تا ۳ فایل تصویری یا PDF.</FieldDescription>
      </Field>
    </div>
  );
}
