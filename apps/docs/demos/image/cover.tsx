"use client";

import { Figure, Image } from "@averoui/react";
import { cover } from "../artwork";
import { useCopy } from "../copy";

export default function ImageCoverDemo() {
  const t = useCopy({
    fa: { alt: "چطور یک سیستم طراحی بسازیم؟" },
    en: { alt: "How to build a design system" },
  });

  return (
    <Figure className="w-full max-w-lg">
      <Image src={cover} alt={t.alt} radius="2xl" zoom="subtle" className="h-60 w-full" />
    </Figure>
  );
}
