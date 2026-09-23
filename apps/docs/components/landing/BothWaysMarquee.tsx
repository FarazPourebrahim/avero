import { fa, type AveroDictionary } from "@averoui/react";

const COMPONENTS = [
  "Button",
  "DatePicker",
  "Combobox",
  "Dialog",
  "Drawer",
  "Carousel",
  "OtpInput",
  "PriceInput",
  "TagInput",
  "Toast",
  "Tooltip",
  "Pagination",
  "TableOfContents",
  "ActivityHeatmap",
  "Lightbox",
  "SegmentedControl",
  "FileInput",
  "AvatarGroup",
  "RichContent",
  "DashboardShell",
] as const;

const DICTIONARY_KEYS: ReadonlyArray<keyof AveroDictionary> = [
  "back",
  "next",
  "previous",
  "save",
  "share",
  "loadMore",
  "confirm",
  "cancel",
  "viewDetails",
  "viewProfile",
  "filters",
  "comments",
  "submitComment",
  "currencyToman",
  "capacityFull",
  "skipToContent",
  "datePickerOpen",
  "close",
  "editorBold",
  "loading",
];

// Real strings from the Persian dictionary, read at build time. Templated entries ("{count}") are
// left out because they only make sense once a component fills them in.
const STRINGS = DICTIONARY_KEYS.map((key) => ({ key, text: fa[key] })).filter(
  (entry): entry is { key: keyof AveroDictionary; text: string } =>
    typeof entry.text === "string" && !entry.text.includes("{"),
);

/**
 * Two rows moving in opposite directions: the components on top, the Persian strings they ship
 * with underneath. Each row's content is rendered twice so the loop is seamless at -50%.
 */
export function BothWaysMarquee() {
  return (
    <section aria-labelledby="marquee-title" className="border-fd-border relative border-y py-10">
      <h2
        id="marquee-title"
        className="text-fd-muted-foreground mx-auto mb-8 w-full max-w-6xl px-4 font-mono text-xs sm:px-6"
      >
        <span className="text-fd-foreground">Every component</span> and{" "}
        <span className="text-fd-foreground">every built-in string</span>, in both directions.
      </h2>

      <div className="landing-marquee flex flex-col gap-3" aria-hidden>
        <div className="landing-marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 gap-3 pe-3">
              {COMPONENTS.map((name) => (
                <li
                  key={name}
                  className="border-fd-border bg-fd-card text-fd-foreground rounded-full border px-4 py-2 font-mono text-sm whitespace-nowrap"
                >
                  <span className="text-fd-muted-foreground">&lt;</span>
                  {name}
                  <span className="text-fd-muted-foreground"> /&gt;</span>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="landing-marquee-track" data-reverse>
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 gap-3 pe-3">
              {STRINGS.map(({ key, text }) => (
                <li
                  key={key}
                  className="border-fd-border bg-fd-card flex items-center gap-2.5 rounded-full border py-2 ps-4 pe-2 whitespace-nowrap"
                >
                  <span dir="rtl" lang="fa" className="text-fd-foreground text-base font-semibold">
                    {text}
                  </span>
                  <span className="bg-fd-muted text-fd-muted-foreground rounded-full px-2 py-0.5 font-mono text-[11px]">
                    {key}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
