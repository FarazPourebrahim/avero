"use client";

import { CoverHeader, MetaBar, MetaItem } from "@averoui/react";
import { tokens } from "@averoui/tokens";
import { useCopy } from "../copy";

// Inline SVG artwork keeps the demo deterministic and offline (no remote images).
const AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="${tokens.colorPrimary.value}"/><circle cx="100" cy="78" r="38" fill="${tokens.colorPrimaryHover.value}"/><rect x="34" y="130" width="132" height="70" rx="35" fill="${tokens.colorPrimaryHover.value}"/></svg>`,
  );

export default function CoverHeaderProfileDemo() {
  const t = useCopy({
    fa: {
      name: "سارا محمدی",
      sections: "بخش‌های پروفایل",
      about: "درباره من",
      courses: "دوره‌ها (۳)",
      headline: "مدرس طراحی رابط کاربری",
      location: "اصفهان (ایران)",
      joined: "عضویت: ۳ ماه پیش",
    },
    en: {
      name: "Sara Mohammadi",
      sections: "Profile sections",
      about: "About me",
      courses: "Courses (3)",
      headline: "UI design instructor",
      location: "Isfahan, Iran",
      joined: "Joined 3 months ago",
    },
  });

  return (
    <CoverHeader
      className="w-full"
      avatar={<img src={AVATAR} alt={t.name} />}
      footer={
        <nav aria-label={t.sections}>
          <ul className="flex min-w-max items-center gap-2 text-xs text-gray-600 sm:gap-3 sm:text-sm">
            <li>
              <span className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 font-bold text-white shadow-md sm:px-4 sm:py-2.5">
                {t.about}
              </span>
            </li>
            <li>
              <span className="flex items-center gap-1.5 rounded-xl bg-slate-50 px-3.5 py-2 font-bold text-slate-600 sm:px-4 sm:py-2.5">
                {t.courses}
              </span>
            </li>
          </ul>
        </nav>
      }
    >
      <h3 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">{t.name}</h3>
      <p className="mb-3 text-sm font-medium text-gray-600 md:text-base">{t.headline}</p>
      <MetaBar variant="inline" className="justify-center lg:justify-start">
        <MetaItem variant="pill">{t.location}</MetaItem>
        <MetaItem variant="compact">{t.joined}</MetaItem>
      </MetaBar>
    </CoverHeader>
  );
}
