"use client";

import { Avatar, AvatarGroup } from "@averoui/react";
import { useCopy } from "../copy";

export default function AvatarGroupOverlap() {
  const t = useCopy({
    fa: {
      people: ["سارا محمدی", "علی رضایی", "نیکا کریمی", "رضا احمدی"],
      label: (overlap: string) => `فاصله ${overlap}`,
    },
    en: {
      people: ["Sara Mohammadi", "Ali Rezaei", "Nika Karimi", "Reza Ahmadi"],
      label: (overlap: string) => `${overlap} overlap`,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((overlap) => (
        <AvatarGroup key={overlap} label={t.label(overlap)} overlap={overlap}>
          {t.people.map((name) => (
            <Avatar key={name} name={name} />
          ))}
        </AvatarGroup>
      ))}
    </div>
  );
}
