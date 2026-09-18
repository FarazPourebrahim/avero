import { CapacityMeter } from "@averoui/react";

export default function CapacityMeterUsagesDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <CapacityMeter label="ظرفیت ثبت‌نام" value={3} max={12} />
      <div className="rounded-xl border border-gray-200 p-5">
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
      <div className="rounded-xl border border-gray-200 p-5">
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
  );
}
