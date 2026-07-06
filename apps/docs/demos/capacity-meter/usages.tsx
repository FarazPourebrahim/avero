import { CapacityMeter } from "@avero/react";

export default function CapacityMeterUsagesDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <CapacityMeter label="ظرفیت دریافت رزومه" value={3} max={12} />
      <div className="rounded-xl border border-gray-200 p-5">
        <CapacityMeter
          variant="card"
          label="ظرفیت ارسال رزومه"
          value={3}
          max={12}
          status="9 جای خالی"
          startCaption="3 رزومه ارسال شده"
          endCaption="حداکثر 12 نفر"
        />
      </div>
      <div className="rounded-xl border border-gray-200 p-5">
        <CapacityMeter
          variant="card"
          label="ظرفیت ارسال رزومه"
          value={5}
          max={5}
          status="تکمیل ظرفیت"
          startCaption="5 رزومه ارسال شده"
          endCaption="حداکثر 5 نفر"
        />
      </div>
    </div>
  );
}
