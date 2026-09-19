"use client";

import {
  Badge,
  IconButton,
  MetaItem,
  PillTab,
  PillTabs,
  ProfileHeader,
  TelegramIcon,
} from "@averoui/react";
import { tokens } from "@averoui/tokens";
import { useCopy } from "../copy";

// Inline SVG artwork keeps the demo deterministic and offline (no remote images).
const GROUND = tokens.colorPrimary.value;
const AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="${GROUND}"/></svg>`,
  );

export default function ProfileHeaderInstructorDemo() {
  const t = useCopy({
    fa: {
      name: "سارا محمدی",
      headline: "مدرس طراحی رابط کاربری",
      badge: "مدرس برگزیده",
      location: "اصفهان (ایران)",
      joined: "عضویت: ۳ ماه پیش",
      sections: "بخش‌های پروفایل",
      about: "درباره من",
      courses: "دوره‌ها (۳)",
      certificates: "گواهی‌ها (۲)",
      telegram: "تلگرام",
    },
    en: {
      name: "Sara Mohammadi",
      headline: "UI design instructor",
      badge: "Featured instructor",
      location: "Isfahan, Iran",
      joined: "Joined 3 months ago",
      sections: "Profile sections",
      about: "About me",
      courses: "Courses (3)",
      certificates: "Certificates (2)",
      telegram: "Telegram",
    },
  });

  return (
    <ProfileHeader
      name={t.name}
      image={AVATAR}
      headline={t.headline}
      badge={<Badge variant="premium">{t.badge}</Badge>}
      meta={
        <>
          <MetaItem variant="pill">{t.location}</MetaItem>
          <MetaItem>{t.joined}</MetaItem>
        </>
      }
      tabs={
        <PillTabs aria-label={t.sections}>
          <PillTab href="#" current>
            {t.about}
          </PillTab>
          <PillTab href="#">{t.courses}</PillTab>
          <PillTab href="#">{t.certificates}</PillTab>
        </PillTabs>
      }
      socials={
        <IconButton label={t.telegram} variant="social">
          <TelegramIcon />
        </IconButton>
      }
    />
  );
}
