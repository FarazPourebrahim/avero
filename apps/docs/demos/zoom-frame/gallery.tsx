import { ZoomFrame } from "@avero/react";
import { tokens } from "@avero/tokens";

// Inline SVG artwork keeps the demo deterministic and offline (no remote images).
const ARTWORK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${tokens.colorPrimary.value}"/><stop offset="1" stop-color="${tokens.colorPrimaryHover.value}"/></linearGradient></defs><rect width="800" height="450" fill="url(#g)"/><circle cx="600" cy="120" r="80" fill="${tokens.colorSurfaceGlass.value}"/></svg>`,
  );

export default function ZoomFrameGalleryDemo() {
  return (
    <div className="w-full max-w-xl">
      <ZoomFrame>
        <img
          src={ARTWORK}
          alt="نمونه طرح رابط کاربری"
          className="h-60 w-full rounded-2xl object-cover"
        />
      </ZoomFrame>
    </div>
  );
}
