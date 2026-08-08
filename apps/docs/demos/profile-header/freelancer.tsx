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

export default function ProfileHeaderFreelancerDemo() {
  return (
    <ProfileHeader
      name="فلاح"
      image={AVATAR}
      headline="طراحی انواع سایت و سئو"
      badge={<Badge variant="premium">پکیج رایگان</Badge>}
      meta={
        <>
          <MetaItem variant="pill">تهران (ایران)</MetaItem>
          <MetaItem>تاریخ عضویت: ۲ هفته پیش</MetaItem>
        </>
      }
      tabs={
        <PillTabs aria-label="بخش‌های پروفایل">
          <PillTab href="#" current>
            درباره من
          </PillTab>
          <PillTab href="#">خدمات (1)</PillTab>
          <PillTab href="#">نمونه کار (4)</PillTab>
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
