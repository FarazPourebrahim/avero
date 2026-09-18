import type { Meta, StoryObj } from "@storybook/react-vite";
import { tokens } from "@averoui/tokens";
import { ResponsiveBanner } from "./ResponsiveBanner.js";

// Inline SVG artwork keeps the stories deterministic and offline (no remote images). The two
// artworks differ in shape and colour, so the swap is visible when the viewport is resized.
function artwork(width: number, height: number, from: string, to: string) {
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="${width}" height="${height}" fill="url(#g)"/></svg>`,
    )
  );
}

const meta = {
  title: "Data Display/ResponsiveBanner",
  component: ResponsiveBanner,
  args: {
    desktopSrc: artwork(1200, 300, tokens.colorPrimary.value, tokens.colorPrimaryHover.value),
    mobileSrc: artwork(600, 400, tokens.colorSecondary.value, tokens.colorWarning.value),
    alt: "جشنواره ثبت‌نام پاییز با تخفیف ویژه",
  },
} satisfies Meta<typeof ResponsiveBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SwitchAtLarge: Story = { args: { breakpoint: "lg" } };

export const AsLink: Story = {
  render: (args) => (
    <a
      href="#campaign"
      className="focus-visible:ring-primary/40 block rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
    >
      <ResponsiveBanner {...args} />
    </a>
  ),
};
