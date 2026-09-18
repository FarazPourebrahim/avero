import { Skeleton } from "@averoui/react";

export default function SkeletonShapes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Skeleton shape="title" className="w-2/3" />
      <Skeleton shape="line" className="w-full" />
      <Skeleton shape="block" className="h-24 w-full" />
      <Skeleton shape="circle" className="size-12" />
    </div>
  );
}
