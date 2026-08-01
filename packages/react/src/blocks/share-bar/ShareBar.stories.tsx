import type { Meta, StoryObj } from "@storybook/react-vite";
import { ShareBar } from "./ShareBar.js";

const meta: Meta<typeof ShareBar> = {
  title: "Blocks/ShareBar",
  component: ShareBar,
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ShareBar>;

export const Icons: Story = {};

export const Labelled: Story = {
  args: { variant: "labelled", label: "اشتراک‌گذاری خدمت:" },
};
