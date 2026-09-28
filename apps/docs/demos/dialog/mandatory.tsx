"use client";

import {
  Button,
  Checkbox,
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function DialogMandatoryDemo() {
  const [open, setOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const t = useCopy({
    fa: {
      open: "نمایش پنجره رضایت",
      title: "پیش از ادامه",
      description: "برای استفاده از ضبط صدا باید شرایط استفاده را بپذیرید.",
      agree: "شرایط استفاده را خواندم و می‌پذیرم",
      continue: "ادامه",
    },
    en: {
      open: "Show consent dialog",
      title: "Before you continue",
      description: "Voice recording needs your agreement to the terms of use.",
      agree: "I have read and accept the terms of use",
      continue: "Continue",
    },
  });

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        {t.open}
      </Button>
      <Dialog open={open}>
        <DialogContent
          size="sm"
          // Mandatory: no close button, and neither Escape nor a click on the scrim closes it.
          showClose={false}
          onEscapeKeyDown={(event) => event.preventDefault()}
          onInteractOutside={(event) => event.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>{t.title}</DialogTitle>
            <DialogDescription>{t.description}</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <label className="flex items-center gap-3 text-sm text-gray-700">
              <Checkbox checked={agreed} onCheckedChange={(value) => setAgreed(value === true)} />
              {t.agree}
            </label>
          </DialogBody>
          <DialogFooter>
            <Button disabled={!agreed} onClick={() => setOpen(false)}>
              {t.continue}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
