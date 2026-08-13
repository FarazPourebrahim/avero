import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea.js";

const meta: Meta<typeof Textarea> = {
  title: "Forms/Textarea",
  component: Textarea,
  args: {
    "aria-label": "دیدگاه",
    placeholder: "دیدگاه خود را درباره این مقاله بنویسید…",
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["soft", "slate"] },
    resize: { control: "inline-radio", options: ["none", "vertical"] },
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Soft: Story = {};

export const Slate: Story = {
  args: { variant: "slate", rows: 3, placeholder: "دیدگاه خود را درباره این دوره بنویسید…" },
};

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "کوتاه" },
};
