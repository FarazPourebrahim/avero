import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../input/Input.js";
import { NativeSelect } from "../native-select/NativeSelect.js";
import { Textarea } from "../textarea/Textarea.js";
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from "./Field.js";

const meta: Meta<typeof Field> = {
  title: "Forms/Field",
  component: Field,
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel>نام کاربری</FieldLabel>
      <FieldControl>
        <Input />
      </FieldControl>
      <FieldDescription>فقط حروف انگلیسی، عدد و خط تیره</FieldDescription>
    </Field>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Field required>
        <FieldLabel>ایمیل</FieldLabel>
        <FieldControl>
          <Input type="email" dir="ltr" placeholder="hello@example.com" />
        </FieldControl>
      </Field>
      <Field invalid>
        <FieldLabel>نام</FieldLabel>
        <FieldControl>
          <Input defaultValue="س" />
        </FieldControl>
        <FieldDescription>نام کامل خود را بنویسید</FieldDescription>
        <FieldError>نام باید حداقل ۳ نویسه باشد.</FieldError>
      </Field>
      <Field disabled>
        <FieldLabel>شهر</FieldLabel>
        <FieldControl>
          <NativeSelect>
            <option>تهران</option>
          </NativeSelect>
        </FieldControl>
      </Field>
    </div>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <Field required>
      <FieldLabel>دیدگاه</FieldLabel>
      <FieldControl>
        <Textarea variant="slate" />
      </FieldControl>
      <FieldDescription>دیدگاه‌ها پس از بررسی منتشر می‌شوند.</FieldDescription>
    </Field>
  ),
};
