import { SkeletonCard } from "@averoui/react";

export default function SkeletonCardDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      <SkeletonCard footer />
      <SkeletonCard footer />
    </div>
  );
}
