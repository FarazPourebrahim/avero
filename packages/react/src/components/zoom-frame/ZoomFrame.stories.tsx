import { tokens } from "@avero/tokens";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ZoomFrame } from "./ZoomFrame.js";

// Inline SVG artwork keeps stories deterministic and offline (no remote images).
const FROM = tokens.colorPrimary.value;
const TO = tokens.colorPrimaryHover.value;
const HIGHLIGHT = tokens.colorSurfaceGlass.value;
const ARTWORK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${FROM}"/><stop offset="1" stop-color="${TO}"/></linearGradient></defs><rect width="800" height="450" fill="url(#g)"/><circle cx="600" cy="120" r="80" fill="${HIGHLIGHT}"/></svg>`,
  );

const meta: Meta<typeof ZoomFrame> = {
  title: "Data display/ZoomFrame",
  component: ZoomFrame,
};

export default meta;
type Story = StoryObj<typeof ZoomFrame>;

export const Gallery: Story = {
  render: (args) => (
    <div className="max-w-2xl space-y-4 rounded-3xl border border-slate-100 bg-white p-4 shadow-xs md:p-6">
      <h3 className="text-sm font-black text-slate-900">گالری تصاویر و نمونه کارها</h3>
      <ZoomFrame {...args}>
        <img
          src={ARTWORK}
          alt="طراحی سایت و سئو"
          className="h-[280px] w-full rounded-2xl object-cover md:h-[480px]"
        />
      </ZoomFrame>
    </div>
  ),
};
