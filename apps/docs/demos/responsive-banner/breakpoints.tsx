import { ResponsiveBanner } from "@averoui/react";
import { tokens } from "@averoui/tokens";

// Inline SVG artwork keeps the demo deterministic and offline (no remote images).
function artwork(width: number, height: number, from: string, to: string) {
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="${width}" height="${height}" fill="url(#g)"/></svg>`,
    )
  );
}

const DESKTOP = artwork(1200, 300, tokens.colorPrimary.value, tokens.colorPrimaryHover.value);
const MOBILE = artwork(600, 400, tokens.colorSecondary.value, tokens.colorWarning.value);

export default function ResponsiveBannerBreakpointsDemo() {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-5">
      <ResponsiveBanner
        breakpoint="sm"
        radius="lg"
        desktopSrc={DESKTOP}
        mobileSrc={MOBILE}
        alt="بنری که از ۴۰rem به بعد طرح عریض را نشان می‌دهد"
      />
      <ResponsiveBanner
        breakpoint="lg"
        desktopSrc={DESKTOP}
        mobileSrc={MOBILE}
        alt="بنری که تا ۶۴rem طرح بلند را نگه می‌دارد"
      />
    </div>
  );
}
