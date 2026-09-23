"use client";

import { PriceTag, RadioCard, RadioGroup } from "@averoui/react";
import { useCopy } from "../copy";

const METHODS = [
  { value: "post", price: 0 },
  { value: "courier", price: 85_000 },
  { value: "pickup", price: 0, disabled: true },
] as const;

export default function RadioGroupCardsDemo() {
  const t = useCopy({
    fa: {
      label: "روش ارسال",
      title: { post: "پست پیشتاز", courier: "پیک", pickup: "تحویل حضوری" },
      description: {
        post: "سه تا پنج روز کاری، در همه شهرها",
        courier: "همان روز، فقط در تهران",
        pickup: "از دفتر مرکزی — به‌زودی",
      },
      free: "رایگان",
    },
    en: {
      label: "Shipping method",
      title: { post: "Express post", courier: "Courier", pickup: "Collect in person" },
      description: {
        post: "Three to five working days, anywhere",
        courier: "Same day, Tehran only",
        pickup: "From the main office — coming soon",
      },
      free: "Free",
    },
  });

  return (
    <RadioGroup
      aria-label={t.label}
      defaultValue="post"
      name="shipping"
      className="w-full max-w-md"
    >
      {METHODS.map(({ value, price, ...props }) => (
        <RadioCard
          key={value}
          value={value}
          title={t.title[value]}
          description={t.description[value]}
          aside={
            price > 0 ? (
              <PriceTag amount={price} variant="compact" />
            ) : (
              <span className="text-xs font-semibold text-emerald-700">{t.free}</span>
            )
          }
          {...props}
        />
      ))}
    </RadioGroup>
  );
}
