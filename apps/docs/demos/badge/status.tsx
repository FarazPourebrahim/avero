import { Badge } from "@averoui/react";

export default function BadgeStatusDemo() {
  return (
    <>
      <Badge tone="success">منتشر شده</Badge>
      <Badge tone="success" className="py-1">
        9 جای خالی
      </Badge>
      <Badge tone="danger" className="py-1">
        ظرفیت تکمیل شد
      </Badge>
      <Badge>آنلاین</Badge>
      <Badge variant="counter">0</Badge>
    </>
  );
}
