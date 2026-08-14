import { ActionTile, PaperPlaneSolidIcon, QuickActions } from "@avero/react";

const ACTIONS = [
  { label: "افزودن دوره", tone: "blue" },
  { label: "افزودن جلسه", tone: "purple" },
  { label: "ساخت تمرین", tone: "amber" },
  { label: "ویرایش پروفایل", tone: "emerald" },
  { label: "پیام‌ها", tone: "rose" },
  { label: "تنظیمات", tone: "indigo" },
] as const;

export default function QuickActionsDashboardDemo() {
  return (
    <QuickActions label="دسترسی سریع">
      {ACTIONS.map((action) => (
        <ActionTile key={action.label} tone={action.tone} icon={<PaperPlaneSolidIcon size={18} />}>
          {action.label}
        </ActionTile>
      ))}
    </QuickActions>
  );
}
