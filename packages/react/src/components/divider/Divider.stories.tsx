import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider, type DividerProps } from "./Divider.js";

const meta = {
  title: "Primitives/Divider",
  component: Divider,
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    tone: { control: "inline-radio", options: ["gray", "slate", "strong"] },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args: DividerProps) => (
    <div className="flex h-24 w-80 items-center gap-4 rounded-2xl bg-white p-4">
      <span className="text-sm text-gray-600">پیش</span>
      <Divider {...args} />
      <span className="text-sm text-gray-600">پس</span>
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-6 rounded-2xl bg-white p-6">
      <Divider tone="gray" />
      <Divider tone="slate" />
      <Divider tone="strong" />
    </div>
  ),
};
