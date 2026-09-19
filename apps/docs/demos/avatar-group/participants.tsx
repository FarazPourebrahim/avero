"use client";

import { Avatar, AvatarGroup } from "@averoui/react";
import { useCopy } from "../copy";

export default function AvatarGroupParticipants() {
  const t = useCopy({
    fa: {
      label: "شرکت‌کنندگان",
      people: ["سارا محمدی", "علی رضایی", "نیکا کریمی", "رضا احمدی", "مینا شریفی", "حسین نوری"],
    },
    en: {
      label: "Participants",
      people: [
        "Sara Mohammadi",
        "Ali Rezaei",
        "Nika Karimi",
        "Reza Ahmadi",
        "Mina Sharifi",
        "Hossein Nouri",
      ],
    },
  });

  return (
    <AvatarGroup label={t.label} max={4}>
      {t.people.map((name) => (
        <Avatar key={name} name={name} />
      ))}
    </AvatarGroup>
  );
}
