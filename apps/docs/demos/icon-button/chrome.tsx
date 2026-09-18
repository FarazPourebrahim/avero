import { IconButton } from "@averoui/react";
import { Bell, House, Menu, X } from "lucide-react";

export default function IconButtonChromeDemo() {
  return (
    <>
      <IconButton label="خانه">
        <House className="size-5" />
      </IconButton>
      <IconButton label="اعلان‌ها">
        <Bell className="size-5" />
      </IconButton>
      <IconButton label="منو" variant="outline">
        <Menu className="size-6" />
      </IconButton>
      <IconButton label="بستن منو" variant="ghost" size="sm">
        <X className="size-5" />
      </IconButton>
    </>
  );
}
