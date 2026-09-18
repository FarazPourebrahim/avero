import { Spinner } from "@avero/react";

export default function SpinnerTones() {
  return (
    <div className="flex items-center gap-5">
      <Spinner tone="primary" size="md" />
      <Spinner tone="muted" size="md" />
      <span className="bg-primary inline-flex rounded-xl p-2.5">
        <Spinner tone="inverse" size="md" />
      </span>
      <Spinner variant="glow" size="lg" labelled />
    </div>
  );
}
