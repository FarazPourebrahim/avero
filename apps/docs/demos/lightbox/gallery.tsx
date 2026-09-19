"use client";

import { Lightbox, ZoomFrame, type LightboxImage } from "@averoui/react";
import { tokens } from "@averoui/tokens";
import { useState } from "react";
import { useCopy } from "../copy";

// Inline SVG artwork keeps the demo deterministic and offline (no remote images).
function artwork(from: string, to: string) {
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="800" height="500" fill="url(#g)"/></svg>`,
    )
  );
}

export default function LightboxGalleryDemo() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const t = useCopy({
    fa: {
      homeAlt: "صفحه اصلی اپلیکیشن آموزشی",
      homeCaption: "طراحی صفحه اصلی",
      profileAlt: "صفحه پروفایل مدرس",
      reportsAlt: "داشبورد گزارش‌ها",
      reportsCaption: "نمودار فعالیت هفتگی",
    },
    en: {
      homeAlt: "The learning app's home screen",
      homeCaption: "Home screen design",
      profileAlt: "The instructor profile screen",
      reportsAlt: "The reports dashboard",
      reportsCaption: "Weekly activity chart",
    },
  });

  const images: LightboxImage[] = [
    {
      src: artwork(tokens.colorPrimary.value, tokens.colorPrimaryHover.value),
      alt: t.homeAlt,
      caption: t.homeCaption,
    },
    {
      src: artwork(tokens.colorSecondary.value, tokens.colorWarning.value),
      alt: t.profileAlt,
    },
    {
      src: artwork(tokens.colorChartComments.value, tokens.colorChartViews.value),
      alt: t.reportsAlt,
      caption: t.reportsCaption,
    },
  ];

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
