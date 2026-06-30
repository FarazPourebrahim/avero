import { Progress } from "@avero/react";

export default function ProgressVariantsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-white p-6">
      <Progress value={40} aria-label="primary" />
      <Progress value={70} tone="success" size="sm" aria-label="success" />
      <Progress value={100} tone="danger" aria-label="full" />
      <Progress value={null} aria-label="loading" />
    </div>
  );
}
