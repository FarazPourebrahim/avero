import type { Meta, StoryObj } from "@storybook/react-vite";
import { SuggestionItem } from "./SuggestionItem.js";

const meta: Meta<typeof SuggestionItem> = {
  title: "Blocks/SuggestionItem",
  component: SuggestionItem,
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SuggestionItem>;

export const Suggested: Story = {
  args: {
    title: "مبانی تحلیل داده",
    href: "#",
    description: "کار با داده‌های واقعی و رسم نمودار در Python",
    tags: ["آنلاین"],
    match: 8,
  },
};

export const HighMatch: Story = {
  args: {
    title: "طراحی سیستم طراحی در Figma",
    href: "#",
    description: "ساختن کتابخانه کامپوننت و توکن‌های طراحی",
    tags: ["پیشرفته", "آنلاین"],
    match: 92,
  },
};

export const TitleOnly: Story = {
  args: { title: "دوره بدون جزئیات" },
};
