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

export const Course: Story = {
  args: {
    title: "مبانی طراحی رابط کاربری",
    href: "#",
    category: "طراحی",
    excerpt: "<p>از اصول چیدمان و رنگ تا ساختن نخستین نمونه اولیه در Figma</p>",
    authorName: "سارا محمدی",
    price: 4_500_000,
    likes: 0,
  },
};

export const WithoutAuthor: Story = {
  args: {
    title: "تحلیل داده با Python",
    href: "#",
    category: "داده",
    excerpt: "<p>کار با Pandas و رسم نمودار برای داده‌های واقعی</p>",
    price: 3_800_000,
    likes: 12,
  },
};

export const TitleOnly: Story = {
  args: { title: "کارگاه نویسندگی خلاق", href: "#" },
};
