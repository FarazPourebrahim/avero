import {
  AwardIcon,
  BookmarkIcon,
  Button,
  ContactMethod,
  ContactMethods,
  Container,
  CtaBanner,
  FeatureCard,
  FeatureGrid,
  MessageCircleIcon,
  ShieldCheckIcon,
  SplitHero,
  StatStrip,
  StatTile,
  TelegramIcon,
  UsersIcon,
} from "@averoui/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { coverArt, PublicPage } from "./templateChrome";

// TP-06: an about page. Headings run h1 (hero) → h2 (why us) → h3 (features) → h2 (mission,
// contact).

const statIcon = "size-5 sm:size-6";

function AboutTemplate() {
  return (
    <PublicPage current="about">
      <Container as="main" id="main-content" className="flex flex-col gap-y-10 md:gap-y-20">
        <SplitHero
          titleAs="h1"
          eyebrow="از سال ۱۴۰۰"
          note="داستان ما"
          title="جایی برای یادگیری ساده و لذت‌بخش"
          image={coverArt}
          imageAlt=""
          actions={
            <>
              <Button elevated>مشاهده دوره‌ها</Button>
              <Button variant="soft">تماس با پشتیبانی</Button>
            </>
          }
        >
          <p>
            ما با یک پرسش ساده شروع کردیم: چرا یادگیری مهارت‌های تازه باید دشوار باشد؟ پاسخ ما
            دوره‌هایی کوتاه، عملی و در دسترس بود که هر کسی بتواند با سرعت خودش پیش برود.
          </p>
        </SplitHero>
        <StatStrip>
          <StatTile
            label="دوره‌های منتشرشده"
            value="۸۶"
            icon={<BookmarkIcon className={statIcon} />}
          />
          <StatTile
            label="شرکت‌کنندگان"
            value="۱۲٬۴۰۰"
            icon={<UsersIcon className={statIcon} />}
            tone="emerald"
          />
          <StatTile
            label="مدرس‌ها"
            value="۳۲"
            icon={<AwardIcon className={statIcon} />}
            tone="purple"
          />
          <StatTile
            label="پرسش‌های پاسخ‌داده"
            value="۴٬۸۰۰"
            icon={<MessageCircleIcon className={statIcon} />}
            tone="amber"
          />
        </StatStrip>
        <FeatureGrid title="چرا دوره‌های ما متفاوت‌اند؟" titleAs="h2">
          <FeatureCard
            titleAs="h3"
            tone="emerald"
            icon={<ShieldCheckIcon />}
            title="پرداخت امن"
            description="تا هفت روز پس از ثبت‌نام، بدون پرسش هزینه را بازمی‌گردانیم."
          />
          <FeatureCard
            titleAs="h3"
            tone="blue"
            icon={<UsersIcon />}
            title="مدرس‌های باتجربه"
            description="همه مدرس‌ها سال‌ها در همان حوزه کار کرده‌اند."
          />
          <FeatureCard
            titleAs="h3"
            tone="purple"
            icon={<AwardIcon />}
            title="گواهی پایان دوره"
            description="پس از گذراندن پروژه پایانی، گواهی قابل استعلام می‌گیرید."
          />
          <FeatureCard
            titleAs="h3"
            tone="amber"
            icon={<MessageCircleIcon />}
            title="پشتیبانی همیشگی"
            description="هر دوره انجمن پرسش و پاسخ خودش را دارد."
          />
        </FeatureGrid>
        <CtaBanner eyebrow="مأموریت ما" title="یادگیری بدون مرز، برای همه" titleAs="h2">
          می‌خواهیم جایی بسازیم که هر کسی، هر جا که باشد، بتواند مهارتی تازه بیاموزد و آن را در کار
          و زندگی به کار بگیرد.
        </CtaBanner>
        <ContactMethods
          title="راه‌های ارتباط با ما"
          titleAs="h2"
          description="برای پرسش درباره دوره‌ها یا همکاری از راه‌های زیر با ما در تماس باشید:"
        >
          <ContactMethod
            href="mailto:hello@example.com"
            label="email:"
            value="hello@example.com"
            external
          />
          <ContactMethod
            href="https://t.me/example"
            label="telegram:"
            value="@example"
            icon={<TelegramIcon className="text-sky-500" />}
            external
          />
        </ContactMethods>
      </Container>
    </PublicPage>
  );
}

const meta = {
  title: "Templates/About",
  component: AboutTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AboutTemplate>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
