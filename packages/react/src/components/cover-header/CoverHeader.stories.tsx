import { tokens } from "@avero/tokens";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetaBar, MetaItem } from "../meta/Meta.js";
import { CoverHeader } from "./CoverHeader.js";

// Inline SVG artwork keeps stories deterministic and offline (no remote images).
const FROM = tokens.colorPrimary.value;
const TO = tokens.colorPrimaryHover.value;
const AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="${FROM}"/><circle cx="100" cy="78" r="38" fill="${TO}"/><rect x="34" y="130" width="132" height="70" rx="35" fill="${TO}"/></svg>`,
  );

const meta: Meta<typeof CoverHeader> = {
  title: "Data display/CoverHeader",
  component: CoverHeader,
};

export default meta;
type Story = StoryObj<typeof CoverHeader>;

export const Profile: Story = {
  render: (args) => (
    <CoverHeader {...args} avatar={<img src={AVATAR} alt="سارا محمدی" />}>
      <div className="mb-2 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">سارا محمدی</h1>
      </div>
      <p className="mb-3 text-sm font-medium text-gray-600 md:text-base">مدرس طراحی رابط کاربری</p>
      <MetaBar variant="inline" className="justify-center lg:justify-start">
        <MetaItem variant="pill">اصفهان (ایران)</MetaItem>
        <MetaItem variant="compact">عضویت: 3 ماه پیش</MetaItem>
      </MetaBar>
    </CoverHeader>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <CoverHeader
      {...args}
      avatar={<img src={AVATAR} alt="سارا محمدی" />}
      footer={
        <nav aria-label="بخش‌های پروفایل">
          <ul className="flex min-w-max items-center gap-2 text-xs text-gray-600 sm:gap-3 sm:text-sm">
            <li>
              <span className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 font-bold text-white shadow-md sm:px-4 sm:py-2.5">
                درباره من
              </span>
            </li>
            <li>
              <span className="flex items-center gap-1.5 rounded-xl bg-slate-50 px-3.5 py-2 font-bold text-slate-600 sm:px-4 sm:py-2.5">
                دوره‌ها (4)
              </span>
            </li>
          </ul>
        </nav>
      }
    >
      <h1 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">سارا محمدی</h1>
    </CoverHeader>
  ),
};
