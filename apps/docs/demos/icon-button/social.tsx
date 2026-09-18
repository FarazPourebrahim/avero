import { IconButton, InstagramIcon, LinkedinInIcon, TelegramPlaneIcon } from "@averoui/react";
import { ChevronLeft, ChevronRight, Globe } from "lucide-react";

export default function IconButtonSocialDemo() {
  return (
    <>
      <IconButton label="قبلی" variant="circle" disabled>
        <ChevronRight className="size-6 ltr:-scale-x-100" />
      </IconButton>
      <IconButton label="بعدی" variant="circle">
        <ChevronLeft className="size-6 ltr:-scale-x-100" />
      </IconButton>
      <IconButton asChild label="وب‌سایت" variant="social">
        <a href="#website">
          <Globe className="size-4" />
        </a>
      </IconButton>
      <IconButton label="Telegram" variant="tile">
        <TelegramPlaneIcon size={20} />
      </IconButton>
      <IconButton label="LinkedIn" variant="tile">
        <LinkedinInIcon size={21} />
      </IconButton>
      <IconButton label="Instagram" variant="tile">
        <InstagramIcon size={27} />
      </IconButton>
    </>
  );
}
