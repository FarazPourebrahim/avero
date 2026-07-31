import { ProviderCard, Rating } from "@avero/react";

export default function ProviderCardServiceDemo() {
  return (
    <div className="w-full max-w-sm">
      <ProviderCard
        name="زینب فلاح"
        headline="طراحی سایت و سئو"
        stats={[
          { label: "تعداد خدمات", value: "1" },
          { label: "امتیاز رضایت", value: <Rating value={0} size="sm" /> },
        ]}
        profileHref="#"
      />
    </div>
  );
}
