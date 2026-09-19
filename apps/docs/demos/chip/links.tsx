"use client";

import { Chip } from "@averoui/react";
import { Tag } from "lucide-react";
import { useCopy } from "../copy";

export default function ChipLinksDemo() {
  const t = useCopy({
    fa: { design: "طراحی", ux: "تجربه کاربری" },
    en: { design: "Design", ux: "User experience" },
  });

  return (
    <>
      <Chip asChild variant="link">
        <a href="#design">{t.design}</a>
      </Chip>
      <Chip asChild variant="tag">
        <a href="#react">
          <Tag aria-hidden />
          <span>React</span>
        </a>
      </Chip>
      <Chip asChild variant="footer">
        <a href="#ux">{t.ux}</a>
      </Chip>
    </>
  );
}
