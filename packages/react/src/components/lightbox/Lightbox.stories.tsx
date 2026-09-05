import type { Meta, StoryObj } from "@storybook/react-vite";
import { tokens } from "@avero/tokens";
import { useState } from "react";
import { ZoomFrame } from "../zoom-frame/ZoomFrame.js";
import { Lightbox, type LightboxImage } from "./Lightbox.js";

// Inline SVG artwork keeps the stories deterministic and offline (no remote images).
function artwork(from: string, to: string) {
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="800" height="500" fill="url(#g)"/><circle cx="600" cy="140" r="90" fill="${tokens.colorSurfaceGlass.value}"/></svg>`,
    )
  );
}

const IMAGES: LightboxImage[] = [
  {
    src: artwork(tokens.colorPrimary.value, tokens.colorPrimaryHover.value),
    alt: "صفحه اصلی اپلیکیشن آموزشی",
    caption: "طراحی صفحه اصلی، نسخه نهایی",
  },
  {
    src: artwork(tokens.colorSecondary.value, tokens.colorWarning.value),
    alt: "صفحه پروفایل مدرس",
  },
  {
    src: artwork(tokens.colorChartComments.value, tokens.colorChartViews.value),
    alt: "داشبورد گزارش‌ها",
    caption: "نمودار فعالیت هفتگی",
  },
];

function Gallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  return (
    <div className="grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
      {IMAGES.map((image, position) => (
        <ZoomFrame
          key={image.alt}
          onClick={() => {
            setIndex(position);
            setOpen(true);
          }}
        >
          <img src={image.src} alt={image.alt} className="h-40 w-full rounded-2xl object-cover" />
        </ZoomFrame>
      ))}
      <Lightbox
        images={IMAGES}
        open={open}
        onOpenChange={setOpen}
        index={index}
        onIndexChange={setIndex}
      />
    </div>
  );
}

const meta = {
  title: "Overlays/Lightbox",
  component: Lightbox,
  args: { images: IMAGES },
} satisfies Meta<typeof Lightbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithZoomFrames: Story = { render: () => <Gallery /> };

export const Open: Story = { args: { defaultOpen: true, defaultIndex: 0 } };

export const SingleImage: Story = {
  name: "Single image (open)",
  args: { defaultOpen: true, images: IMAGES.slice(1, 2) },
};
