import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { ActionTile } from "../components/action-tile/ActionTile.js";
import { CapacityMeter } from "../components/capacity-meter/CapacityMeter.js";
import { Card, CardHeader, CardTitle } from "../components/card/Card.js";
import { CoverHeader } from "../components/cover-header/CoverHeader.js";
import { FeatureCard } from "../components/feature-card/FeatureCard.js";
import { Blockquote, List } from "../components/list/List.js";
import { MatchScore } from "../components/match-score/MatchScore.js";
import { ContactMethod, KeyValueRow, MetaBar, MetaItem } from "../components/meta/Meta.js";
import { SectionHeader } from "../components/section-header/SectionHeader.js";
import { HighlightPanel, InfoRow, MiniStat, StatCard, StatTile } from "../components/stat/Stat.js";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../components/table/Table.js";

// Phase 7 DoD: every data component renders sensibly with empty, null/undefined and overflowing
// content. jsdom can't measure layout, so overflow is checked through the classes that let long,
// unbroken text wrap (`wrap-anywhere`) or truncate inside a shrinkable (`min-w-0`) box.

const LONG = "ب".repeat(240);
const icon = <svg data-testid="icon" aria-hidden="true" />;

function wrapsOrTruncates(element: HTMLElement) {
  return element.closest(".wrap-anywhere, .truncate") !== null;
}

describe("data display with overflowing content", () => {
  it.each<[string, ReactElement]>([
    ["StatCard label", <StatCard key="a" label={LONG} value="۱۲" icon={icon} />],
    ["StatCard value", <StatCard key="a" label="دوره‌ها" value={LONG} />],
    ["StatTile value", <StatTile key="a" label="امتیاز" value={LONG} />],
    ["StatTile label", <StatTile key="a" label={LONG} value="۴٫۸" />],
    ["MiniStat label", <MiniStat key="a" label={LONG} value="۱۲" />],
    ["MiniStat value", <MiniStat key="a" label="دانشجو" value={LONG} />],
    ["InfoRow label", <InfoRow key="a" label={LONG} value="۱۲" icon={icon} />],
    ["InfoRow value", <InfoRow key="a" label="رتبه" value={LONG} />],
    ["HighlightPanel value", <HighlightPanel key="a" label="رتبه" value={LONG} aside={icon} />],
    [
      "MetaItem",
      <MetaItem key="a" icon={icon} label="انتشار:">
        {LONG}
      </MetaItem>,
    ],
    [
      "MetaItem chip",
      <MetaItem key="a" variant="chip">
        {LONG}
      </MetaItem>,
    ],
    ["KeyValueRow value", <KeyValueRow key="a" label="ایمیل:" value={LONG} />],
    ["KeyValueRow link", <KeyValueRow key="a" label="ایمیل:" value={LONG} href="mailto:a@b.c" />],
    [
      "ContactMethod value",
      <ContactMethod key="a" href="mailto:a@b.c" label="email:" value={LONG} />,
    ],
    [
      "CardTitle",
      <Card key="a">
        <CardHeader>
          <CardTitle>{LONG}</CardTitle>
        </CardHeader>
      </Card>,
    ],
    ["FeatureCard title", <FeatureCard key="a" title={LONG} description="توضیح" />],
    ["FeatureCard description", <FeatureCard key="a" title="عنوان" description={LONG} />],
    [
      "ActionTile label",
      <ActionTile key="a" icon={icon}>
        {LONG}
      </ActionTile>,
    ],
    [
      "SectionHeader plain",
      <SectionHeader key="a" title={LONG} actions={<button type="button">همه</button>} />,
    ],
    ["SectionHeader accentBar", <SectionHeader key="a" variant="accentBar" title={LONG} />],
    ["SectionHeader dot", <SectionHeader key="a" variant="dot" title={LONG} />],
    ["SectionHeader icon", <SectionHeader key="a" variant="icon" icon={icon} title={LONG} />],
    ["CoverHeader content", <CoverHeader key="a">{LONG}</CoverHeader>],
    ["CapacityMeter label", <CapacityMeter key="a" label={LONG} value={3} max={10} />],
    [
      "CapacityMeter card label",
      <CapacityMeter key="a" variant="card" label={LONG} value={3} max={10} />,
    ],
    ["Blockquote", <Blockquote key="a">{LONG}</Blockquote>],
  ])("lets a long unbroken %s wrap inside its box", (_name, element) => {
    render(element);

    expect(wrapsOrTruncates(screen.getByText(LONG))).toBe(true);
  });

  it("scrolls a table sideways instead of widening the page", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{LONG}</TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );

    expect(screen.getByText(LONG).closest('[data-slot="table-container"]')).toHaveClass(
      "overflow-x-auto",
    );
  });
});

describe("data display with empty, null and undefined content", () => {
  it("renders stats with null values and no icon", () => {
    const { container } = render(
      <div>
        <StatCard label={null} value={null} icon={undefined} />
        <StatTile label={undefined} value={null} />
        <MiniStat label={null} value={undefined} />
        <InfoRow label={null} value={null} />
        <HighlightPanel label={null} value={null} aside={undefined} />
      </div>,
    );

    expect(container.querySelectorAll("[data-slot]").length).toBeGreaterThanOrEqual(5);
    expect(container.querySelector('[data-slot="icon-tile"]')).toBeNull();
    expect(container.textContent).toBe("");
  });

  it("omits the label and icon of an empty MetaItem and renders an empty MetaBar", () => {
    const { container } = render(
      <MetaBar>
        <MetaItem label={null} icon={undefined} />
      </MetaBar>,
    );

    const item = container.querySelector('[data-slot="meta-item"]');
    expect(item?.children).toHaveLength(1);
    expect(item?.firstElementChild).toBeEmptyDOMElement();
  });

  it("renders rows with empty values", () => {
    const { container } = render(
      <div>
        <KeyValueRow label="تلفن:" value={null} />
        <ContactMethod href="tel:" label="tel:" value={undefined} />
      </div>,
    );

    expect(container.querySelector('[data-slot="key-value-row"]')).toHaveTextContent("تلفن:");
    expect(container.querySelector('[data-slot="contact-method"]')).toHaveTextContent("tel:");
  });

  it("renders a SectionHeader without subtitle, icon or actions", () => {
    const { container } = render(
      <div>
        <SectionHeader variant="accentBar" title="عنوان" subtitle={null} />
        <SectionHeader variant="icon" title="عنوان" icon={undefined} actions={null} />
        <SectionHeader variant="dot" title="" />
      </div>,
    );

    expect(container.querySelectorAll("p")).toHaveLength(0);
    expect(container.querySelectorAll(".ms-auto")).toHaveLength(0);
    expect(container.querySelectorAll("h2")).toHaveLength(3);
  });

  it("renders a CoverHeader with only its gradient cover", () => {
    const { container } = render(<CoverHeader />);

    expect(container.querySelector('[data-slot="cover-header-cover"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="cover-header-avatar"]')).toBeNull();
    expect(container.querySelector('[data-slot="cover-header-footer"]')).toBeNull();
    expect(container.querySelector('[data-slot="cover-header-content"]')).toBeEmptyDOMElement();
  });

  it("renders a FeatureCard without an icon and with an empty description", () => {
    const { container } = render(<FeatureCard title="عنوان" description={null} />);

    expect(container.querySelector('[data-slot="icon-tile"]')).toBeNull();
    expect(container.querySelector("p")).toBeEmptyDOMElement();
  });

  it("keeps CapacityMeter sensible with no capacity or more bookings than places", () => {
    const { container, rerender } = render(<CapacityMeter label="ظرفیت" value={0} max={0} />);

    expect(container.firstElementChild).toHaveAttribute("data-state", "available");
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    rerender(<CapacityMeter variant="card" label="ظرفیت" value={14} max={10} status={null} />);

    expect(container.firstElementChild).toHaveAttribute("data-state", "full");
    expect(container.querySelector('[data-slot="capacity-meter-status"]')).toBeNull();
  });

  it("shows a MatchScore that isn't a finite number as zero", () => {
    const { container: zero } = render(<MatchScore value={0} />);
    const expected = zero.textContent;

    const { container } = render(
      <div>
        <MatchScore value={Number.NaN} />
        <MatchScore value={Number.POSITIVE_INFINITY} />
      </div>,
    );

    for (const score of container.querySelectorAll('[data-slot="match-score"]')) {
      expect(score.textContent).toBe(expected);
    }
  });

  it("renders empty lists, blockquotes and tables without placeholder rows", () => {
    const { container } = render(
      <div>
        <List />
        <List ordered />
        <Blockquote />
        <Table>
          <TableBody />
        </Table>
      </div>,
    );

    expect(container.querySelector("ul")).toBeEmptyDOMElement();
    expect(container.querySelector("ol")).toBeEmptyDOMElement();
    expect(container.querySelector('[data-slot="blockquote"]')).toBeInTheDocument();
    expect(container.querySelectorAll("tr")).toHaveLength(0);
  });
});
