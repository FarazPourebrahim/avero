import { Card } from "@avero/react";

const ELEVATIONS = ["none", "xs", "sm", "soft", "ambient", "faint", "brand"] as const;

export default function CardElevationDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-5 sm:grid-cols-4">
      {ELEVATIONS.map((elevation) => (
        <Card key={elevation} elevation={elevation} padding="md" className="text-center">
          <code dir="ltr" className="text-xs text-gray-500">
            {elevation}
          </code>
        </Card>
      ))}
    </div>
  );
}
