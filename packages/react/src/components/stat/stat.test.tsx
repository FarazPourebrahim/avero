import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { HighlightPanel, InfoRow, MiniStat, StatCard, StatStrip, StatTile } from "./Stat.js";

const icon = <svg data-testid="icon" aria-hidden="true" />;

describe("StatCard", () => {
  it("renders the label, value and a tinted icon tile", () => {
    const { container } = render(<StatCard label="خدمات" value="0" icon={icon} tone="purple" />);

    expect(screen.getByText("خدمات")).toHaveClass("text-gray-500");
    expect(screen.getByText("0")).toHaveClass("text-xl", "sm:text-2xl", "font-bold");
    expect(container.querySelector('[data-slot="icon-tile"]')).toHaveClass("bg-purple-50");
    expect(container.firstElementChild).toHaveClass("hover:shadow-md", "rounded-2xl");
  });

  it("omits the icon tile without an icon", () => {
    const { container } = render(<StatCard label="نشان‌ها" value="0" />);

    expect(container.querySelector('[data-slot="icon-tile"]')).not.toBeInTheDocument();
  });
});

describe("StatTile and StatStrip", () => {
  it("renders a translucent icon tile with a large value and small label", () => {
    const { container } = render(
      <StatTile label="مدت تجربه کاری" value="3 سال" icon={icon} tone="amber" />,
    );

    expect(container.querySelector('[data-slot="icon-tile"]')).toHaveClass(
      "bg-amber-500/10",
      "size-10",
    );
    expect(screen.getByText("3 سال")).toHaveClass("truncate", "sm:text-2xl");
    expect(screen.getByText("مدت تجربه کاری")).toHaveClass("text-slate-500");
  });

  it("lays tiles out in a strip with decorative accent bars on both edges", () => {
    const { container } = render(
      <StatStrip>
        <StatTile label="تعداد نمونه‌کار" value="4" />
        <StatTile label="تعداد خدمات" value="1" />
      </StatStrip>,
    );
    const bars = container.querySelectorAll('[aria-hidden="true"]');

    expect(bars).toHaveLength(2);
    expect(bars[0]).toHaveClass("start-0", "rounded-e-full");
    expect(bars[1]).toHaveClass("end-0", "rounded-s-full");
    expect(screen.getByText("4").closest(".grid")).toHaveClass("grid-cols-2", "lg:grid-cols-4");
  });
});

describe("MiniStat", () => {
  it("centers a small label over a bold value with an optional icon", () => {
    render(<MiniStat label="امتیاز رضایت" value="0.00" icon={icon} />);

    expect(screen.getByText("امتیاز رضایت")).toHaveClass("text-3xs", "text-slate-400");
    expect(screen.getByText("0.00")).toHaveClass("font-black", "justify-center");
    expect(screen.getByText("0.00")).toContainElement(screen.getByTestId("icon"));
  });
});

describe("InfoRow", () => {
  it.each([
    ["emerald", "bg-emerald-50/50", "bg-emerald-100"],
    ["purple", "bg-purple-50/50", "bg-purple-100"],
    ["blue", "bg-blue-50/50", "bg-blue-100"],
  ] as const)("renders the %s tone", (tone, row, tile) => {
    const { container } = render(
      <InfoRow label="گواهینامه‌ها" value="0 عدد" icon={icon} tone={tone} />,
    );

    expect(container.firstElementChild).toHaveClass(row);
    expect(container.querySelector('[data-slot="icon-tile"]')).toHaveClass(tile);
  });

  it("renders without an icon", () => {
    render(<InfoRow label="label" value="value" />);

    expect(screen.getByText("value")).toHaveClass("font-bold");
  });
});

describe("HighlightPanel", () => {
  it("renders the amber gradient panel, mirrored per direction", () => {
    const { container } = render(
      <HighlightPanel label="رتبه در دورلنسر" value="-" aside={<span>aside</span>} />,
    );

    expect(container.firstElementChild).toHaveClass(
      "rtl:bg-gradient-to-l",
      "ltr:bg-gradient-to-r",
      "from-amber-50",
      "to-orange-50",
    );
    expect(screen.getByText("-")).toHaveClass("text-amber-700");
    expect(screen.getByText("aside")).toBeInTheDocument();
  });
});

describe("stat family", () => {
  it("forwards refs", () => {
    const refs = Array.from({ length: 6 }, () => createRef<HTMLDivElement>());
    render(
      <>
        <StatCard ref={refs[0]} label="a" value="1" />
        <StatTile ref={refs[1]} label="b" value="2" />
        <StatStrip ref={refs[2]} />
        <MiniStat ref={refs[3]} label="c" value="3" />
        <InfoRow ref={refs[4]} label="d" value="4" />
        <HighlightPanel ref={refs[5]} label="e" value="5" />
      </>,
    );

    expect(refs.map((ref) => ref.current?.getAttribute("data-slot"))).toEqual([
      "stat-card",
      "stat-tile",
      "stat-strip",
      "mini-stat",
      "info-row",
      "highlight-panel",
    ]);
  });

  it("renders on the server", () => {
    const html = renderToString(
      <StatStrip>
        <StatTile label="تعداد خدمات" value="1" icon={icon} />
      </StatStrip>,
    );

    expect(html).toContain('data-slot="stat-tile"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <StatCard label="خدمات" value="0" icon={icon} />
        <StatStrip>
          <StatTile label="تعداد خدمات" value="1" icon={icon} />
        </StatStrip>
        <MiniStat label="تعداد خدمات" value="1" />
        <InfoRow label="نشان‌ها" value="0 عدد" icon={icon} />
        <HighlightPanel label="رتبه" value="-" />
      </div>,
    );

    await expectNoAxeViolations(container);
  });
});
