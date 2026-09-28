"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function DialogControlledDemo() {
  // `open` and `onOpenChange` belong on `Dialog`, the root, not on `DialogContent`.
  const [open, setOpen] = useState(false);
  const t = useCopy({
    fa: {
      open: "نمایش میان‌برها",
      title: "میان‌برهای صفحه‌کلید",
      body: "با کلید / جست‌وجو را باز کنید و با Esc هر پنجره‌ای را ببندید.",
      close: "متوجه شدم",
    },
    en: {
      open: "Show shortcuts",
      title: "Keyboard shortcuts",
      body: "Press / to search and Esc to close any window.",
      close: "Got it",
    },
  });

  return (
    <>
      {/* No DialogTrigger: the dialog opens from code, and focus still returns here on close. */}
      <Button variant="outline" onClick={() => setOpen(true)}>
        {t.open}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent size="sm" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>{t.title}</DialogTitle>
          </DialogHeader>
          <DialogBody>{t.body}</DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button>{t.close}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
