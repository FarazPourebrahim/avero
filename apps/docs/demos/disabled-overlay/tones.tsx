import { Card, CardTitle, DisabledOverlay } from "@averoui/react";

export default function DisabledOverlayTonesDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      <div aria-disabled="true" className="relative select-none">
        <Card variant="flat" padding="md">
          <CardTitle size="sm">کارگاه عکاسی</CardTitle>
          <p className="mt-2 text-xs text-gray-500">شنبه ۲۴ شهریور، ۱۲ نفر</p>
        </Card>
        <DisabledOverlay radius="2xl">ظرفیت تکمیل شد</DisabledOverlay>
      </div>
      <div aria-disabled="true" className="relative select-none">
        <Card variant="flat" padding="md">
          <CardTitle size="sm">کارگاه تدوین</CardTitle>
          <p className="mt-2 text-xs text-gray-500">به‌زودی اعلام می‌شود</p>
        </Card>
        <DisabledOverlay tone="neutral" radius="2xl">
          هنوز باز نشده است
        </DisabledOverlay>
      </div>
    </div>
  );
}
