import { Avatar } from "@avero/react";
import { portrait } from "../artwork";

export default function AvatarUsagesDemo() {
  return (
    <>
      <Avatar name="سارا محمدی" src={portrait} size="xs" />
      <Avatar name="Sara Mohammadi" src={portrait} border="hairline" />
      <Avatar name="Sara Mohammadi" src={portrait} size="md" shape="2xl" />
      <Avatar name="علی کریمی" src={portrait} size="lg" border="accent" />
      <Avatar name="Ali Karimi" src={portrait} size="xl" shape="3xl" />
      <Avatar name="نگار رضایی" src={portrait} size="2xl" border="muted" />
    </>
  );
}
