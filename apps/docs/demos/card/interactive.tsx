"use client";

import { Card, CardTitle } from "@averoui/react";
import { useCopy } from "../copy";

export default function CardInteractiveDemo() {
  const t = useCopy({
    fa: {
      clickable: "کارت قابل کلیک",
      clickableBody: "با `interactive` سایه در هاور بلند می‌شود.",
      asLink: "کارتی که پیوند است",
      asLinkBody: "با `asChild` کل کارت یک پیوند واقعی است.",
    },
    en: {
      clickable: "A clickable card",
      clickableBody: "`interactive` lifts the shadow on hover.",
      asLink: "A card that is a link",
      asLinkBody: "`asChild` makes the whole card a real link.",
    },
  });

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      <Card interactive elevation="xs" padding="md">
        <CardTitle size="sm">{t.clickable}</CardTitle>
        <p className="mt-2 text-xs text-gray-500">{t.clickableBody}</p>
      </Card>
      <Card asChild interactive elevation="xs" padding="md">
        <a href="#card-as-link">
          <CardTitle size="sm">{t.asLink}</CardTitle>
          <p className="mt-2 text-xs text-gray-500">{t.asLinkBody}</p>
        </a>
      </Card>
    </div>
  );
}
