"use client";

import { Avatar } from "@averoui/react";
import { portrait } from "../artwork";
import { useCopy } from "../copy";

export default function AvatarUsagesDemo() {
  const t = useCopy({
    fa: { sara: "سارا محمدی", ali: "علی کریمی", negar: "نگار رضایی" },
    en: { sara: "Sara Mohammadi", ali: "Ali Karimi", negar: "Negar Rezaei" },
  });

  return (
    <>
      <Avatar name={t.sara} src={portrait} size="xs" />
      <Avatar name={t.sara} src={portrait} border="hairline" />
      <Avatar name={t.sara} src={portrait} size="md" shape="2xl" />
      <Avatar name={t.ali} src={portrait} size="lg" border="accent" />
      <Avatar name={t.ali} src={portrait} size="xl" shape="3xl" />
      <Avatar name={t.negar} src={portrait} size="2xl" border="muted" />
    </>
  );
}
