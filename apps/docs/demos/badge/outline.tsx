import { Badge } from "@avero/react";
import { MapPin } from "lucide-react";

export default function BadgeOutlineDemo() {
  return (
    <>
      <Badge variant="outline" tone="indigo">
        سئو
      </Badge>
      <Badge variant="outline" tone="emerald">
        همکاری: remote
      </Badge>
      <Badge variant="outline" tone="amber">
        <MapPin className="size-3.5" aria-hidden />
        ایران، تهران
      </Badge>
    </>
  );
}
