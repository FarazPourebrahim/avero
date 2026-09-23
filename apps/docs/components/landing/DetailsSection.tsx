import {
  AveroProvider,
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
  OtpInput,
  normalizeSearchText,
} from "@averoui/react";
import { tokens } from "@averoui/tokens";
import type { ReactNode } from "react";
import { SectionIntro } from "./SectionIntro";

const WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

// Built from code points: the Arabic and Persian letters are indistinguishable as literals.
const char = (...codePoints: number[]) => String.fromCharCode(...codePoints);

const SEARCH_PAIRS: ReadonlyArray<{ typed: string; note: string }> = [
  { typed: char(0x0643, 0x062a, 0x0627, 0x0628), note: "Arabic kaf U+0643" },
  { typed: char(0x0639, 0x0644, 0x064a), note: "Arabic yeh U+064A" },
  {
    typed: `${char(0x0645, 0x06cc, 0x200c, 0x062e, 0x0648, 0x0627, 0x0647, 0x0645)}`,
    note: "zero-width non-joiner",
  },
];

const SWATCHES = [
  { name: "primary", value: tokens.colorPrimary.value },
  { name: "primary-hover", value: tokens.colorPrimaryHover.value },
  { name: "secondary", value: tokens.colorSecondary.value },
  { name: "text-strong", value: tokens.colorTextStrong.value },
  { name: "surface-muted", value: tokens.colorSurfaceMuted.value },
  { name: "background", value: tokens.colorBackground.value },
] as const;

function Tile({
  title,
  children,
  specimen,
  className = "",
}: {
  title: string;
  children: ReactNode;
  specimen: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`border-fd-border bg-fd-card flex flex-col overflow-hidden rounded-3xl border ${className}`}
    >
      <div className="bg-background relative m-1.5 flex flex-1 items-center justify-center overflow-hidden rounded-[1.25rem] p-6 font-sans">
        {specimen}
      </div>
      <div className="px-6 pt-4 pb-6">
        <h3 className="text-fd-foreground text-base font-bold">{title}</h3>
        <p className="text-fd-muted-foreground mt-1.5 text-sm leading-6">{children}</p>
      </div>
    </article>
  );
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-gray-200 border-b-gray-300 bg-white px-2 font-sans text-sm font-semibold text-gray-700 shadow-[inset_0_-2px_0_var(--color-gray-200)]">
      {children}
    </kbd>
  );
}

export function DetailsSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6" aria-labelledby="details-title">
      <SectionIntro
        id="details-title"
        eyebrow="Persian-ready, not Persian-patched"
        title="The details that usually ship as bug reports."
      >
        Jalali calendars, Persian digits in form fields, two letters that look the same and aren’t.
        These are handled inside the components, so they never reach your issue tracker.
      </SectionIntro>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Tile
          className="md:col-span-2 lg:col-span-4"
          title="Set in Lahzeh, nine weights"
          specimen={
            <div dir="rtl" lang="fa" className="flex w-full flex-col gap-8 py-4">
              <p className="text-text-strong text-center text-5xl leading-tight font-black sm:text-6xl">
                یک رابط، دو جهت.
              </p>
              <ul className="grid grid-cols-9 gap-1 text-center" aria-label="Lahzeh weights">
                {WEIGHTS.map((weight) => (
                  <li key={weight} className="flex flex-col items-center gap-2">
                    <span
                      className="text-text-strong text-3xl sm:text-4xl"
                      style={{ fontWeight: weight }}
                    >
                      ش
                    </span>
                    <span className="font-mono text-[10px] text-gray-400" dir="ltr">
                      {weight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          }
        >
          A commercial Persian typeface, licensed for redistribution and bundled in{" "}
          <code>@averoui/font</code>. Latin text and digits fall through to your own fallback stack.
        </Tile>

        <Tile
          className="lg:col-span-2"
          title="Digits typed any way"
          specimen={
            <AveroProvider locale="fa-IR">
              <div dir="rtl" lang="fa">
                <Field>
                  <FieldLabel>کد تأیید</FieldLabel>
                  <FieldControl>
                    <OtpInput length={4} />
                  </FieldControl>
                  <FieldDescription>۱۲۳۴ یا 1234 — هر دو پذیرفته می‌شوند.</FieldDescription>
                </Field>
              </div>
            </AveroProvider>
          }
        >
          Persian, Arabic and Latin digits all land as the same value. Try it — the boxes stay left
          to right, the way codes are read, even on a right-to-left page.
        </Tile>

        <Tile
          className="lg:col-span-2"
          title={`Search that knows ${char(0x0643)} from ${char(0x06a9)}`}
          specimen={
            <ul className="flex w-full flex-col gap-2">
              {SEARCH_PAIRS.map(({ typed, note }) => (
                <li
                  key={note}
                  className="flex items-center justify-between gap-3 rounded-xl bg-white px-3.5 py-2.5 shadow-xs"
                >
                  <span className="flex min-w-0 flex-col">
                    <span className="text-text-strong text-lg font-bold" dir="rtl" lang="fa">
                      {typed}
                    </span>
                    <span className="truncate font-mono text-[10px] text-gray-500">{note}</span>
                  </span>
                  <span className="text-gray-400" aria-hidden>
                    →
                  </span>
                  <span className="text-primary text-lg font-bold" dir="rtl" lang="fa">
                    {normalizeSearchText(typed)}
                  </span>
                </li>
              ))}
            </ul>
          }
        >
          Arabic letters, joiners and diacritics fold away before matching, so <code>Combobox</code>{" "}
          and <code>TagInput</code> find what people meant to type.
        </Tile>

        <Tile
          className="lg:col-span-2"
          title="Accessible in both directions"
          specimen={
            <div className="flex flex-col items-center gap-5">
              <p className="flex items-baseline gap-2">
                <span className="text-text-strong text-6xl font-black">0</span>
                <span className="text-sm font-semibold text-gray-600">axe violations</span>
              </p>
              <div className="flex items-center gap-1.5" aria-hidden>
                <Kbd>Tab</Kbd>
                <Kbd>←</Kbd>
                <Kbd>→</Kbd>
                <Kbd>Home</Kbd>
                <Kbd>Esc</Kbd>
              </div>
            </div>
          }
        >
          Radix handles focus and ARIA, and arrow keys follow the reading direction. CI runs axe
          over every story in RTL and LTR; colour contrast is tracked in a published report.
        </Tile>

        <Tile
          className="lg:col-span-2"
          title="A theme is a block of variables"
          specimen={
            <div className="flex w-full flex-col gap-4">
              <ul className="grid grid-cols-6 gap-1.5">
                {SWATCHES.map((swatch) => (
                  <li key={swatch.name} className="flex flex-col gap-1.5">
                    <span
                      className="aspect-square w-full rounded-lg border border-black/5"
                      style={{ backgroundColor: swatch.value }}
                      title={`--color-${swatch.name}`}
                    />
                  </li>
                ))}
              </ul>
              <pre className="overflow-x-auto rounded-xl bg-slate-900 px-4 py-3 font-mono text-xs leading-6 text-slate-300">
                <span className="text-sky-300">@theme</span> {"{"}
                {"\n"}
                {"  "}
                <span className="text-slate-400">--color-primary</span>: {tokens.colorPrimary.value}
                ;{"\n"}
                {"  "}
                <span className="text-slate-400">--color-secondary</span>:{" "}
                {tokens.colorSecondary.value};{"\n"}
                {"}"}
              </pre>
            </div>
          }
        >
          Colours, radii, shadows and motion come from <code>@averoui/tokens</code>. Rebranding is
          an override, not a fork.
        </Tile>
      </div>
    </section>
  );
}
