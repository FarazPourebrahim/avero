"use client";

import { Field, FieldControl, FieldDescription, FieldLabel, FileInput } from "@avero/react";
import { useState } from "react";

const MB = 1024 * 1024;

const REASONS = {
  type: "قالب پشتیبانی نمی‌شود",
  size: "حجم بیش از حد مجاز است",
  count: "تعداد فایل‌ها بیش از حد مجاز است",
};

export default function FileInputRejectionsDemo() {
  const [rejected, setRejected] = useState<string[]>([]);

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Field>
        <FieldLabel>تصویر جلد</FieldLabel>
        <FieldControl>
          <FileInput
            accept="image/png,image/jpeg"
            maxSize={MB}
            onReject={(rejections) =>
              setRejected(rejections.map((rejection) => REASONS[rejection.reason]))
            }
            onValueChange={() => setRejected([])}
          />
        </FieldControl>
        <FieldDescription>یک تصویر PNG یا JPEG تا ۱ مگابایت.</FieldDescription>
      </Field>
      <ul role="status" className="text-sm text-red-600">
        {rejected.map((reason) => (
          <li key={reason}>{reason}</li>
        ))}
      </ul>
    </div>
  );
}
