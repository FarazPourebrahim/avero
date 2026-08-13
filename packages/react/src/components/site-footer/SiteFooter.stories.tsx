import type { Meta, StoryObj } from "@storybook/react-vite";
import { FooterSocialTile, SiteFooter } from "./SiteFooter.js";
import { InstagramIcon, TelegramIcon, LinkedinIcon } from "../../icons/publicIcons.js";

const CATEGORY_COLUMNS = [
  ["طراحی رابط کاربری", "برنامه‌نویسی وب", "تحلیل داده", "مدیریت محصول"],
  ["React", "TypeScript", "Figma", "Python"],
  ["عکاسی", "تدوین ویدئو", "بازاریابی محتوا", "زبان انگلیسی"],
  ["Node.js", "SQL", "Flutter", "هوش مصنوعی"],
  ["نویسندگی", "طراحی گرافیک", "امنیت شبکه", "Docker"],
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
      categories={{ title: "دسته‌بندی دوره‌ها", columns: CATEGORY_COLUMNS }}
      logo={<span className="text-primary text-xl font-black">Avero</span>}
      brandLinks={[
        { label: "قوانین و مقررات", href: "#" },
        { label: "تماس با ما", href: "#" },
        { label: "درباره ما", href: "#" },
      ]}
      brandLinksTitle="درباره ما"
      groups={[
        {
          title: "دوره‌ها",
          links: [
            { label: "طراحی رابط کاربری", href: "#" },
            { label: "برنامه‌نویسی وب", href: "#" },
            { label: "تحلیل داده", href: "#" },
          ],
        },
        {
          title: "دسترسی سریع",
          links: [
            { label: "صفحه اصلی", href: "#" },
            { label: "وبلاگ", href: "#" },
            { label: "پرسش‌های متداول", href: "#" },
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
        long: "Avero مجموعه‌ای از دوره‌های کوتاه و کاربردی است که یادگیری مهارت‌های تازه را ساده‌تر و لذت‌بخش‌تر می‌کند.",
        short: "دوره‌های کوتاه و کاربردی برای یادگیری مهارت‌های تازه.",
      }}
      copyright={
        <>
          تمامی حقوق برای
          <a href="#" className="hover:text-primary mx-1 font-semibold">
            Avero
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
