import { HeartSolidIcon, TelegramIcon } from "@averoui/react";

const SIZES = [
  { className: "size-3.5", label: "۱۴px" },
  { className: "size-4", label: "۱۶px" },
  { className: "size-5", label: "۲۰px" },
  { className: "size-6", label: "۲۴px" },
];

export default function IconsSizesDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end gap-6">
        {SIZES.map(({ className, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-xs text-gray-500">
            <HeartSolidIcon className={`${className} text-rose-500`} />
            {label}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 text-sm text-gray-600">
        <TelegramIcon
          className="size-5 text-sky-500"
          aria-hidden={false}
          role="img"
          aria-label="تلگرام"
        />
        <span>آیکن‌ها به‌صورت پیش‌فرض `aria-hidden` هستند؛ برای آیکن معنادار نامی بدهید.</span>
      </div>
    </div>
  );
}
