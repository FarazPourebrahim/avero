import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton, SkeletonCard, SkeletonText } from "./Skeleton.js";

const meta = {
  title: "Primitives/Skeleton",
  component: Skeleton,
  argTypes: {
    animation: { control: "inline-radio", options: ["shimmer", "pulse", "none"] },
    shape: { control: "inline-radio", options: ["line", "title", "block", "circle"] },
  },
  decorators: [
    (Story) => (
      <div className="w-96 rounded-2xl bg-white p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { className: "w-48" } };

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Skeleton shape="title" className="w-2/3" />
      <Skeleton shape="line" className="w-full" />
      <Skeleton shape="block" className="h-24 w-full" />
      <Skeleton shape="circle" className="size-12" />
    </div>
  ),
};

export const Paragraph: Story = {
  render: () => <SkeletonText lines={4} />,
};

export const Card: Story = {
  render: () => <SkeletonCard footer />,
};

export const Pulse: Story = {
  render: () => <SkeletonCard animation="pulse" />,
};
