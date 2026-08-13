import { tokens } from "@avero/tokens";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PromoBanner } from "./PromoBanner.js";

// Inline SVG artwork keeps stories deterministic and offline (no remote images).
const GROUND = tokens.colorPrimary.value;
const HIGHLIGHT = tokens.colorSurfaceGlass.value;
const ARTWORK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 400"><rect width="320" height="400" fill="${GROUND}"/><circle cx="160" cy="170" r="70" fill="${HIGHLIGHT}"/><rect x="48" y="300" width="224" height="32" rx="16" fill="${HIGHLIGHT}"/></svg>`,
  );

const meta: Meta<typeof PromoBanner> = {
  title: "Blocks/PromoBanner",
  component: PromoBanner,
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PromoBanner>;

export const Listing: Story = {
  args: { href: "#", image: ARTWORK, label: "دوره‌های تازه" },
};

export const Project: Story = {
  args: { href: "#", image: ARTWORK, label: "ثبت‌نام در کارگاه", variant: "project" },
};
