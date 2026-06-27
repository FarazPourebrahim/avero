import { tokens } from "@avero/tokens";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Figure, Image } from "./Image.js";

// Inline SVG artwork keeps stories deterministic and offline (no remote images).
const FROM = tokens.colorPrimary.value;
const TO = tokens.colorHeroTshirt.value;
const HIGHLIGHT = tokens.colorSurfaceGlass.value;
const ARTWORK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${FROM}"/><stop offset="1" stop-color="${TO}"/></linearGradient></defs><rect width="800" height="450" fill="url(#g)"/><circle cx="600" cy="120" r="80" fill="${HIGHLIGHT}"/><rect x="80" y="280" width="360" height="40" rx="20" fill="${HIGHLIGHT}"/></svg>`,
  );

const meta = {
  title: "Primitives/Image",
  component: Image,
  args: { src: ARTWORK, alt: "نمونه تصویر", radius: "2xl", className: "h-60 w-full" },
  argTypes: {
    fit: { control: "inline-radio", options: ["cover", "contain"] },
    radius: { control: "select", options: ["none", "lg", "xl", "2xl", "3xl", "full"] },
    zoom: { control: "inline-radio", options: ["none", "subtle", "hover", "group"] },
    aspect: { control: "select", options: ["auto", "video", "4/3", "9/16", "9/15", "square"] },
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ArticleCover: Story = {
  render: () => (
    <Figure>
      <Image
        src={ARTWORK}
        alt="فریلنسری چیست؟"
        radius="2xl"
        zoom="subtle"
        loading="eager"
        className="h-60 w-full sm:h-80"
      />
    </Figure>
  ),
};

export const CardMedia: Story = {
  render: () => (
    <div className="group relative h-52 w-80 overflow-hidden rounded-3xl bg-slate-100">
      <Image src={ARTWORK} alt="طراحی سایت شرکتی" zoom="group" className="size-full" />
    </div>
  ),
};

export const BrokenImage: Story = {
  render: () => (
    <Image src="/does-not-exist.webp" alt="تصویر در دسترس نیست" radius="xl" className="h-40 w-64" />
  ),
};
