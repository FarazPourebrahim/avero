"use client";

import { Button, Lightbox, type LightboxImage } from "@averoui/react";
import { tokens } from "@averoui/tokens";
import { useState } from "react";
import { useCopy } from "../copy";

// Inline SVG artwork keeps the demo deterministic and offline (no remote images).
function artwork(from: string, to: string) {
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/></svg>`,
    )
  );
}

export default function LightboxCaptionsDemo() {
  const [open, setOpen] = useState(false);
  const t = useCopy({
    fa: {
      open: "باز کردن از تصویر دوم",
      homeAlt: "صفحه نخست اپلیکیشن",
      homeCaption: "صفحه نخست، نسخه نهایی",
      searchAlt: "صفحه جستجو",
      searchCaption: "صفحه جستجو با پالایه‌های باز",
    },
    en: {
      open: "Open on the second image",
      homeAlt: "The app's home screen",
      homeCaption: "Home screen, final version",
      searchAlt: "The search screen",
      searchCaption: "Search screen with the filters open",
    },
  });

  const shots: LightboxImage[] = [
    {
      src: artwork(tokens.colorPrimary.value, tokens.colorPrimaryHover.value),
      alt: t.homeAlt,
      caption: t.homeCaption,
    },
    {
      src: artwork(tokens.colorSecondary.value, tokens.colorWarning.value),
      alt: t.searchAlt,
      caption: t.searchCaption,
    },
  ];

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        {t.open}
      </Button>
      <Lightbox images={shots} open={open} onOpenChange={setOpen} defaultIndex={1} />
    </>
  );
}
