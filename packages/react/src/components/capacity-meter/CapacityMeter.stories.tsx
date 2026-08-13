import type { Meta, StoryObj } from "@storybook/react-vite";
import { CapacityMeter } from "./CapacityMeter.js";

const meta: Meta<typeof CapacityMeter> = {
  title: "Data display/CapacityMeter",
  component: CapacityMeter,
  args: { label: "ظرفیت ثبت‌نام", value: 3, max: 12 },
};

export default meta;
type Story = StoryObj<typeof CapacityMeter>;

export const Detail: Story = {
  render: (args) => (
    <div className="max-w-xl rounded-3xl bg-white p-6">
      <CapacityMeter {...args} />
    </div>
  ),
};

export const Cards: Story = {
  render: () => (
    <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <CapacityMeter
          variant="card"
          label="ظرفیت ثبت‌نام"
          value={3}
          max={12}
          status="9 جای خالی"
          startCaption="3 نفر ثبت‌نام کرده‌اند"
          endCaption="حداکثر 12 نفر"
        />
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <CapacityMeter
          variant="card"
          label="ظرفیت ثبت‌نام"
          value={5}
          max={5}
          status="ظرفیت تکمیل شد"
          startCaption="5 نفر ثبت‌نام کرده‌اند"
          endCaption="حداکثر 5 نفر"
        />
      </div>
    </div>
  ),
};
