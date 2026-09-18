import { FooterSocialTile, SiteFooter, TelegramIcon, LinkedinIcon } from "@averoui/react";

export default function SiteFooterDefaultDemo() {
  return (
    <div className="w-full">
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
              { label: "React", href: "#" },
            ],
            [
              { label: "عکاسی", href: "#" },
              { label: "Figma", href: "#" },
            ],
          ],
        }}
        logo={<span className="text-primary text-xl font-black">Avero</span>}
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
            { label: "شماره تماس :", value: "021-00000000", href: "tel:+982100000000" },
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
    </div>
  );
}
