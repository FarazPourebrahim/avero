import { tokens } from "@avero/tokens";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar.js";

// An inline SVG portrait keeps stories deterministic and offline (no remote images).
const BACKGROUND = tokens.colorBorderSubtle.value;
const FIGURE = tokens.colorTextChrome.value;
const PORTRAIT =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${BACKGROUND}"/><circle cx="32" cy="25" r="12" fill="${FIGURE}"/><path d="M10 60c3-12 12-18 22-18s19 6 22 18" fill="${FIGURE}"/></svg>`,
  );

const meta = {
  title: "Primitives/Avatar",
  component: Avatar,
  args: { name: "Faraz Pourebrahim", src: PORTRAIT },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] },
    shape: { control: "inline-radio", options: ["circle", "xl", "2xl", "3xl"] },
    border: { control: "select", options: ["none", "hairline", "accent", "muted", "ring"] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      {(["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const).map((size) => (
        <Avatar key={size} name="زینب فلاح" src={PORTRAIT} size={size} />
      ))}
    </div>
  ),
};

export const ReferenceUsages: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6 rounded-3xl bg-white p-6">
      <Avatar name="زینب فلاح" src={PORTRAIT} size="xs" />
      <Avatar
        name="Faraz Pourebrahim"
        src={PORTRAIT}
        border="hairline"
        className="shadow-xs transition hover:opacity-90"
      />
      <Avatar name="Faraz Pourebrahim" src={PORTRAIT} size="sm" shape="xl" className="shadow-xs" />
      <Avatar name="Faraz Pourebrahim" src={PORTRAIT} size="md" shape="2xl" className="shadow-xs" />
      <Avatar name="زینب فلاح" src={PORTRAIT} size="lg" border="accent" />
      <Avatar name="Faraz Pourebrahim" src={PORTRAIT} size="xl" shape="3xl" />
      <Avatar name="محمد ابراهیمی" src={PORTRAIT} size="2xl" border="muted" />
      <Avatar name="فلاح" src={PORTRAIT} size="3xl" border="ring" />
    </div>
  ),
};

export const Fallback: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="زینب فلاح" />
      <Avatar name="Faraz Pourebrahim" size="lg" />
      <Avatar name="Iliya" size="lg" shape="2xl" />
    </div>
  ),
};
