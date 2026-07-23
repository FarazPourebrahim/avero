"use client";

import { ShowcaseCard } from "@avero/react";

export default function ShowcaseCardPortfolioDemo() {
  return (
    <div className="w-full max-w-sm">
      <ShowcaseCard
        title="طراحی سایت طراحی سایت و سئو"
        href="#"
        description="طراحی سایت برای خدمات طراحی سایت و سئو و غیره"
        tags={["وردپرس", "سئو"]}
        likes={0}
        onShare={() => {}}
      />
    </div>
  );
}
