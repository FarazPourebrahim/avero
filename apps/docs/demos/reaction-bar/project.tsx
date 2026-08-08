"use client";

import { ReactionBar } from "@avero/react";

export default function ReactionBarProjectDemo() {
  return (
    <div className="w-full">
      <ReactionBar likes={0} views={4} capacity="حداکثر 15 رزومه" saved={false} />
    </div>
  );
}
