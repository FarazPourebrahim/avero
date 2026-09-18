"use client";

import { ReportAction, ReportCard } from "@averoui/react";

export default function ReportVariantsDemo() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-wrap items-center gap-5">
        <ReportAction />
        <ReportAction variant="text" />
        <ReportAction variant="soft" />
      </div>
      <ReportCard />
    </div>
  );
}
