import type { Meta, StoryObj } from "@storybook/react-vite";
import { WelcomeCard } from "./WelcomeCard.js";

const meta: Meta<typeof WelcomeCard> = {
  title: "Blocks/WelcomeCard",
  component: WelcomeCard,
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WelcomeCard>;

export const Dashboard: Story = { args: { name: "Faraz Pourebrahim" } };

export const CustomMessage: Story = {
  args: { name: "سارا محمدی", children: "امروز دو جلسه تازه در انتظار شماست" },
};
