"use client";

import { SwitchCard } from "@averoui/react";
import { useCopy } from "../copy";

const SETTINGS = [
  { id: "digest", defaultChecked: true },
  { id: "focus", defaultChecked: false },
  { id: "sms", disabled: true },
] as const;

export default function SwitchCardsDemo() {
  const t = useCopy({
    fa: {
      title: {
        digest: "خلاصه هفتگی",
        focus: "حالت تمرکز",
        sms: "اعلان پیامکی",
      },
      description: {
        digest: "هر شنبه صبح، خلاصه‌ای از فعالیت دوره‌هایتان",
        focus: "اعلان‌ها تا پایان هر جلسه بی‌صدا می‌شوند",
        sms: "به‌زودی برای همه حساب‌ها فعال می‌شود",
      },
    },
    en: {
      title: {
        digest: "Weekly digest",
        focus: "Focus mode",
        sms: "Text alerts",
      },
      description: {
        digest: "A summary of your courses every Saturday morning",
        focus: "Notifications stay silent until each session ends",
        sms: "Coming soon to every account",
      },
    },
  });

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {SETTINGS.map(({ id, ...props }) => (
        <SwitchCard key={id} title={t.title[id]} description={t.description[id]} {...props} />
      ))}
    </div>
  );
}
