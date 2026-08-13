import type { Meta, StoryObj } from "@storybook/react-vite";
import { ReactionBar } from "./ReactionBar.js";

const meta: Meta<typeof ReactionBar> = {
  title: "Blocks/ReactionBar",
  component: ReactionBar,
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ReactionBar>;

export const Project: Story = {
  args: { likes: 0, views: 4, capacity: "حداکثر 15 نفر", saved: false },
};

export const Engaged: Story = {
  args: { likes: 12, views: 340, capacity: "حداکثر 15 نفر", saved: true, liked: true },
};
