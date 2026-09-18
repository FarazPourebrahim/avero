import { Card, CardTitle } from "@averoui/react";

export default function CardInteractiveDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      <Card interactive elevation="xs" padding="md">
        <CardTitle size="sm">کارت قابل کلیک</CardTitle>
        <p className="mt-2 text-xs text-gray-500">با `interactive` سایه در هاور بلند می‌شود.</p>
      </Card>
      <Card asChild interactive elevation="xs" padding="md">
        <a href="#card-as-link">
          <CardTitle size="sm">کارتی که پیوند است</CardTitle>
          <p className="mt-2 text-xs text-gray-500">با `asChild` کل کارت یک پیوند واقعی است.</p>
        </a>
      </Card>
    </div>
  );
}
