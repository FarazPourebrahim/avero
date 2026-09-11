import { ZoomFrame } from "@avero/react";
import { tokens } from "@avero/tokens";

// Inline SVG artwork keeps the demo deterministic and offline (no remote images).
function artwork(from: string, to: string) {
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/></svg>`,
    )
  );
}

const SHOTS = [
  {
    alt: "نمودار پیشرفت دوره",
    hint: undefined,
    src: artwork(tokens.colorPrimary.value, tokens.colorPrimaryHover.value),
  },
  {
    alt: "جدول نمرات تمرین‌ها",
    hint: "نمایش نمودار کامل",
    src: artwork(tokens.colorSecondary.value, tokens.colorWarning.value),
  },
];

export default function ZoomFrameHintDemo() {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-4">
      {SHOTS.map((shot) => (
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
