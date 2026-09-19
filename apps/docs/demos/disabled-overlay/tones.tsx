"use client";

import { Card, CardTitle, DisabledOverlay } from "@averoui/react";
import { useCopy } from "../copy";

export default function DisabledOverlayTonesDemo() {
  const t = useCopy({
    fa: {
      photography: "کارگاه عکاسی",
      photographyMeta: "شنبه ۲۴ شهریور، ۱۲ نفر",
      full: "ظرفیت تکمیل شد",
      editing: "کارگاه تدوین",
      editingMeta: "به‌زودی اعلام می‌شود",
      notOpen: "هنوز باز نشده است",
    },
    en: {
      photography: "Photography workshop",
      photographyMeta: "Saturday 15 September, 12 people",
      full: "Fully booked",
      editing: "Video editing workshop",
      editingMeta: "Dates announced soon",
      notOpen: "Not open yet",
    },
  });

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      <div aria-disabled="true" className="relative select-none">
        <Card variant="flat" padding="md">
          <CardTitle size="sm">{t.photography}</CardTitle>
          <p className="mt-2 text-xs text-gray-500">{t.photographyMeta}</p>
        </Card>
        <DisabledOverlay radius="2xl">{t.full}</DisabledOverlay>
      </div>
      <div aria-disabled="true" className="relative select-none">
        <Card variant="flat" padding="md">
          <CardTitle size="sm">{t.editing}</CardTitle>
          <p className="mt-2 text-xs text-gray-500">{t.editingMeta}</p>
        </Card>
        <DisabledOverlay tone="neutral" radius="2xl">
          {t.notOpen}
        </DisabledOverlay>
      </div>
    </div>
  );
}
