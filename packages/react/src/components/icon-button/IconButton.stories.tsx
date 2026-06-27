import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, ChevronLeft, ChevronRight, Globe, House, Menu, Share2, X } from "lucide-react";
import {
  CopySolidIcon,
  InstagramIcon,
  LinkedinIcon,
  LinkedinInIcon,
  TelegramIcon,
  TelegramPlaneIcon,
  TwitterIcon,
  WhatsappIcon,
} from "../../icons/referenceIcons.generated.js";
import { IconButton } from "./IconButton.js";

const meta = {
  title: "Primitives/IconButton",
  component: IconButton,
  args: { label: "اعلان‌ها", children: <Bell className="size-5" /> },
  argTypes: {
    variant: {
      control: "select",
      options: ["chrome", "outline", "ghost", "soft", "circle", "social", "tile"],
    },
    tone: { control: "select", options: ["neutral", "blue", "sky", "green", "emerald", "slate"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Chrome: Story = {
  render: () => (
    <div className="flex items-center gap-2">
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
    </div>
  ),
};

export const ShareButtons: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton label="Copy link" variant="soft" tone="neutral" size="lg">
        <CopySolidIcon size={15} />
      </IconButton>
      <IconButton label="Share on Telegram" variant="soft" tone="blue" size="lg">
        <TelegramIcon size={15} />
      </IconButton>
      <IconButton
        label="Share on LinkedIn"
        variant="soft"
        tone="blue"
        size="lg"
        className="text-blue-700"
      >
        <LinkedinIcon size={15} />
      </IconButton>
      <IconButton
        label="Share on X"
        variant="soft"
        tone="neutral"
        size="lg"
        className="text-gray-800"
      >
        <TwitterIcon size={15} />
      </IconButton>
      <IconButton label="Share on WhatsApp" variant="soft" tone="green" size="lg">
        <WhatsappIcon size={15} />
      </IconButton>
      <IconButton label="اشتراک‌گذاری" variant="soft" tone="slate">
        <Share2 className="size-4" />
      </IconButton>
    </div>
  ),
};

export const Carousel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <IconButton label="قبلی" variant="circle" disabled>
        <ChevronRight className="size-6 ltr:-scale-x-100" />
      </IconButton>
      <IconButton label="بعدی" variant="circle">
        <ChevronLeft className="size-6 ltr:-scale-x-100" />
      </IconButton>
    </div>
  ),
};

export const Social: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <IconButton asChild label="وب‌سایت" variant="social">
          <a href="#website">
            <Globe className="size-4" />
          </a>
        </IconButton>
        <IconButton asChild label="تلگرام" variant="social">
          <a href="#telegram">
            <span className="text-xs font-bold" dir="ltr">
              TG
            </span>
          </a>
        </IconButton>
      </div>
      <div className="flex items-center gap-3">
        <IconButton label="Telegram" variant="tile">
          <TelegramPlaneIcon size={20} />
        </IconButton>
        <IconButton label="LinkedIn" variant="tile">
          <LinkedinInIcon size={21} />
        </IconButton>
        <IconButton label="Instagram" variant="tile">
          <InstagramIcon size={27} />
        </IconButton>
      </div>
    </div>
  ),
};
