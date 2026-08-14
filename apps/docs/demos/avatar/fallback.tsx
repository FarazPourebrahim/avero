import { Avatar } from "@avero/react";

export default function AvatarFallbackDemo() {
  return (
    <>
      <Avatar name="سارا محمدی" />
      <Avatar name="Ali Karimi" size="lg" />
      <Avatar name="Negar" size="lg" shape="2xl" />
      <Avatar name="Broken image" src="/does-not-exist.webp" size="lg" />
    </>
  );
}
