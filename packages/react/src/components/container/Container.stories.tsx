import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "./Container.js";

const meta: Meta<typeof Container> = {
  title: "Layout/Container",
  component: Container,
  argTypes: {
    size: { control: "inline-radio", options: ["default", "prose", "full"] },
    gutter: { control: "inline-radio", options: ["default", "tight", "none"] },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Sizes: Story = {
  render: () => (
    <div className="w-full space-y-4 bg-gray-100 py-4">
      {(["default", "prose", "full"] as const).map((size) => (
        <Container key={size} size={size}>
          <div className="rounded-xl bg-white p-4 text-sm text-gray-600">{size}</div>
        </Container>
      ))}
    </div>
  ),
};

export const Gutters: Story = {
  render: () => (
    <div className="w-full space-y-4 bg-gray-100 py-4">
      {(["default", "tight", "none"] as const).map((gutter) => (
        <Container key={gutter} gutter={gutter}>
          <div className="rounded-xl bg-white p-4 text-sm text-gray-600">{gutter}</div>
        </Container>
      ))}
    </div>
  ),
};
