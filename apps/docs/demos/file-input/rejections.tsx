"use client";

import { Field, FieldControl, FieldDescription, FieldLabel, FileInput } from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

const MB = 1024 * 1024;

export default function FileInputRejectionsDemo() {
  const [rejected, setRejected] = useState<string[]>([]);
  const t = useCopy({
    fa: {
      label: "تصویر جلد",
      description: "یک تصویر PNG یا JPEG تا ۱ مگابایت.",
      reasons: {
        type: "قالب پشتیبانی نمی‌شود",
        size: "حجم بیش از حد مجاز است",
        count: "تعداد فایل‌ها بیش از حد مجاز است",
      },
    },
    en: {
      label: "Cover image",
      description: "One PNG or JPEG, up to 1 MB.",
      reasons: {
        type: "That file type is not supported",
        size: "That file is too large",
        count: "Too many files",
      },
    },
  });

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Field>
        <FieldLabel>{t.label}</FieldLabel>
        <FieldControl>
          <FileInput
            accept="image/png,image/jpeg"
            maxSize={MB}
            onReject={(rejections) =>
              setRejected(rejections.map((rejection) => t.reasons[rejection.reason]))
            }
            onValueChange={() => setRejected([])}
          />
        </FieldControl>
        <FieldDescription>{t.description}</FieldDescription>
      </Field>
      <ul role="status" className="text-sm text-red-600">
        {rejected.map((reason) => (
          <li key={reason}>{reason}</li>
        ))}
      </ul>
    </div>
  );
}
