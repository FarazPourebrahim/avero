import { MatchScore } from "@averoui/react";

export default function MatchScoreValuesDemo() {
  return (
    <div className="flex flex-wrap items-start gap-8">
      <MatchScore value={96} />
      <MatchScore value={64} label="هم‌خوانی با جستجو" />
      <MatchScore value={0} />
    </div>
  );
}
