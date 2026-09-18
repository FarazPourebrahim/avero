import { ArticleHeader, CalendarSolidIcon, ClockSolidIcon, MetaItem } from "@averoui/react";
import { tokens } from "@averoui/tokens";

// Inline SVG artwork keeps the demo deterministic and offline (no remote images).
const GROUND = tokens.colorPrimary.value;
const HIGHLIGHT = tokens.colorSurfaceGlass.value;
const COVER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 500"><rect width="1200" height="500" fill="${GROUND}"/><circle cx="900" cy="180" r="120" fill="${HIGHLIGHT}"/></svg>`,
  );

export default function ArticleHeaderBlogPostDemo() {
  return (
    <ArticleHeader
      title="چطور یک سیستم طراحی بسازیم؟ راهنمای گام‌به‌گام"
      image={COVER}
      meta={
        <>
          <MetaItem icon={<CalendarSolidIcon size={14} />} label="انتشار:">
            <time dateTime="2026-10-04">۱۲ مهر ۱۴۰۵</time>
          </MetaItem>
          <MetaItem icon={<ClockSolidIcon size={14} />}>۱۲ دقیقه مطالعه</MetaItem>
        </>
      }
    />
  );
}
