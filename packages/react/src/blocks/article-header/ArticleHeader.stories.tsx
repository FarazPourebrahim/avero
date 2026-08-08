import { tokens } from "@avero/tokens";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetaItem } from "../../components/meta/index.js";
import { CalendarSolidIcon, ClockSolidIcon } from "../../icons/referenceIcons.generated.js";
import { ArticleHeader } from "./ArticleHeader.js";

// Inline SVG artwork keeps stories deterministic and offline (no remote images).
const GROUND = tokens.colorPrimary.value;
const HIGHLIGHT = tokens.colorSurfaceGlass.value;
const COVER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 500"><rect width="1200" height="500" fill="${GROUND}"/><circle cx="900" cy="180" r="120" fill="${HIGHLIGHT}"/></svg>`,
  );

const meta: Meta<typeof ArticleHeader> = {
  title: "Blocks/ArticleHeader",
  component: ArticleHeader,
  decorators: [
    (Story) => (
      <div className="max-w-4xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArticleHeader>;

export const BlogPost: Story = {
  args: {
    title: "فریلنسری چیست؟ راهنمای کامل شروع کار به عنوان فریلنسر",
    image: COVER,
    meta: (
      <>
        <MetaItem icon={<CalendarSolidIcon size={14} />} label="انتشار:">
          <time dateTime="2026-08-25">۳ شهریور ۱۴۰۵</time>
        </MetaItem>
        <MetaItem icon={<ClockSolidIcon size={14} />}>۱۲ دقیقه مطالعه</MetaItem>
      </>
    ),
  },
};

export const WithoutCover: Story = {
  args: { title: "چطور اولین پروژه فریلنسری خود را بگیریم؟" },
};
