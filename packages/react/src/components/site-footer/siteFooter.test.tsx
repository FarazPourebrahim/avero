import { render, screen, within } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { FooterSocialTile, SiteFooter, type SiteFooterProps } from "./SiteFooter.js";

const CATEGORIES = {
  title: "دسته‌بندی دوره‌ها",
  columns: [
    [
      { label: "طراحی رابط کاربری", href: "/c/ui" },
      { label: "تحلیل داده", href: "/c/data" },
    ],
    [{ label: "برنامه‌نویسی وب", href: "/c/web" }],
  ],
};

const BRAND_LINKS = [
  { label: "قوانین و مقررات", href: "/terms" },
  { label: "تماس با ما", href: "/contact" },
];

function Footer(props: Partial<SiteFooterProps>) {
  return (
    <SiteFooter
      categories={CATEGORIES}
      logo={<img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt="Avero" />}
      brandLinks={BRAND_LINKS}
      brandLinksTitle="درباره ما"
      groups={[{ title: "دوره‌ها", links: [{ label: "تحلیل داده", href: "/c/data" }] }]}
      contact={{
        title: "ارتباط با ما",
        rows: [
          { label: "ایمیل :", value: "hello@example.com", href: "mailto:hello@example.com" },
          { label: "شماره تماس :", value: "021-00000000", href: "tel:+982100000000" },
        ],
      }}
      about={{
        long: "Avero مجموعه‌ای از دوره‌های کوتاه و کاربردی است.",
        short: "خلاصه",
      }}
      trustSeal={<img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt="نماد اعتماد" />}
      copyright="تمامی حقوق محفوظ است"
      social={<FooterSocialTile href="https://t.me/example" aria-label="تلگرام" />}
      {...props}
    />
  );
}

describe("SiteFooter", () => {
  it("renders the category chip grid", () => {
    const { container } = render(<Footer />);
    const grid = container.querySelector('[data-slot="footer-categories"]');

    expect(grid).toHaveClass("hidden", "md:block");
    expect(
      within(grid as HTMLElement).getByRole("link", { name: "طراحی رابط کاربری" }),
    ).toHaveClass("text-text-chrome", "rounded-md");
    expect(grid?.querySelectorAll('[data-slot="footer-chip"]')).toHaveLength(3);
  });

  it("renders the brand chips and the mobile accordion groups", () => {
    const { container } = render(<Footer />);

    expect(container.querySelector('[data-slot="footer-groups"]')).toHaveClass("md:hidden");
    // The brand links lead the accordions, then the explicit groups.
    const triggers = screen.getAllByRole("button");
    expect(triggers.map((trigger) => trigger.textContent)).toEqual(["درباره ما", "دوره‌ها"]);
  });

  it("keeps brand links desktop-only without a title", () => {
    const { container } = render(<Footer brandLinksTitle={undefined} groups={undefined} />);

    expect(container.querySelector('[data-slot="footer-groups"]')).toBeNull();
  });

  it("renders contact rows as key/value pairs", () => {
    render(<Footer />);
    const email = screen.getByRole("link", { name: "hello@example.com" });

    expect(email).toHaveAttribute("href", "mailto:hello@example.com");
    expect(email).toHaveAttribute("dir", "ltr");
  });

  it("renders the about strip, trust seal, copyright and social tiles", () => {
    const { container } = render(<Footer />);

    expect(container.querySelector('[data-slot="footer-about"]')).toHaveClass(
      "bg-surface-muted",
      "shadow-brand-soft",
    );
    expect(screen.getByRole("img", { name: "نماد اعتماد" })).toBeInTheDocument();
    expect(screen.getByText("تمامی حقوق محفوظ است")).toHaveClass("text-text-muted");
    expect(screen.getByRole("link", { name: "تلگرام" })).toHaveClass("bg-surface-muted", "size-10");
  });

  it("opens external links safely", () => {
    render(
      <SiteFooter
        brandLinks={[{ label: "بلاگ", href: "https://example.com", external: true }]}
        logo={<span>لوگو</span>}
      />,
    );

    expect(screen.getByRole("link", { name: "بلاگ" })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
  });

  it("omits every optional section", () => {
    const { container } = render(<SiteFooter />);

    for (const slot of ["footer-categories", "footer-contact", "footer-about", "footer-bottom"]) {
      expect(container.querySelector(`[data-slot="${slot}"]`)).toBeNull();
    }
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLElement>();
    render(<SiteFooter ref={ref} />);

    expect(ref.current?.tagName).toBe("FOOTER");
  });

  it("renders on the server", () => {
    expect(renderToString(<Footer />)).toContain('data-slot="site-footer"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Footer />);

    await expectNoAxeViolations(container);
  });
});
