import { CapacityMeter, DisabledOverlay } from "@avero/react";

export default function DisabledOverlayFullCardDemo() {
  return (
    <div
      aria-disabled="true"
      className="relative flex w-full max-w-sm flex-col gap-5 rounded-xl border border-gray-200 p-5 opacity-70 blur-[1px] select-none"
    >
      <h3 className="text-primary text-base font-bold">تبدیل قالب HTML به وردپرس</h3>
      <CapacityMeter
        variant="card"
        label="ظرفیت ارسال رزومه"
        value={5}
        max={5}
        status="تکمیل ظرفیت"
        startCaption="5 رزومه ارسال شده"
        endCaption="حداکثر 5 نفر"
      />
      <DisabledOverlay>تکمیل ظرفیت</DisabledOverlay>
    </div>
  );
}
