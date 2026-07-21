import type { Meta, StoryObj } from "@storybook/react-vite";
import { ListingCard } from "./ListingCard.js";

const meta: Meta<typeof ListingCard> = {
  title: "Blocks/ListingCard",
  component: ListingCard,
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ListingCard>;

export const Service: Story = {
  args: {
    title: "طراحی سایت و سئو",
    href: "#",
    category: "سئو",
    excerpt: "<p>انواع طراحی سایت و سئو اعم از فروشگاهی، شرکتی، آموزشی و شخصی</p>",
    authorName: "زینب فلاح",
    price: 20_000_000,
    likes: 0,
  },
};

export const WithoutAuthor: Story = {
  args: {
    title: "طراحی سایت با وردپرس",
    href: "#",
    category: "پشتیبانی",
    excerpt: "<p>راه‌اندازی و پشتیبانی سایت وردپرسی</p>",
    price: 8_500_000,
    likes: 12,
  },
};

export const TitleOnly: Story = {
  args: { title: "مشاوره فنی", href: "#" },
};
