import { Switch } from "@averoui/react";

const SETTINGS = [
  { id: "weekly-email", label: "ایمیل هفتگی", defaultChecked: false },
  { id: "reminders", label: "یادآوری جلسه‌ها", defaultChecked: true },
  { id: "sms", label: "پیامک (به‌زودی)", disabled: true },
];

export default function SwitchSettingsDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      {SETTINGS.map(({ id, label, ...props }) => (
        <div key={id} className="flex items-center justify-between gap-4">
          <label htmlFor={id} className="text-sm text-gray-700">
            {label}
          </label>
          <Switch id={id} {...props} />
        </div>
      ))}
    </div>
  );
}
