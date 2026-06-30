import { Avatar } from "@avero/react";
import { portrait } from "../artwork";

export default function AvatarUsagesDemo() {
  return (
    <>
      <Avatar name="زینب فلاح" src={portrait} size="xs" />
      <Avatar name="Faraz Pourebrahim" src={portrait} border="hairline" />
      <Avatar name="Faraz Pourebrahim" src={portrait} size="md" shape="2xl" />
      <Avatar name="زینب فلاح" src={portrait} size="lg" border="accent" />
      <Avatar name="Faraz Pourebrahim" src={portrait} size="xl" shape="3xl" />
      <Avatar name="محمد ابراهیمی" src={portrait} size="2xl" border="muted" />
    </>
  );
}
