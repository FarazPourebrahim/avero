"use client";

import { ArticleHeader, CalendarSolidIcon, ClockSolidIcon, MetaItem } from "@averoui/react";
import { tokens } from "@averoui/tokens";
import { useCopy } from "../copy";

// Inline SVG artwork keeps the demo deterministic and offline (no remote images).
const GROUND = tokens.colorPrimary.value;
const HIGHLIGHT = tokens.colorSurfaceGlass.value;
const COVER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 500"><rect width="1200" height="500" fill="${GROUND}"/><circle cx="900" cy="180" r="120" fill="${HIGHLIGHT}"/></svg>`,
  );

export default function ArticleHeaderBlogPostDemo() {
  const t = useCopy({
    fa: {
      title: "چطور یک سیستم طراحی بسازیم؟ راهنمای گام‌به‌گام",
      published: "انتشار:",
      date: "۱۲ مهر ۱۴۰۵",
      readTime: "۱۲ دقیقه مطالعه",
    },
    en: {
      title: "How to build a design system: a step-by-step guide",
      published: "Published:",
      date: "4 October 2026",
      readTime: "12 min read",
    },
  });

  return (
    <ArticleHeader
      title={t.title}
      image={COVER}
      meta={
        <>
          <MetaItem icon={<CalendarSolidIcon size={14} />} label={t.published}>
            <time dateTime="2026-10-04">{t.date}</time>
          </MetaItem>
          <MetaItem icon={<ClockSolidIcon size={14} />}>{t.readTime}</MetaItem>
        </>
      }
    />
  );
}
