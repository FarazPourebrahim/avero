import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ActionTile } from "../action-tile/ActionTile.js";
import { GlowOrbs } from "../glow-orbs/GlowOrbs.js";
import { SectionHeader } from "../section-header/SectionHeader.js";
import { FeatureCard } from "./FeatureCard.js";

const icon = <svg data-testid="icon" aria-hidden="true" />;

describe("FeatureCard", () => {
  it("renders an icon tile, title and description", () => {
    const { container } = render(
      <FeatureCard
        title="سیستم پرداخت امن و تضمین‌شده"
        description="حفظ امنیت مالی کارفرما"
        icon={icon}
        tone="emerald"
      />,
    );

    expect(screen.getByRole("heading", { level: 4 })).toHaveClass("text-base", "font-bold");
    expect(container.querySelector('[data-slot="icon-tile"]')).toHaveClass("bg-emerald-50", "p-3");
    expect(container.firstElementChild).toHaveClass("hover:border-primary/30", "shadow-card-faint");
  });

  it("supports another heading level and no icon", () => {
    const { container } = render(<FeatureCard title="t" description="d" titleAs="h3" />);

    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    expect(container.querySelector('[data-slot="icon-tile"]')).not.toBeInTheDocument();
  });
});

describe("ActionTile", () => {
  it("renders a button with a gradient icon tile and a hover overlay", async () => {
    const onClick = vi.fn();
    const { container } = render(
      <ActionTile icon={icon} tone="rose" onClick={onClick}>
        ارتقای پلن
      </ActionTile>,
    );
    const button = screen.getByRole("button", { name: "ارتقای پلن" });

    await userEvent.click(button);

    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("group", "hover:-translate-y-0.5");
    expect(container.querySelector('[data-slot="icon-tile"]')).toHaveClass(
      "from-rose-500",
      "to-pink-600",
    );
    expect(container.querySelector('[aria-hidden="true"].absolute')).toHaveClass(
      "group-hover:opacity-100",
      "from-rose-500",
    );
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["amber", "to-orange-500"],
    ["slate", "from-slate-600"],
  ] as const)("uses the %s gradient", (tone, expected) => {
    const { container } = render(
      <ActionTile icon={icon} tone={tone}>
        label
      </ActionTile>,
    );

    expect(container.querySelector('[data-slot="icon-tile"]')).toHaveClass(expected);
  });

  it("styles a link with asChild", () => {
    render(
      <ActionTile asChild icon={icon}>
        <a href="/services/new">افزودن خدمت</a>
      </ActionTile>,
    );

    expect(screen.getByRole("link", { name: "افزودن خدمت" })).toHaveAttribute(
      "data-slot",
      "action-tile",
    );
  });
});

describe("SectionHeader", () => {
  it("renders a plain section title with actions", () => {
    render(<SectionHeader title="پروژه‌های مرتبط" actions={<button type="button">بعدی</button>} />);

    const heading = screen.getByRole("heading", { level: 2, name: "پروژه‌های مرتبط" });
    expect(heading).toHaveClass("text-xl", "md:text-2xl");
    expect(heading.parentElement).toHaveClass("justify-between");
    expect(screen.getByRole("button", { name: "بعدی" })).toBeInTheDocument();
  });

  it("renders the accent-bar page header with a subtitle", () => {
    const { container } = render(
      <SectionHeader
        variant="accentBar"
        as="h1"
        title="داستان شکل‌گیری دورلنسر"
        subtitle="روایت یک تصمیم"
        actions={<span>actions</span>}
      />,
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveClass("font-extrabold");
    expect(screen.getByText("روایت یک تصمیم")).toHaveClass("text-gray-500");
    expect(container.querySelector(".gradient-accent-bar")).toHaveAttribute("aria-hidden", "true");
  });

  it("renders the dot variant", () => {
    const { container } = render(
      <SectionHeader variant="dot" as="h3" title="درباره من" actions={<span>x</span>} />,
    );

    expect(screen.getByRole("heading", { level: 3 })).toHaveClass("text-blue-600");
    expect(container.querySelector(".rounded-full.bg-blue-600")).toBeInTheDocument();
  });

  it("renders the icon variant", () => {
    render(
      <SectionHeader variant="icon" title="چرا دورلنسر؟" icon={icon} actions={<span>x</span>} />,
    );

    expect(screen.getByRole("heading")).toHaveClass("text-slate-800");
    expect(screen.getByTestId("icon").parentElement).toHaveClass("text-primary");
  });

  it("renders the dot and icon variants without actions or icon", () => {
    render(
      <>
        <SectionHeader variant="dot" title="dot" />
        <SectionHeader variant="icon" title="icon" />
        <SectionHeader variant="accentBar" title="bar" />
      </>,
    );

    expect(screen.getAllByRole("heading")).toHaveLength(3);
  });
});

describe("GlowOrbs", () => {
  it("renders two decorative orbs at logical corners", () => {
    const { container } = render(<GlowOrbs />);
    const [first, second] = container.querySelectorAll("span");

    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
    expect(first).toHaveClass("-start-20", "-top-20", "bg-primary/20", "blur-3xl");
    expect(second).toHaveClass("-end-20", "-bottom-20", "bg-cyan-500/20");
  });
});

describe("display cards", () => {
  it("forward refs", () => {
    const feature = createRef<HTMLDivElement>();
    const tile = createRef<HTMLButtonElement>();
    const header = createRef<HTMLDivElement>();
    const orbs = createRef<HTMLDivElement>();
    render(
      <>
        <FeatureCard ref={feature} title="t" description="d" />
        <ActionTile ref={tile} icon={icon}>
          a
        </ActionTile>
        <SectionHeader ref={header} title="h" />
        <GlowOrbs ref={orbs} />
      </>,
    );

    expect(feature.current).toHaveAttribute("data-slot", "feature-card");
    expect(tile.current?.tagName).toBe("BUTTON");
    expect(header.current).toHaveAttribute("data-slot", "section-header");
    expect(orbs.current).toHaveAttribute("data-slot", "glow-orbs");
  });

  it("render on the server", () => {
    const html = renderToString(
      <>
        <SectionHeader variant="accentBar" title="t" subtitle="s" />
        <FeatureCard title="t" description="d" icon={icon} />
        <ActionTile icon={icon}>a</ActionTile>
      </>,
    );

    expect(html).toContain("gradient-accent-bar");
  });

  it("have no accessibility violations", async () => {
    const { container } = render(
      <section>
        <SectionHeader variant="icon" title="چرا دورلنسر؟" icon={icon} />
        <FeatureCard title="t" description="d" icon={icon} titleAs="h3" />
        <ActionTile icon={icon}>افزودن خدمت</ActionTile>
        <div className="relative">
          <GlowOrbs />
        </div>
      </section>,
    );

    await expectNoAxeViolations(container);
  });
});
