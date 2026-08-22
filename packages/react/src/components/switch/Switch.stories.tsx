import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch.js";

const meta: Meta<typeof Switch> = {
  title: "Forms/Switch",
  component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Settings: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      {[
        { id: "email", label: "ایمیل هفتگی", props: {} },
        { id: "reminders", label: "یادآوری جلسه‌ها", props: { defaultChecked: true } },
        { id: "sms", label: "پیامک (غیرفعال)", props: { disabled: true } },
      ].map(({ id, label, props }) => (
        <div key={id} className="flex items-center justify-between gap-4">
          <label htmlFor={id} className="text-sm text-gray-700">
            {label}
          </label>
          <Switch id={id} {...props} />
        </div>
      ))}
    </div>
  ),
};
