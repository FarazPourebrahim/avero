import type { Meta, StoryObj } from "@storybook/react-vite";
import { OtpInput } from "./OtpInput.js";

const meta: Meta<typeof OtpInput> = {
  title: "Forms/OtpInput",
  component: OtpInput,
  args: { "aria-label": "کد تأیید" },
  argTypes: { length: { control: { type: "number", min: 4, max: 8 } } },
};

export default meta;
type Story = StoryObj<typeof OtpInput>;

export const Empty: Story = {};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <OtpInput {...args} defaultValue="123" />
      <OtpInput {...args} defaultValue="1234" length={4} />
      <OtpInput {...args} defaultValue="987" aria-invalid />
      <OtpInput {...args} defaultValue="12" disabled />
    </div>
  ),
};
