import {
  AveroProvider,
  BackLink,
  Pagination,
  PriceTag,
  Progress,
  formatDate,
} from "@averoui/react";
import type { ReactNode } from "react";
import { SectionIntro } from "./SectionIntro";

type Side = { dir: "ltr" | "rtl"; locale: string; lang: string };

const SIDES: Record<"en" | "fa", Side> = {
  en: { dir: "ltr", locale: "en-US", lang: "en" },
  fa: { dir: "rtl", locale: "fa-IR", lang: "fa" },
};

// Nowruz 1405: the first day of the Solar Hijri year, and a date where the two calendars visibly part.
const NOWRUZ = "2026-03-21";

type Row = {
  caption: string;
  code: string;
  render: (side: Side) => ReactNode;
};

const ROWS: readonly Row[] = [
  {
    caption: "Arrows point back the way you read",
    code: `<BackLink />`,
    render: () => <BackLink />,
  },
  {
    caption: "Digits, grouping and currency follow the locale",
    code: `<PriceTag amount={4_500_000} />`,
    render: () => <PriceTag amount={4_500_000} amountClassName="text-xl sm:text-2xl" />,
  },
  {
    caption: "Dates follow the calendar — Intl only, no date library",
    code: `format.date("${NOWRUZ}")`,
    render: (side) => (
      <span className="text-text-strong text-lg font-bold">
        {formatDate(NOWRUZ, { locale: side.locale })}
      </span>
    ),
  },
  {
    caption: "Progress fills from the inline start",
    code: `<Progress value={62} />`,
    render: (side) => (
      <Progress
        value={62}
        className="w-full max-w-40"
        aria-label={side.lang === "fa" ? "پیشرفت دوره" : "Course progress"}
      />
    ),
  },
  {
    caption: "Arrow keys move the way the page reads",
    code: `<Pagination pageCount={5} />`,
    render: () => <Pagination pageCount={5} defaultPage={3} />,
  },
];

function Cell({ side, children }: { side: Side; children: ReactNode }) {
  return (
    <AveroProvider dir={side.dir} locale={side.locale}>
      <div
        dir={side.dir}
        lang={side.lang}
        className="relative flex min-h-20 items-center justify-center px-4 py-6 font-sans"
      >
        {/* Below md the two cells stack, so each names its own side. */}
        <span
          className="absolute start-3 top-2 font-mono text-[10px] text-gray-400 md:hidden"
          dir="ltr"
        >
          {side.dir}
        </span>
        {children}
      </div>
    </AveroProvider>
  );
}

export function MirrorSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6" aria-labelledby="mirror-title">
      <SectionIntro
        id="mirror-title"
        eyebrow="Same code, both directions"
        title="Written once. Read either way."
      >
        Most libraries are translated after the fact, and the right-to-left build is where the bugs
        live. Avero uses logical properties and direction-aware behaviour throughout, so each row
        below is one line of JSX rendered twice, with nothing but the provider changed.
      </SectionIntro>

      <div className="border-fd-border bg-fd-card mt-12 overflow-hidden rounded-3xl border">
        <div className="border-fd-border text-fd-muted-foreground hidden border-b font-mono text-xs md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)]">
          <p className="px-5 py-3">en-US · ltr</p>
          <p className="border-fd-border border-x px-5 py-3 text-center">the JSX</p>
          <p className="px-5 py-3 text-end">fa-IR · rtl</p>
        </div>

        <ul>
          {ROWS.map((row) => (
            <li
              key={row.caption}
              className="border-fd-border grid grid-cols-1 border-b last:border-b-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)]"
            >
              <div className="border-fd-border flex flex-col justify-center gap-1.5 border-b px-5 py-4 md:order-2 md:border-x md:border-b-0 md:text-center">
                <p className="text-fd-foreground text-sm font-semibold">{row.caption}</p>
                <code className="text-fd-muted-foreground truncate text-xs">{row.code}</code>
              </div>
              <div className="bg-background md:order-1">
                <Cell side={SIDES.en}>{row.render(SIDES.en)}</Cell>
              </div>
              <div className="bg-background border-fd-border border-t md:order-3 md:border-t-0">
                <Cell side={SIDES.fa}>{row.render(SIDES.fa)}</Cell>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
