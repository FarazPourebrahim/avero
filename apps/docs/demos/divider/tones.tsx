import { Divider } from "@averoui/react";

const TONES = [
  { tone: "gray", label: "gray — داخل کارت‌ها" },
  { tone: "slate", label: "slate — صفحه پروفایل" },
  { tone: "strong", label: "strong — پاورقی" },
] as const;

export default function DividerTonesDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-white p-6">
      {TONES.map(({ tone, label }) => (
        <div key={tone} className="flex flex-col gap-2">
          <span className="text-xs text-gray-500">{label}</span>
          <Divider tone={tone} />
        </div>
      ))}
      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-500">جداکننده معنادار بین دو بخش</span>
        <Divider decorative={false} />
      </div>
    </div>
  );
}
