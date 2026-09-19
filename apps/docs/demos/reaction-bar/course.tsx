"use client";

import { ReactionBar } from "@averoui/react";
import { useCopy } from "../copy";

export default function ReactionBarCourseDemo() {
  const t = useCopy({
    fa: { capacity: "حداکثر ۱۵ نفر" },
    en: { capacity: "15 places in total" },
  });

  return (
    <div className="w-full">
      <ReactionBar likes={0} views={4} capacity={t.capacity} saved={false} />
    </div>
  );
}
