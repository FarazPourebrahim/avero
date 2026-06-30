import { Avatar } from "@avero/react";

export default function AvatarFallbackDemo() {
  return (
    <>
      <Avatar name="زینب فلاح" />
      <Avatar name="Faraz Pourebrahim" size="lg" />
      <Avatar name="Iliya" size="lg" shape="2xl" />
      <Avatar name="Broken image" src="/does-not-exist.webp" size="lg" />
    </>
  );
}
