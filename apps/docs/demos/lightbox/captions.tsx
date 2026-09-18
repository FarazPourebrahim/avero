"use client";

import { Button, Lightbox, type LightboxImage } from "@averoui/react";
import { tokens } from "@averoui/tokens";
import { useState } from "react";

// Inline SVG artwork keeps the demo deterministic and offline (no remote images).
function artwork(from: string, to: string) {
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/></svg>`,
    )
  );
}

const SHOTS: LightboxImage[] = [
  {
    src: artwork(tokens.colorPrimary.value, tokens.colorPrimaryHover.value),
    alt: "صفحه نخست اپلیکیشن",
    caption: "صفحه نخست، نسخه نهایی",
  },
  {
    src: artwork(tokens.colorSecondary.value, tokens.colorWarning.value),
    alt: "صفحه جستجو",
    caption: "صفحه جستجو با پالایه‌های باز",
  },
];

export default function LightboxCaptionsDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        باز کردن از تصویر دوم
      </Button>
      <Lightbox images={SHOTS} open={open} onOpenChange={setOpen} defaultIndex={1} />
    </>
  );
}
