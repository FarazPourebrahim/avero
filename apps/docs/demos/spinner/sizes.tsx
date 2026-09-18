import { Spinner } from "@averoui/react";

export default function SpinnerSizes() {
  return (
    <div className="flex items-center gap-5 text-gray-700">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  );
}
