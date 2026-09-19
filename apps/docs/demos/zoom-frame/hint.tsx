"use client";

import { ZoomFrame } from "@averoui/react";
import { tokens } from "@averoui/tokens";
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

export default function ZoomFrameHintDemo() {
  const t = useCopy({
    fa: {
      progressAlt: "نمودار پیشرفت دوره",
      gradesAlt: "جدول نمرات تمرین‌ها",
      hint: "نمایش نمودار کامل",
    },
    en: {
      progressAlt: "Course progress chart",
      gradesAlt: "Exercise marks table",
      hint: "View the full chart",
    },
  });

  const shots = [
    {
      alt: t.progressAlt,
      hint: undefined,
      src: artwork(tokens.colorPrimary.value, tokens.colorPrimaryHover.value),
    },
    {
      alt: t.gradesAlt,
      hint: t.hint,
      src: artwork(tokens.colorSecondary.value, tokens.colorWarning.value),
    },
  ];

  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-4">
      {shots.map((shot) => (
        <ZoomFrame key={shot.alt} hint={shot.hint}>
          <img
            src={shot.src}
            alt={shot.alt}
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
        </ZoomFrame>
      ))}
    </div>
  );
}
