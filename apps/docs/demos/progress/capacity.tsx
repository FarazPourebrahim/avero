import { Progress } from "@avero/react";

export default function ProgressCapacityDemo() {
  return (
    <div className="w-full max-w-sm space-y-2 rounded-2xl bg-white p-6">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">ظرفیت ثبت‌نام</span>
        <span className="font-medium text-gray-800">3 از 12</span>
      </div>
      <Progress value={3} max={12} aria-label="ظرفیت ثبت‌نام" />
    </div>
  );
}
