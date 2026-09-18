import { RadioGroup, RadioGroupItem } from "@averoui/react";

const OPTIONS = [
  { value: "online", label: "آنلاین" },
  { value: "in-person", label: "حضوری" },
  { value: "hybrid", label: "ترکیبی (به‌زودی)", disabled: true },
];

export default function RadioGroupDeliveryDemo() {
  return (
    <div className="flex flex-col gap-3">
      <p id="delivery-label" className="text-sm font-medium text-gray-800">
        نحوه برگزاری
      </p>
      <RadioGroup aria-labelledby="delivery-label" defaultValue="online">
        {OPTIONS.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <RadioGroupItem id={option.value} value={option.value} disabled={option.disabled} />
            <label htmlFor={option.value} className="text-sm text-gray-700">
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
