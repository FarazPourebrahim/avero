import type { Meta, StoryObj } from "@storybook/react-vite";
import { ShowcaseCard } from "./ShowcaseCard.js";

const meta: Meta<typeof ShowcaseCard> = {
  title: "Blocks/ShowcaseCard",
  component: ShowcaseCard,
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ShowcaseCard>;

export const Portfolio: Story = {
  args: {
    title: "طراحی سایت طراحی سایت و سئو",
    href: "#",
    description: "طراحی سایت برای خدمات طراحی سایت و سئو و غیره",
    tags: ["وردپرس"],
    likes: 0,
    onShare: () => {},
  },
};

export const ManyTags: Story = {
  args: {
    title: "خدمات ساختمانی",
    href: "#",
    description: "طراحی و اجرای پروژه‌های ساختمانی",
    tags: ["وردپرس", "سئو", "طراحی"],
    likes: 12,
    liked: true,
    onShare: () => {},
  },
};

export const TitleOnly: Story = {
  args: { title: "مشاوره فنی" },
};
