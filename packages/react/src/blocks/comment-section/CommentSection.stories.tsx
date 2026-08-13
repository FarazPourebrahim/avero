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
    placeholder: "دیدگاه خود را درباره این مقاله بنویسید…",
    hint: "دیدگاه‌ها پس از بررسی منتشر می‌شوند.",
  },
};

export const Service: Story = {
  args: {
    variant: "service",
    title: "دیدگاه شرکت‌کنندگان",
    count: 0,
    placeholder: "دیدگاه خود را درباره این دوره بنویسید…",
  },
};
