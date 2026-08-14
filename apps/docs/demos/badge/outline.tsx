import { Badge } from "@avero/react";
import { MapPin } from "lucide-react";

export default function BadgeOutlineDemo() {
  return (
    <>
      <Badge variant="outline" tone="indigo">
        طراحی
      </Badge>
      <Badge variant="outline" tone="emerald">
        سطح: مقدماتی
      </Badge>
      <Badge variant="outline" tone="amber">
        <MapPin className="size-3.5" aria-hidden />
        آنلاین
      </Badge>
    </>
  );
}
