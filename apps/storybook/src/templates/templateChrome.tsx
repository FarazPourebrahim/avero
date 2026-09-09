import {
  Avatar,
  FooterSocialTile,
  Link,
  LinkedinIcon,
  ListUlSolidIcon,
  SiteFooter,
  SiteHeader,
  SiteHeaderMenuButton,
  SiteShell,
  TelegramIcon,
} from "@avero/react";
import { tokens } from "@avero/tokens";
import type { ReactNode } from "react";

// Shared by the example templates (Phase 10, TP-01…TP-06): the public site chrome and inline
// artwork. Templates are composed from `@avero/*` exports only, and the artwork is inline SVG built
// from tokens, so every page renders offline and deterministically.

function svg(markup: string) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(markup)}`;
}

function artwork(width: number, height: number, from: string, to: string) {
  return svg(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="${width}" height="${height}" fill="url(#g)"/><circle cx="${width * 0.72}" cy="${height * 0.3}" r="${height * 0.18}" fill="${tokens.colorSurfaceGlass.value}"/></svg>`,
  );
}

export const coverArt = artwork(
  1200,
  500,
  tokens.colorPrimary.value,
  tokens.colorPrimaryHover.value,
);
export const warmArt = artwork(800, 500, tokens.colorSecondary.value, tokens.colorWarning.value);
export const coolArt = artwork(
  800,
  500,
  tokens.colorChartComments.value,
  tokens.colorChartViews.value,
);
export const bannerArt = artwork(320, 400, tokens.colorPrimary.value, tokens.colorChartViews.value);
export const portraitArt = svg(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${tokens.colorBorderSubtle.value}"/><circle cx="32" cy="25" r="12" fill="${tokens.colorTextChrome.value}"/><path d="M10 60c3-12 12-18 22-18s19 6 22 18" fill="${tokens.colorTextChrome.value}"/></svg>`,
);

type Section = "home" | "courses" | "blog" | "about";

const NAV: ReadonlyArray<{ section: Section; label: string }> = [
  { section: "home", label: "خانه" },
  { section: "courses", label: "دوره‌ها" },
  { section: "blog", label: "وبلاگ" },
  { section: "about", label: "درباره ما" },
];

/** The public site around a template: skip link, header, the page's `main` and footer. */
export function PublicPage({ current, children }: { current: Section; children: ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <SiteShell
        header={
          <SiteHeader
            sticky={false}
            menu={
              <SiteHeaderMenuButton aria-label="باز کردن منو">
                <ListUlSolidIcon className="size-5" />
              </SiteHeaderMenuButton>
            }
            logo={
              <a href="#" className="text-primary py-2 text-lg font-black">
                Avero
              </a>
            }
            nav={NAV.map((item) => (
              <Link
                key={item.section}
                variant="nav"
                href="#"
                aria-current={item.section === current ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            actions={
              <a href="#" aria-label="پیشخوان سارا محمدی">
                <Avatar name="سارا محمدی" size="md" />
              </a>
            }
          />
        }
        footer={
          <SiteFooter
            categories={{
              title: "دسته‌بندی دوره‌ها",
              columns: [
                [
                  { label: "طراحی رابط کاربری", href: "#" },
                  { label: "تحلیل داده", href: "#" },
                ],
                [
                  { label: "برنامه‌نویسی وب", href: "#" },
                  { label: "عکاسی", href: "#" },
                ],
              ],
            }}
            logo={<span className="text-primary text-xl font-black">Avero</span>}
            brandLinksTitle="درباره ما"
            brandLinks={[
              { label: "قوانین و مقررات", href: "#" },
              { label: "تماس با ما", href: "#" },
            ]}
            groups={[
              {
                title: "دسترسی سریع",
                links: [
                  { label: "دوره‌ها", href: "#" },
                  { label: "وبلاگ", href: "#" },
                ],
              },
            ]}
            contact={{
              title: "ارتباط با ما",
              rows: [
                { label: "ایمیل :", value: "hello@example.com", href: "mailto:hello@example.com" },
              ],
            }}
            about={{
              long: "مدرسه‌ای آنلاین برای آموختن مهارت‌های تازه با دوره‌ها، کارگاه‌ها و مقاله‌های کاربردی.",
              short: "دوره‌ها، کارگاه‌ها و مقاله‌های کاربردی.",
            }}
            copyright="تمامی حقوق محفوظ است"
            social={
              <>
                <FooterSocialTile href="#" aria-label="تلگرام">
                  <TelegramIcon className="size-5" />
                </FooterSocialTile>
                <FooterSocialTile href="#" aria-label="لینکدین">
                  <LinkedinIcon className="size-5" />
                </FooterSocialTile>
              </>
            }
          />
        }
      >
        {children}
      </SiteShell>
    </div>
  );
}
