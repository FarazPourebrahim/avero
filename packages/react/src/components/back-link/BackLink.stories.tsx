import type { Meta, StoryObj } from "@storybook/react-vite";
import { BackLink } from "./BackLink.js";

const meta = {
  title: "Navigation/BackLink",
  component: BackLink,
  argTypes: {
    variant: { control: "inline-radio", options: ["text", "soft", "subtle"] },
  },
} satisfies Meta<typeof BackLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ReferenceUsages: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6 rounded-3xl bg-white p-6">
      <BackLink />
      <BackLink variant="soft" />
      <BackLink variant="subtle" href="#projects" label="بازگشت به لیست پروژه‌ها" />
    </div>
  ),
};
