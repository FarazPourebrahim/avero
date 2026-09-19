"use client";

import { Field, FieldControl, FieldDescription, FieldLabel, PriceInput } from "@averoui/react";
import { useCopy } from "../copy";

export default function PriceInputVariantsDemo() {
  const t = useCopy({
    fa: {
      price: "قیمت دوره",
      priceHint: "واحد از فرهنگ واژگان می‌آید.",
      sessions: "تعداد جلسه",
      sessionsHint: "برای حذف واحد، `currency` را خالی بگذارید.",
    },
    en: {
      price: "Course price",
      priceHint: "The unit comes from the dictionary.",
      sessions: "Number of sessions",
      sessionsHint: "Leave `currency` empty to drop the unit.",
    },
  });

  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <Field>
        <FieldLabel>{t.price}</FieldLabel>
        <FieldControl>
          <PriceInput variant="soft" defaultValue={1_200_000} />
        </FieldControl>
        <FieldDescription>{t.priceHint}</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>{t.sessions}</FieldLabel>
        <FieldControl>
          <PriceInput variant="slate" currency={null} defaultValue={12} max={60} />
        </FieldControl>
        <FieldDescription>{t.sessionsHint}</FieldDescription>
      </Field>
    </div>
  );
}
