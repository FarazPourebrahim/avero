import type { Meta, StoryObj } from "@storybook/react-vite";
import { Menu } from "lucide-react";
import { Link } from "../link/Link.js";
import { ArticleLayout } from "../layouts/Layouts.js";
import { FooterSocialTile, SiteFooter } from "../site-footer/SiteFooter.js";
import { SiteHeader, SiteHeaderMenuButton } from "../site-header/SiteHeader.js";
import { SiteShell } from "./SiteShell.js";

const meta: Meta<typeof SiteShell> = {
  title: "Layout/SiteShell",
  component: SiteShell,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof SiteShell>;

export const PublicPage: Story = {
  render: (args) => (
    <div className="bg-background min-h-screen">
      <SiteShell
        {...args}
        header={
          <SiteHeader
            sticky={false}
            menu={
              <SiteHeaderMenuButton aria-label="باز کردن منو">
                <Menu className="size-5" />
              </SiteHeaderMenuButton>
            }
            logo={<span className="text-primary text-lg font-black">Avero</span>}
            nav={
              <>
                <Link variant="nav" href="#">
                  خانه
                </Link>
                <Link variant="nav" href="#" aria-current="page">
                  وبلاگ
                </Link>
              </>
            }
          />
        }
        footer={
          <SiteFooter
            logo={<span className="text-primary text-xl font-black">Avero</span>}
            brandLinks={[
              { label: "قوانین و مقررات", href: "#" },
              { label: "تماس با ما", href: "#" },
            ]}
            contact={{
              title: "ارتباط با ما",
              rows: [{ label: "ایمیل :", value: "hello@example.com", href: "mailto:hello@a.co" }],
            }}
            copyright="تمامی حقوق محفوظ است"
            social={<FooterSocialTile href="#" aria-label="تلگرام" />}
          />
        }
      >
        <ArticleLayout
          id="main-content"
          aside={<div className="rounded-2xl bg-white p-6">فهرست</div>}
        >
          <div className="min-h-64 rounded-3xl bg-white p-6 text-sm text-gray-500">مقاله</div>
        </ArticleLayout>
      </SiteShell>
    </div>
  ),
};
