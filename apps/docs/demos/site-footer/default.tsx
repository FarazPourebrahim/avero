"use client";

import { FooterSocialTile, LinkedinIcon, SiteFooter, TelegramIcon } from "@averoui/react";
import { useCopy } from "../copy";

export default function SiteFooterDefaultDemo() {
  const t = useCopy({
    fa: {
      categoriesTitle: "دسته‌بندی دوره‌ها",
      ui: "طراحی رابط کاربری",
      data: "تحلیل داده",
      web: "برنامه‌نویسی وب",
      photography: "عکاسی",
      aboutTitle: "درباره ما",
      terms: "قوانین و مقررات",
      contactUs: "تماس با ما",
      quick: "دسترسی سریع",
      home: "صفحه اصلی",
      blog: "وبلاگ",
      contactTitle: "ارتباط با ما",
      email: "ایمیل :",
      phone: "شماره تماس :",
      phoneValue: "۰۲۱-۰۰۰۰۰۰۰۰",
      long: "مدرسه‌ای آنلاین برای آموختن مهارت‌های تازه با دوره‌ها، کارگاه‌ها و مقاله‌های کاربردی.",
      short: "دوره‌ها، کارگاه‌ها و مقاله‌های کاربردی.",
      copyright: "تمامی حقوق محفوظ است",
      telegram: "تلگرام",
      linkedin: "لینکدین",
    },
    en: {
      categoriesTitle: "Course categories",
      ui: "UI design",
      data: "Data analysis",
      web: "Web development",
      photography: "Photography",
      aboutTitle: "About us",
      terms: "Terms and conditions",
      contactUs: "Contact us",
      quick: "Quick links",
      home: "Home",
      blog: "Blog",
      contactTitle: "Get in touch",
      email: "Email:",
      phone: "Phone:",
      phoneValue: "021-00000000",
      long: "An online school for picking up new skills, through courses, workshops and practical articles.",
      short: "Courses, workshops and practical articles.",
      copyright: "All rights reserved",
      telegram: "Telegram",
      linkedin: "LinkedIn",
    },
  });

  return (
    <div className="w-full">
      <SiteFooter
        categories={{
          title: t.categoriesTitle,
          columns: [
            [
              { label: t.ui, href: "#" },
              { label: t.data, href: "#" },
            ],
            [
              { label: t.web, href: "#" },
              { label: "React", href: "#" },
            ],
            [
              { label: t.photography, href: "#" },
              { label: "Figma", href: "#" },
            ],
          ],
        }}
        logo={<span className="text-primary text-xl font-black">Avero</span>}
        brandLinks={[
          { label: t.terms, href: "#" },
          { label: t.contactUs, href: "#" },
        ]}
        brandLinksTitle={t.aboutTitle}
        groups={[
          {
            title: t.quick,
            links: [
              { label: t.home, href: "#" },
              { label: t.blog, href: "#" },
            ],
          },
        ]}
        contact={{
          title: t.contactTitle,
          rows: [
            { label: t.email, value: "hello@example.com", href: "mailto:hello@example.com" },
            { label: t.phone, value: t.phoneValue, href: "tel:+982100000000" },
          ],
        }}
        about={{ long: t.long, short: t.short }}
        copyright={t.copyright}
        social={
          <>
            <FooterSocialTile href="#" aria-label={t.telegram}>
              <TelegramIcon className="size-5" />
            </FooterSocialTile>
            <FooterSocialTile href="#" aria-label={t.linkedin}>
              <LinkedinIcon className="size-5" />
            </FooterSocialTile>
          </>
        }
      />
    </div>
  );
}
