"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@avero/react";

const SIZES = [
  { size: "sm", label: "کوچک", body: "برای تأییدهای کوتاه." },
  { size: "md", label: "متوسط", body: "اندازه پیش‌فرض؛ برای فرم‌ها." },
  { size: "lg", label: "بزرگ", body: "برای محتوای سنگین‌تر مثل پیش‌نمایش." },
] as const;

export default function DialogSizesDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {SIZES.map(({ size, label, body }) => (
        <Dialog key={size}>
          <DialogTrigger asChild>
            <Button variant="outline">{label}</Button>
          </DialogTrigger>
          <DialogContent size={size} aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>پنجره {label}</DialogTitle>
            </DialogHeader>
            <DialogBody>{body}</DialogBody>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
