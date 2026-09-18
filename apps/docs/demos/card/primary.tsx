import { Card, CardHeader, CardTitle } from "@averoui/react";

export default function CardPrimaryDemo() {
  return (
    <Card className="max-w-sm" elevation="soft">
      <CardHeader className="mb-3">
        <CardTitle>مبانی تحلیل داده</CardTitle>
        <span className="text-xs text-gray-400">۸ جلسه</span>
      </CardHeader>
      <p className="text-sm leading-7 text-gray-600">
        از پاک‌سازی داده تا ساختن اولین گزارش، با تمرین‌های هفتگی.
      </p>
    </Card>
  );
}
