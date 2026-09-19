"use client";

import { ActionTile, PaperPlaneSolidIcon, QuickActions } from "@averoui/react";
import { useCopy } from "../copy";

const TONES = ["blue", "purple", "amber", "emerald", "rose", "indigo"] as const;

export default function QuickActionsDashboardDemo() {
  const t = useCopy({
    fa: {
      label: "دسترسی سریع",
      actions: ["افزودن دوره", "افزودن جلسه", "ساخت تمرین", "ویرایش پروفایل", "پیام‌ها", "تنظیمات"],
    },
    en: {
      label: "Quick actions",
      actions: [
        "Add a course",
        "Add a session",
        "Create an exercise",
        "Edit profile",
        "Messages",
        "Settings",
      ],
    },
  });

  return (
    <QuickActions label={t.label}>
      {t.actions.map((action, index) => (
        <ActionTile key={action} tone={TONES[index]} icon={<PaperPlaneSolidIcon size={18} />}>
          {action}
        </ActionTile>
      ))}
    </QuickActions>
  );
}
