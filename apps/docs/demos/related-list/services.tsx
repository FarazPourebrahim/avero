"use client";

import { RelatedItem, RelatedList } from "@avero/react";

export default function RelatedListServicesDemo() {
  return (
    <div className="w-full max-w-sm">
      <RelatedList title="خدمات مرتبط">
        <RelatedItem title="سئو SEO سایت با رویکرد فروش" href="#" price={35000000} />
        <RelatedItem title="طراحی فروشگاه اینترنتی" href="#" price={52000000} />
        <RelatedItem title="طراحی لوگو و هویت بصری" href="#" meta={<span>توافقی</span>} />
      </RelatedList>
    </div>
  );
}
