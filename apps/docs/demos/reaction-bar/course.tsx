"use client";

import { ReactionBar } from "@averoui/react";

export default function ReactionBarCourseDemo() {
  return (
    <div className="w-full">
      <ReactionBar likes={0} views={4} capacity="حداکثر 15 نفر" saved={false} />
    </div>
  );
}
