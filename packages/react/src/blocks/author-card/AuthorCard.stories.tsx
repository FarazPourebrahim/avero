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
    name: "محمد ابراهیمی",
    roleLabel: "مدیر دورلنسر",
    bio: "یه برنامه‌نویس و عاشق دنیای تکنولوژی‌ام که دورلنسر رو با هدف ساختن یه فضای بهتر برای همکاری فریلنسرها و کارفرماها راه‌اندازی کردم. اینجا سعی می‌کنیم کار کردن، پیدا کردن پروژه و همکاری رو ساده‌تر و حرفه‌ای‌تر کنیم. 🚀",
  },
};

export const NameOnly: Story = {
  args: { name: "زینب فلاح" },
};
