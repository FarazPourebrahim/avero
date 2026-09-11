import { Rating } from "@avero/react";

export default function RatingPrecisionDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-600">
      <Rating value={5} fractionDigits={0} />
      <Rating value={4.75} fractionDigits={1} />
      <Rating value={4.75} />
      <Rating value={0} label="هنوز امتیازی ثبت نشده:" />
    </div>
  );
}
