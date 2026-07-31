import type { Meta, StoryObj } from "@storybook/react-vite";
import { CommentSection } from "./CommentSection.js";

const meta: Meta<typeof CommentSection> = {
  title: "Blocks/CommentSection",
  component: CommentSection,
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CommentSection>;

export const Article: Story = {
  args: {
    count: 0,
    placeholder: "نظر خود را درباره این مقاله بنویسید...",
    hint: "نظرات پس از بررسی و تایید مدیر منتشر خواهند شد.",
  },
};

export const Service: Story = {
  args: {
    variant: "service",
    title: "نظرات و دیدگاه‌های کاربران",
    count: 0,
    placeholder: "نظر خود را درباره این خدمت بنویسید...",
  },
};
