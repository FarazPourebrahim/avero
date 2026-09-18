import { CapacityMeter, DisabledOverlay } from "@averoui/react";

export default function DisabledOverlayFullCardDemo() {
  return (
    <div
      aria-disabled="true"
      className="relative flex w-full max-w-sm flex-col gap-5 rounded-xl border border-gray-200 p-5 opacity-70 blur-[1px] select-none"
    >
      <h3 className="text-primary text-base font-bold">کارگاه عکاسی با موبایل</h3>
      <CapacityMeter
        variant="card"
        label="ظرفیت ثبت‌نام"
        value={5}
        max={5}
        status="ظرفیت تکمیل شد"
        startCaption="5 نفر ثبت‌نام کرده‌اند"
        endCaption="حداکثر 5 نفر"
      />
      <DisabledOverlay>ظرفیت تکمیل شد</DisabledOverlay>
    </div>
  );
}
