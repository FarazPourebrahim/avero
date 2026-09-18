import { ResponsiveBanner } from "@averoui/react";
import { tokens } from "@averoui/tokens";

// Inline SVG artwork keeps the demo deterministic and offline (no remote images). The two
// artworks differ in shape and colour, so the swap is visible when the window is resized.
function artwork(width: number, height: number, from: string, to: string) {
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="${width}" height="${height}" fill="url(#g)"/></svg>`,
    )
  );
}

export default function ResponsiveBannerCampaignDemo() {
  return (
    <div className="w-full max-w-3xl">
      <ResponsiveBanner
        desktopSrc={artwork(1200, 300, tokens.colorPrimary.value, tokens.colorPrimaryHover.value)}
        mobileSrc={artwork(600, 400, tokens.colorSecondary.value, tokens.colorWarning.value)}
        alt="جشنواره ثبت‌نام پاییز با تخفیف ویژه"
      />
    </div>
  );
}
