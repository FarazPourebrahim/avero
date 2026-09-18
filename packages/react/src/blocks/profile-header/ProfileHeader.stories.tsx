import { tokens } from "@averoui/tokens";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../../components/badge/index.js";
import { IconButton } from "../../components/icon-button/index.js";
import { MetaItem } from "../../components/meta/index.js";
import { PillTab, PillTabs } from "../../components/pill-tabs/index.js";
import { TelegramIcon } from "../../icons/publicIcons.js";
import { ProfileHeader } from "./ProfileHeader.js";

// Inline SVG artwork keeps stories deterministic and offline (no remote images).
const GROUND = tokens.colorPrimary.value;
const AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="${GROUND}"/></svg>`,
  );

const meta: Meta<typeof ProfileHeader> = {
  title: "Blocks/ProfileHeader",
  component: ProfileHeader,
};

export default meta;
type Story = StoryObj<typeof ProfileHeader>;

export const Instructor: Story = {
  args: {
    name: "سارا محمدی",
    image: AVATAR,
    headline: "مدرس طراحی رابط کاربری",
    badge: <Badge variant="premium">مدرس برگزیده</Badge>,
    meta: (
      <>
        <MetaItem variant="pill">اصفهان (ایران)</MetaItem>
        <MetaItem>عضویت: ۳ ماه پیش</MetaItem>
      </>
    ),
    tabs: (
      <PillTabs aria-label="بخش‌های پروفایل">
        <PillTab href="#" current>
          درباره من
        </PillTab>
        <PillTab href="#">دوره‌ها (3)</PillTab>
        <PillTab href="#">گواهی‌ها (2)</PillTab>
      </PillTabs>
    ),
    socials: (
      <IconButton label="تلگرام" variant="social">
        <TelegramIcon />
      </IconButton>
    ),
  },
};

export const WithoutFooter: Story = {
  args: { name: "علی کریمی", image: AVATAR, headline: "مدرس تحلیل داده" },
};
