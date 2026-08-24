import type { Meta, StoryObj } from "@storybook/react-vite";
import { TagInput } from "./TagInput.js";

const meta: Meta<typeof TagInput> = {
  title: "Forms/TagInput",
  component: TagInput,
  args: { "aria-label": "مهارت‌ها", placeholder: "مهارت را بنویسید و Enter بزنید" },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TagInput>;

export const Empty: Story = {};

export const WithTags: Story = {
  args: {
    defaultValue: ["React", "طراحی رابط کاربری", "تحلیل داده", "TypeScript"],
  },
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <TagInput {...args} defaultValue={["UX", "UI"]} maxTags={2} />
      <TagInput {...args} defaultValue={["Figma"]} aria-invalid />
      <TagInput {...args} defaultValue={["Sketch"]} disabled />
    </div>
  ),
};
