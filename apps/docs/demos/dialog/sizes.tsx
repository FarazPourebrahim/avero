"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@averoui/react";
import { useCopy } from "../copy";

const SIZES = ["sm", "md", "lg"] as const;

export default function DialogSizesDemo() {
  const t = useCopy({
    fa: {
      labels: { sm: "کوچک", md: "متوسط", lg: "بزرگ" },
      bodies: {
        sm: "برای تأییدهای کوتاه.",
        md: "اندازه پیش‌فرض؛ برای فرم‌ها.",
        lg: "برای محتوای سنگین‌تر مثل پیش‌نمایش.",
      },
      title: (label: string) => `پنجره ${label}`,
    },
    en: {
      labels: { sm: "Small", md: "Medium", lg: "Large" },
      bodies: {
        sm: "For short confirmations.",
        md: "The default size, for forms.",
        lg: "For heavier content such as a preview.",
      },
      title: (label: string) => `${label} dialog`,
    },
  });

  return (
    <div className="flex flex-wrap gap-2">
      {SIZES.map((size) => (
        <Dialog key={size}>
          <DialogTrigger asChild>
            <Button variant="outline">{t.labels[size]}</Button>
          </DialogTrigger>
          <DialogContent size={size} aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>{t.title(t.labels[size])}</DialogTitle>
            </DialogHeader>
            <DialogBody>{t.bodies[size]}</DialogBody>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
