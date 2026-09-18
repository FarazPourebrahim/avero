import { ProviderCard, Rating } from "@averoui/react";

export default function ProviderCardInstructorDemo() {
  return (
    <div className="w-full max-w-sm">
      <ProviderCard
        name="نگار رضایی"
        headline="مدرس طراحی رابط کاربری"
        stats={[
          { label: "تعداد دوره‌ها", value: "3" },
          { label: "امتیاز شرکت‌کنندگان", value: <Rating value={4.8} size="sm" /> },
        ]}
        profileHref="#"
      />
    </div>
  );
}
