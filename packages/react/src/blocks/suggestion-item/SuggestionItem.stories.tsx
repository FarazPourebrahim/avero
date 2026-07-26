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
    title: "طراحی سایت عمده فروش",
    href: "#",
    description: "طراحی فروشگاه اینترنتی با پنل مدیریت",
    tags: ["remote"],
    match: 8,
  },
};

export const HighMatch: Story = {
  args: {
    title: "توسعه اپلیکیشن موبایل",
    href: "#",
    description: "اپلیکیشن فروشگاهی برای اندروید و iOS",
    tags: ["freelance", "remote"],
    match: 92,
  },
};

export const TitleOnly: Story = {
  args: { title: "پروژه بدون جزئیات" },
};
