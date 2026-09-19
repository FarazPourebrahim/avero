"use client";

import { IconButton, InstagramIcon, LinkedinInIcon, TelegramPlaneIcon } from "@averoui/react";
import { ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { useCopy } from "../copy";

export default function IconButtonSocialDemo() {
  const t = useCopy({
    fa: { previous: "قبلی", next: "بعدی", website: "وب‌سایت" },
    en: { previous: "Previous", next: "Next", website: "Website" },
  });

  return (
    <>
      <IconButton label={t.previous} variant="circle" disabled>
        <ChevronRight className="size-6 ltr:-scale-x-100" />
      </IconButton>
      <IconButton label={t.next} variant="circle">
        <ChevronLeft className="size-6 ltr:-scale-x-100" />
      </IconButton>
      <IconButton asChild label={t.website} variant="social">
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
