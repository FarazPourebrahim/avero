import { Figure, Image } from "@avero/react";
import { cover } from "../artwork";

export default function ImageCoverDemo() {
  return (
    <Figure className="w-full max-w-lg">
      <Image src={cover} alt="فریلنسری چیست؟" radius="2xl" zoom="subtle" className="h-60 w-full" />
    </Figure>
  );
}
