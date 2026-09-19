"use client";

import { Switch } from "@averoui/react";
import { useCopy } from "../copy";

const SETTINGS = [
  { id: "weekly-email", defaultChecked: false },
  { id: "reminders", defaultChecked: true },
  { id: "sms", disabled: true },
] as const;

export default function SwitchSettingsDemo() {
  const t = useCopy({
    fa: {
      labels: {
        "weekly-email": "ایمیل هفتگی",
        reminders: "یادآوری جلسه‌ها",
        sms: "پیامک (به‌زودی)",
      },
    },
    en: {
      labels: {
        "weekly-email": "Weekly email",
        reminders: "Session reminders",
        sms: "Text messages (coming soon)",
      },
    },
  });

  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      {SETTINGS.map(({ id, ...props }) => (
        <div key={id} className="flex items-center justify-between gap-4">
          <label htmlFor={id} className="text-sm text-gray-700">
            {t.labels[id]}
          </label>
          <Switch id={id} {...props} />
        </div>
      ))}
    </div>
  );
}
