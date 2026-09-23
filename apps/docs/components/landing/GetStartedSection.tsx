import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { SectionIntro } from "./SectionIntro";

const STEPS = [
  {
    title: "Install the packages",
    body: "React and Tailwind CSS v4 are the only requirements. Charts and the rich-text editor are separate, optional packages.",
    lang: "bash",
    code: "pnpm add @averoui/react @averoui/tokens @averoui/font lucide-react",
  },
  {
    title: "Import the tokens",
    body: "The tokens are a Tailwind @theme block, so every Avero colour, shadow and radius also becomes a utility class in your own code.",
    lang: "css",
    code: `@import "tailwindcss";
@import "@averoui/tokens/theme.css";
@import "@averoui/font/lahzeh.css";

@source "../node_modules/@averoui/react/dist";`,
  },
  {
    title: "Pick a locale",
    body: "The locale decides direction, digits and calendar. Persian is the default; English is one prop away.",
    lang: "tsx",
    code: `import { AveroProvider, Button } from "@averoui/react";

export function App() {
  return (
    <AveroProvider locale="fa-IR">
      <Button>ثبت‌نام</Button>
    </AveroProvider>
  );
}`,
  },
] as const;

export function GetStartedSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6" aria-labelledby="start-title">
      <SectionIntro
        id="start-title"
        eyebrow="Getting started"
        title="Three steps, then it’s yours."
      >
        No generator, no copy-paste registry to keep in sync. Avero is published to npm with
        provenance, under the MIT licence.
      </SectionIntro>

      <ol className="mt-12 flex flex-col">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="border-fd-border grid gap-6 border-t py-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12"
          >
            <div className="flex gap-5">
              <span
                className="text-fd-muted-foreground font-mono text-sm leading-7 tabular-nums"
                aria-hidden
              >
                0{index + 1}
              </span>
              <div>
                <h3 className="text-fd-foreground text-lg font-bold">{step.title}</h3>
                <p className="text-fd-muted-foreground mt-2 text-sm leading-7">{step.body}</p>
              </div>
            </div>
            <div className="min-w-0 [&_figure]:my-0">
              <DynamicCodeBlock lang={step.lang} code={step.code} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
