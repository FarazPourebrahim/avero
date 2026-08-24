import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileInput } from "./FileInput.js";

const MB = 1024 * 1024;

function sampleFile(name: string, type: string, size: number): File {
  const file = new File(["sample"], name, { type });
  Object.defineProperty(file, "size", { value: size });
  return file;
}

const meta: Meta<typeof FileInput> = {
  title: "Forms/FileInput",
  component: FileInput,
  args: { maxSize: 5 * MB },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Single: Story = {};

export const MultipleImages: Story = {
  args: {
    multiple: true,
    maxFiles: 3,
    accept: "image/*",
    title: "تصاویر نمونه‌کار را اینجا رها کنید",
    defaultValue: [
      sampleFile("poster-final.png", "image/png", 1.2 * MB),
      sampleFile("طرح-اولیه.jpg", "image/jpeg", 840 * 1024),
    ],
  },
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <FileInput {...args} aria-invalid />
      <FileInput
        {...args}
        disabled
        defaultValue={[sampleFile("contract.pdf", "application/pdf", 320 * 1024)]}
      />
    </div>
  ),
};
