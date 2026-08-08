import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Badge } from "../../components/badge/index.js";
import { IconButton } from "../../components/icon-button/index.js";
import { MetaItem } from "../../components/meta/index.js";
import { PillTab, PillTabs } from "../../components/pill-tabs/index.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ProfileHeader } from "./ProfileHeader.js";

const PROPS = {
  name: "فلاح",
  image: "/avatar.jpg",
  headline: "طراحی انواع سایت و سئو",
  badge: <Badge variant="premium">پکیج رایگان</Badge>,
  meta: <MetaItem variant="pill">تهران (ایران)</MetaItem>,
};

function tabs() {
  return (
    <PillTabs aria-label="بخش‌های پروفایل">
      <PillTab href="/about" current>
        درباره من
      </PillTab>
      <PillTab href="/portfolio">نمونه کار (4)</PillTab>
    </PillTabs>
  );
}

describe("ProfileHeader", () => {
  it("renders the name, badge, headline and meta", () => {
    render(<ProfileHeader {...PROPS} />);

    expect(screen.getByRole("heading", { level: 1, name: "فلاح" })).toBeInTheDocument();
    expect(screen.getByText("پکیج رایگان")).toBeInTheDocument();
    expect(screen.getByText("طراحی انواع سایت و سئو")).toBeInTheDocument();
    expect(screen.getByText("تهران (ایران)")).toBeInTheDocument();
  });

  it("puts the avatar in the ring that overlaps the cover", () => {
    const { container } = render(<ProfileHeader {...PROPS} />);
    const ring = container.querySelector('[data-slot="cover-header-avatar"]');

    expect(ring).toHaveClass("rounded-full", "border-white");
    expect(ring?.querySelector("img")).toHaveAttribute("alt", "فلاح");
  });

  it("renders tabs and social links in the footer", () => {
    render(
      <ProfileHeader
        {...PROPS}
        tabs={tabs()}
        socials={
          <IconButton label="تلگرام" variant="social">
            <svg aria-hidden="true" />
          </IconButton>
        }
      />,
    );

    expect(screen.getByRole("navigation", { name: "بخش‌های پروفایل" })).toBeInTheDocument();
    expect(screen.getByText("شبکه‌های اجتماعی:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "تلگرام" })).toBeInTheDocument();
  });

  it("omits the footer bar when there are neither tabs nor socials", () => {
    const { container } = render(<ProfileHeader {...PROPS} />);

    expect(container.querySelector('[data-slot="cover-header-footer"]')).toBeNull();
  });

  it("aligns the socials label logically, not to the left", () => {
    const { container } = render(<ProfileHeader {...PROPS} socials={<span>TG</span>} />);
    const label = container.querySelector('[data-slot="profile-header-socials"] > span');

    expect(label).toHaveClass("me-1");
    expect(label?.className).not.toMatch(/ml-1/);
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ProfileHeader {...PROPS} ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "profile-header");
  });

  it("renders on the server", () => {
    expect(renderToString(<ProfileHeader {...PROPS} tabs={tabs()} />)).toContain("درباره من");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ProfileHeader {...PROPS} tabs={tabs()} />);

    await expectNoAxeViolations(container);
  });
});
