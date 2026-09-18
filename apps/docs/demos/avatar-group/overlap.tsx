import { Avatar, AvatarGroup } from "@avero/react";

const PEOPLE = ["سارا محمدی", "علی رضایی", "نیکا کریمی", "رضا احمدی"];

export default function AvatarGroupOverlap() {
  return (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((overlap) => (
        <AvatarGroup key={overlap} label={`فاصله ${overlap}`} overlap={overlap}>
          {PEOPLE.map((name) => (
            <Avatar key={name} name={name} />
          ))}
        </AvatarGroup>
      ))}
    </div>
  );
}
