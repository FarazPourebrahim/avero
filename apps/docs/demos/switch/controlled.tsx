"use client";

import { Switch } from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function SwitchControlledDemo() {
  const [notify, setNotify] = useState(true);
  const t = useCopy({
    fa: {
      notify: "اعلان دوره‌های تازه",
      digest: "خلاصه هفتگی",
      on: "خلاصه هفتگی قابل تنظیم است.",
      off: "برای تنظیم خلاصه، اعلان‌ها را روشن کنید.",
    },
    en: {
      notify: "Notify me about new courses",
      digest: "Weekly digest",
      on: "The weekly digest is available.",
      off: "Turn notifications on to set up the digest.",
    },
  });

  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="notify" className="text-sm text-gray-700">
          {t.notify}
        </label>
        <Switch id="notify" checked={notify} onCheckedChange={setNotify} />
      </div>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="notify-digest" className="text-sm text-gray-700">
          {t.digest}
        </label>
        <Switch id="notify-digest" disabled={!notify} defaultChecked />
      </div>
      <p role="status" className="text-sm text-gray-500">
        {notify ? t.on : t.off}
      </p>
    </div>
  );
}
