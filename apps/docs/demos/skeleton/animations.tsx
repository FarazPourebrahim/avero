import { SkeletonText } from "@avero/react";

export default function SkeletonAnimations() {
  return (
    <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-3">
      <SkeletonText animation="shimmer" lines={3} />
      <SkeletonText animation="pulse" lines={3} />
      <SkeletonText animation="none" lines={3} />
    </div>
  );
}
