import { FooterSocialTile, SiteFooter, TelegramIcon, LinkedinIcon } from "@avero/react";

export default function SiteFooterDefaultDemo() {
  return (
    <div className="w-full">
      <SiteFooter
        categories={{
          title: "دسته بندی مهارت",
          columns: [
            [
              { label: "طراحی سایت", href: "#" },
              { label: "سئو", href: "#" },
            ],
            [
              { label: "تولید محتوا", href: "#" },
              { label: "React", href: "#" },
            ],
            [
              { label: "طراحی گرافیک", href: "#" },
              { label: "Figma", href: "#" },
            ],
          ],
        }}
        logo={<span className="text-primary text-xl font-black">دورلنسر</span>}
        brandLinks={[
          { label: "قوانین و مقررات", href: "#" },
          { label: "تماس با ما", href: "#" },
        ]}
        brandLinksTitle="درباره ما"
        groups={[
          {
            title: "دسترسی سریع",
            links: [
              { label: "صفحه اصلی", href: "#" },
              { label: "وبلاگ", href: "#" },
            ],
          },
        ]}
        contact={{
          title: "ارتباط با ما",
          rows: [
            { label: "ایمیل :", value: "hello@example.com", href: "mailto:hello@example.com" },
            { label: "شماره تماس :", value: "09373860014", href: "tel:09373860014" },
          ],
        }}
        about={{
          long: "دورلنسر بستری برای ارتباط مستقیم کارفرمایان و فریلنسرهای متخصص است.",
          short: "بستری برای ارتباط مستقیم کارفرمایان و فریلنسرها.",
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
    </div>
  );
}
