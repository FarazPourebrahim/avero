import { Image } from "@avero/react";
import { cover } from "../artwork";

export default function ImageCardAndFallbackDemo() {
  return (
    <>
      <div className="group h-40 w-60 overflow-hidden rounded-3xl bg-slate-100">
        <Image src={cover} alt="مبانی طراحی رابط کاربری" zoom="group" className="size-full" />
      </div>
      <Image
        src="/does-not-exist.webp"
        alt="تصویر در دسترس نیست"
        radius="xl"
        className="h-40 w-60"
      />
    </>
  );
}
