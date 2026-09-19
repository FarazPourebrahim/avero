"use client";

import { PromoBanner } from "@averoui/react";
import { tokens } from "@averoui/tokens";
import { useCopy } from "../copy";

// Inline SVG artwork keeps the demo deterministic and offline (no remote images).
const GROUND = tokens.colorPrimary.value;
const HIGHLIGHT = tokens.colorSurfaceGlass.value;
const ARTWORK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 400"><rect width="320" height="400" fill="${GROUND}"/><circle cx="160" cy="170" r="70" fill="${HIGHLIGHT}"/><rect x="48" y="300" width="224" height="32" rx="16" fill="${HIGHLIGHT}"/></svg>`,
  );

export default function PromoBannerSidebarDemo() {
  const t = useCopy({
    fa: { newCourses: "دوره‌های تازه", workshop: "ثبت‌نام در کارگاه" },
    en: { newCourses: "New courses", workshop: "Sign up for the workshop" },
  });

  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <PromoBanner href="#" image={ARTWORK} label={t.newCourses} />
      <PromoBanner href="#" image={ARTWORK} label={t.workshop} variant="project" />
    </div>
  );
}
