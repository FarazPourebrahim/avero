import { Avatar, AvatarGroup } from "@averoui/react";

const PEOPLE = ["سارا محمدی", "علی رضایی", "نیکا کریمی", "رضا احمدی", "مینا شریفی", "حسین نوری"];

export default function AvatarGroupParticipants() {
  return (
    <AvatarGroup label="شرکت‌کنندگان" max={4}>
      {PEOPLE.map((name) => (
        <Avatar key={name} name={name} />
      ))}
    </AvatarGroup>
  );
}
