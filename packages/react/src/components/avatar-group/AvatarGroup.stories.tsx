import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../avatar/Avatar.js";
import { AvatarGroup } from "./AvatarGroup.js";

const PEOPLE = ["سارا محمدی", "علی رضایی", "نیکا کریمی", "رضا احمدی", "مینا شریفی", "حسین نوری"];

const meta = {
  title: "Primitives/AvatarGroup",
  component: AvatarGroup,
  args: { label: "شرکت‌کنندگان" },
  argTypes: {
    overlap: { control: "inline-radio", options: ["sm", "md", "lg"] },
    size: { control: "inline-radio", options: ["xs", "sm", "md"] },
  },
  decorators: [
    (Story) => (
      <div className="rounded-2xl bg-white p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    max: 4,
    children: PEOPLE.map((name) => <Avatar key={name} name={name} />),
  },
};

export const Overlap: Story = {
  args: { children: null },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((overlap) => (
        <AvatarGroup key={overlap} {...args} overlap={overlap}>
          {PEOPLE.slice(0, 4).map((name) => (
            <Avatar key={name} name={name} />
          ))}
        </AvatarGroup>
      ))}
    </div>
  ),
};

export const WithoutOverflow: Story = {
  args: { children: null },
  render: (args) => (
    <AvatarGroup {...args}>
      {PEOPLE.slice(0, 3).map((name) => (
        <Avatar key={name} name={name} />
      ))}
    </AvatarGroup>
  ),
};
