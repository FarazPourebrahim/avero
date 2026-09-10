"use client";

import { Switch } from "@avero/react";
import { useState } from "react";

export default function SwitchControlledDemo() {
  const [notify, setNotify] = useState(true);

  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="notify" className="text-sm text-gray-700">
          اعلان دوره‌های تازه
        </label>
        <Switch id="notify" checked={notify} onCheckedChange={setNotify} />
      </div>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="notify-digest" className="text-sm text-gray-700">
          خلاصه هفتگی
        </label>
        <Switch id="notify-digest" disabled={!notify} defaultChecked />
      </div>
      <p role="status" className="text-sm text-gray-500">
        {notify ? "خلاصه هفتگی قابل تنظیم است." : "برای تنظیم خلاصه، اعلان‌ها را روشن کنید."}
      </p>
    </div>
  );
}
