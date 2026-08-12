import { CoverHeader, MetaBar, MetaItem } from "@avero/react";
import { tokens } from "@avero/tokens";

// Inline SVG artwork keeps the demo deterministic and offline (no remote images).
const AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="${tokens.colorPrimary.value}"/><circle cx="100" cy="78" r="38" fill="${tokens.colorPrimaryHover.value}"/><rect x="34" y="130" width="132" height="70" rx="35" fill="${tokens.colorPrimaryHover.value}"/></svg>`,
  );

export default function CoverHeaderProfileDemo() {
  return (
    <CoverHeader
      className="w-full"
      avatar={<img src={AVATAR} alt="فلاح" />}
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
                نمونه کار (4)
              </span>
            </li>
          </ul>
        </nav>
      }
    >
      <h3 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">فلاح</h3>
      <p className="mb-3 text-sm font-medium text-gray-600 md:text-base">طراحی انواع سایت و سئو</p>
      <MetaBar variant="inline" className="justify-center lg:justify-start">
        <MetaItem variant="pill">تهران (ایران)</MetaItem>
        <MetaItem variant="compact">تاریخ عضویت: 2 هفته پیش</MetaItem>
      </MetaBar>
    </CoverHeader>
  );
}
