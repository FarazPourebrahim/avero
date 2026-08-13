import type { Meta, StoryObj } from "@storybook/react-vite";
import { AuthorCard } from "./AuthorCard.js";

const meta: Meta<typeof AuthorCard> = {
  title: "Blocks/AuthorCard",
  component: AuthorCard,
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AuthorCard>;

export const Author: Story = {
  args: {
    name: "سارا محمدی",
    roleLabel: "سردبیر وبلاگ",
    bio: "طراح محصول و علاقه‌مند به آموزش؛ در این وبلاگ از تجربه‌های روزمره‌ام در طراحی رابط کاربری و ساختن سیستم‌های طراحی می‌نویسم. ✏️",
  },
};

export const NameOnly: Story = {
  args: { name: "علی کریمی" },
};
