"use client";

import { Chip } from "@averoui/react";
import { useCopy } from "../copy";

export default function ChipStaticDemo() {
  const t = useCopy({
    fa: { design: "طراحی UI/UX", online: "آنلاین", data: "تحلیل داده" },
    en: { design: "UI/UX design", online: "Online", data: "Data analysis" },
  });

  return (
    <>
      <Chip>{t.design}</Chip>
      <Chip size="sm">{t.online}</Chip>
      <Chip variant="mini">Figma</Chip>
      <Chip variant="skill">React</Chip>
      <Chip variant="skill">{t.data}</Chip>
    </>
  );
}
