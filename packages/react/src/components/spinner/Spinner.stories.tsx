import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./Spinner.js";

const meta = {
  title: "Primitives/Spinner",
  component: Spinner,
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["ring", "track", "glow", "dots", "bars", "spokes"],
    },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl"] },
    tone: { control: "inline-radio", options: ["current", "primary", "muted", "inverse"] },
  },
  decorators: [
    (Story) => (
      <div className="rounded-2xl bg-white p-6 text-gray-700">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { labelled: true } };

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner tone="primary" size="md" />
      <Spinner tone="muted" size="md" />
      <span className="bg-primary inline-flex rounded-lg p-2">
        <Spinner tone="inverse" size="md" />
      </span>
    </div>
  ),
};

export const Glow: Story = {
  args: { variant: "glow", size: "xl", labelled: true },
};

export const Variants: Story = {
  render: () => (
    <div className="text-primary flex items-center gap-6">
      <Spinner variant="ring" size="lg" />
      <Spinner variant="track" size="lg" />
      <Spinner variant="glow" size="lg" />
      <Spinner variant="dots" size="lg" />
      <Spinner variant="bars" size="lg" />
      <Spinner variant="spokes" size="lg" />
    </div>
  ),
};
