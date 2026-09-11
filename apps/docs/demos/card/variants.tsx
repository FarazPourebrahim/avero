import { Card, CardTitle } from "@avero/react";

const VARIANTS = [
  { variant: "surface", label: "surface — کارت محتوای اصلی" },
  { variant: "flat", label: "flat — کارت داشبورد" },
  { variant: "glass", label: "glass — کارت فهرست روی تصویر" },
  { variant: "muted", label: "muted — کاشی خنثی" },
] as const;

export default function CardVariantsDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {VARIANTS.map(({ variant, label }) => (
        <Card key={variant} variant={variant} padding="md">
          <CardTitle size="sm">{label}</CardTitle>
        </Card>
      ))}
    </div>
  );
}
