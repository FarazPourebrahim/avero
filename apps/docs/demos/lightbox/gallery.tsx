"use client";

import { Lightbox, ZoomFrame, type LightboxImage } from "@averoui/react";
import { tokens } from "@averoui/tokens";
import { useState } from "react";

// Inline SVG artwork keeps the demo deterministic and offline (no remote images).
function artwork(from: string, to: string) {
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="800" height="500" fill="url(#g)"/></svg>`,
    )
  );
}

const images: LightboxImage[] = [
  {
    src: artwork(tokens.colorPrimary.value, tokens.colorPrimaryHover.value),
    alt: "صفحه اصلی اپلیکیشن آموزشی",
    caption: "طراحی صفحه اصلی",
  },
  {
    src: artwork(tokens.colorSecondary.value, tokens.colorWarning.value),
    alt: "صفحه پروفایل مدرس",
  },
  {
    src: artwork(tokens.colorChartComments.value, tokens.colorChartViews.value),
    alt: "داشبورد گزارش‌ها",
    caption: "نمودار فعالیت هفتگی",
  },
];

export default function LightboxGalleryDemo() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
      {images.map((image, position) => (
        <ZoomFrame
          key={image.alt}
          onClick={() => {
            setIndex(position);
            setOpen(true);
          }}
        >
          <img src={image.src} alt={image.alt} className="h-32 w-full rounded-2xl object-cover" />
        </ZoomFrame>
      ))}
      <Lightbox
        images={images}
        open={open}
        onOpenChange={setOpen}
        index={index}
        onIndexChange={setIndex}
      />
    </div>
  );
}
