import type { Meta, StoryObj } from "@storybook/react-vite";
import { FooterSocialTile, SiteFooter } from "./SiteFooter.js";
import { InstagramIcon, TelegramIcon, LinkedinIcon } from "../../icons/referenceIcons.generated.js";

const CATEGORY_COLUMNS = [
  ["طراحی سایت", "تولید محتوا", "طراحی گرافیک", "سئو"],
  ["تدوین ویدئو", "React", "طراحی UI/UX", "ادیت ویدئو"],
  ["موشن گرافیک", "Figma", "وردپرس", "Angular"],
  ["طراحی بنر", "MySQL", "Node.js", "Flutter"],
  ["طراحی لوگوتایپ", "پاورپوینت", "سئو وردپرس", "Dart"],
].map((column) => column.map((label) => ({ label, href: "#" })));

const meta: Meta<typeof SiteFooter> = {
  title: "Layout/SiteFooter",
  component: SiteFooter,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof SiteFooter>;

export const Default: Story = {
  render: (args) => (
    <SiteFooter
      {...args}
      categories={{ title: "دسته بندی مهارت", columns: CATEGORY_COLUMNS }}
      logo={<span className="text-primary text-xl font-black">دورلنسر</span>}
      brandLinks={[
        { label: "قوانین و مقررات", href: "#" },
        { label: "تماس با ما", href: "#" },
        { label: "درباره ما", href: "#" },
      ]}
      brandLinksTitle="درباره ما"
      groups={[
        {
          title: "مهارت ها",
          links: [
            { label: "طراحی سایت", href: "#" },
            { label: "تولید محتوا", href: "#" },
            { label: "سئو", href: "#" },
          ],
        },
        {
          title: "دسترسی سریع",
          links: [
            { label: "صفحه اصلی", href: "#" },
            { label: "وبلاگ", href: "#" },
            { label: "سوالات متداول", href: "#" },
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
        long: "دورلنسر بستری برای ارتباط مستقیم کارفرمایان و فریلنسرهای متخصص است تا پروژه‌ها سریع‌تر، مطمئن‌تر و با کیفیت بالاتر انجام شوند.",
        short: "بستری برای ارتباط مستقیم کارفرمایان و فریلنسرهای متخصص.",
      }}
      copyright={
        <>
          تمامی حقوق برای
          <a href="#" className="hover:text-primary mx-1 font-semibold">
            دورلنسر
          </a>
          محفوظ است
        </>
      }
      social={
        <>
          <FooterSocialTile href="#" aria-label="تلگرام">
            <TelegramIcon className="size-5" />
          </FooterSocialTile>
          <FooterSocialTile href="#" aria-label="اینستاگرام">
            <InstagramIcon className="size-5" />
          </FooterSocialTile>
          <FooterSocialTile href="#" aria-label="لینکدین">
            <LinkedinIcon className="size-5" />
          </FooterSocialTile>
        </>
      }
    />
  ),
};
