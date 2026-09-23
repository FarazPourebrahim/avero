import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox.js";
import { CheckboxCard } from "./CheckboxCard.js";

const meta: Meta<typeof Checkbox> = {
  title: "Forms/Checkbox",
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {[
        { id: "unchecked", label: "ارسال خبرنامه", props: {} },
        { id: "checked", label: "یادآوری جلسه‌ها", props: { defaultChecked: true } },
        { id: "mixed", label: "همه دوره‌ها", props: { checked: "indeterminate" as const } },
        { id: "invalid", label: "قوانین را می‌پذیرم", props: { "aria-invalid": true } },
        { id: "disabled", label: "ثبت‌نام خودکار", props: { disabled: true } },
      ].map(({ id, label, props }) => (
        <div key={id} className="flex items-center gap-2">
          <Checkbox id={id} {...props} />
          <label htmlFor={id} className="text-sm text-gray-700">
            {label}
          </label>
        </div>
      ))}
    </div>
  ),
};

export const Cards: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <CheckboxCard
        title="جلسه‌های منتورینگ"
        description="چهار جلسه یک‌به‌یک با مدرس"
        aside="۱٬۲۰۰٬۰۰۰ تومان"
        defaultChecked
      />
      <CheckboxCard title="گواهی چاپی" description="ارسال با پست پس از پایان دوره" />
      <CheckboxCard title="دسترسی دائمی" description="برای همه ثبت‌نام‌ها فعال است" disabled />
    </div>
  ),
};
