import {
  CopySolidIcon,
  IconButton,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "@averoui/react";

export default function IconButtonShareDemo() {
  return (
    <>
      <IconButton label="Copy link" variant="soft" tone="neutral" size="lg">
        <CopySolidIcon size={15} />
      </IconButton>
      <IconButton label="Share on Telegram" variant="soft" tone="blue" size="lg">
        <TelegramIcon size={15} />
      </IconButton>
      <IconButton label="Share on LinkedIn" variant="soft" tone="blue" size="lg">
        <LinkedinIcon size={15} />
      </IconButton>
      <IconButton label="Share on X" variant="soft" tone="neutral" size="lg">
        <TwitterIcon size={15} />
      </IconButton>
      <IconButton label="Share on WhatsApp" variant="soft" tone="green" size="lg">
        <WhatsappIcon size={15} />
      </IconButton>
    </>
  );
}
