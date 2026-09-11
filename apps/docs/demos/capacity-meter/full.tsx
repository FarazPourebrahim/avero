import { CapacityMeter } from "@avero/react";

export default function CapacityMeterFullDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <CapacityMeter
        variant="card"
        label="ظرفیت ثبت‌نام"
        value={12}
        max={12}
        status="تکمیل ظرفیت"
        startCaption="۱۲ نفر ثبت‌نام کرده‌اند"
        endCaption="حداکثر ۱۲ نفر"
      />
      <CapacityMeter variant="detail" label="ظرفیت کارگاه" value={0} max={20} />
    </div>
  );
}
