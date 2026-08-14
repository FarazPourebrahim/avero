"use client";

import {
  Badge,
  IconButton,
  MetaItem,
  PillTab,
  PillTabs,
  ProfileHeader,
  TelegramIcon,
} from "@avero/react";
import { tokens } from "@avero/tokens";

// Inline SVG artwork keeps the demo deterministic and offline (no remote images).
const GROUND = tokens.colorPrimary.value;
const AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="${GROUND}"/></svg>`,
  );

export default function ProfileHeaderInstructorDemo() {
  return (
    <ProfileHeader
      name="سارا محمدی"
      image={AVATAR}
      headline="مدرس طراحی رابط کاربری"
      badge={<Badge variant="premium">مدرس برگزیده</Badge>}
      meta={
        <>
          <MetaItem variant="pill">اصفهان (ایران)</MetaItem>
          <MetaItem>عضویت: ۳ ماه پیش</MetaItem>
        </>
      }
      tabs={
        <PillTabs aria-label="بخش‌های پروفایل">
          <PillTab href="#" current>
            درباره من
          </PillTab>
          <PillTab href="#">دوره‌ها (3)</PillTab>
          <PillTab href="#">گواهی‌ها (2)</PillTab>
        </PillTabs>
      }
      socials={
        <IconButton label="تلگرام" variant="social">
          <TelegramIcon />
        </IconButton>
      }
    />
  );
}
