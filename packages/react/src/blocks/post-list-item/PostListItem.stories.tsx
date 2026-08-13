import type { Meta, StoryObj } from "@storybook/react-vite";
import { PostListItem } from "./PostListItem.js";

const meta: Meta<typeof PostListItem> = {
  title: "Blocks/PostListItem",
  component: PostListItem,
  decorators: [
    (Story) => (
      <ul className="max-w-sm space-y-4">
        <Story />
      </ul>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PostListItem>;

export const Related: Story = {
  args: {
    title: "ده اصل طراحی رابط کاربری که هر طراح تازه‌کاری باید بداند",
    href: "#",
    author: "سارا محمدی",
    readTime: "5 دقیقه",
  },
};

export const TitleOnly: Story = {
  args: { title: "آشنایی با اصول تایپوگرافی فارسی", href: "#" },
};
