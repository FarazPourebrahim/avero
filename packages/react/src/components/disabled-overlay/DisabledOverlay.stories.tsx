import type { Meta, StoryObj } from "@storybook/react-vite";
import { CapacityMeter } from "../capacity-meter/CapacityMeter.js";
import { DisabledOverlay } from "./DisabledOverlay.js";

const meta: Meta<typeof DisabledOverlay> = {
  title: "Overlays/DisabledOverlay",
  component: DisabledOverlay,
};

export default meta;
type Story = StoryObj<typeof DisabledOverlay>;

export const FullCard: Story = {
  render: (args) => (
    <div
      aria-disabled="true"
      className="relative flex min-h-[240px] max-w-sm flex-col gap-5 rounded-xl border border-gray-200 p-5 opacity-70 blur-[1px] select-none"
    >
      <div>
        <h3 className="text-primary text-base font-bold md:text-lg">کارگاه طراحی تجربه کاربری</h3>
        <span className="mt-3 inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
          آنلاین
        </span>
      </div>
      <CapacityMeter
        variant="card"
        label="ظرفیت ثبت‌نام"
        value={5}
        max={5}
        status="ظرفیت تکمیل شد"
        startCaption="5 نفر ثبت‌نام کرده‌اند"
        endCaption="حداکثر 5 نفر"
      />
      <DisabledOverlay {...args}>ظرفیت تکمیل شد</DisabledOverlay>
    </div>
  ),
};

export const NeutralTone: Story = {
  args: { tone: "neutral", radius: "2xl" },
  render: (args) => (
    <div
      aria-disabled="true"
      className="relative min-h-[160px] max-w-sm rounded-2xl border border-gray-200 bg-white p-5"
    >
      <p className="text-sm text-gray-600">ثبت‌نام این دوره بسته شده است.</p>
      <DisabledOverlay {...args}>بسته شده</DisabledOverlay>
    </div>
  ),
};
