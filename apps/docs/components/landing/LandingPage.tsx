import { DirectionSwitch } from "@/components/DirectionSwitch";
import { gitConfig } from "@/lib/shared";
import { ClosingSection } from "./ClosingSection";
import { ComponentGallery } from "./ComponentGallery";
import { DetailsSection } from "./DetailsSection";
import { GetStartedSection } from "./GetStartedSection";
import { HeroShowcase } from "./HeroShowcase";
import { MirrorSection } from "./MirrorSection";
import { SectionIntro } from "./SectionIntro";
import "./landing.css";

const FACTS = [
  { value: "70+", label: "components, from buttons to date pickers" },
  { value: "25", label: "page blocks you can drop in or copy" },
  { value: "fa · en", label: "dictionaries for every built-in string" },
  { value: "0", label: "date libraries — calendars come from Intl" },
] as const;

const FOOTER_LINKS = [
  { label: "Documentation", href: "/docs" },
  { label: "Components", href: "/docs/components/button" },
  { label: "Blocks", href: "/docs/blocks/gallery" },
  { label: "Changelog", href: "/docs/getting-started/changelog" },
  { label: "GitHub", href: `https://github.com/${gitConfig.user}/${gitConfig.repo}` },
  { label: "npm", href: "https://www.npmjs.com/package/@averoui/react" },
] as const;

export function LandingPage() {
  return (
    <main className="landing relative flex flex-1 flex-col overflow-x-clip">
      <div
        className="landing-grid pointer-events-none absolute inset-x-0 top-0 h-[44rem]"
        aria-hidden
      />

      <section className="relative mx-auto w-full max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 lg:pb-28">
        <HeroShowcase />
      </section>

      <section aria-label="Avero in numbers" className="border-fd-border relative border-y">
        <dl className="mx-auto grid w-full max-w-6xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4">
          {FACTS.map((fact, index) => (
            <div
              key={fact.label}
              className={`border-fd-border flex flex-col-reverse gap-1.5 py-7 ${
                index % 2 === 1 ? "border-s ps-5 sm:ps-8" : "pe-5 sm:pe-8"
              } ${index >= 2 ? "border-t lg:border-t-0" : ""} ${index === 2 ? "lg:border-s lg:ps-8" : ""}`}
            >
              <dt className="text-fd-muted-foreground text-sm leading-6">{fact.label}</dt>
              <dd className="text-fd-foreground text-3xl font-extrabold tracking-tight">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="flex flex-col gap-28 py-28 sm:gap-36 sm:py-36">
        <MirrorSection />

        <DetailsSection />

        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6" aria-labelledby="gallery-title">
          <SectionIntro
            id="gallery-title"
            eyebrow="The library"
            title="Everything here is live."
            aside={<DirectionSwitch />}
          >
            Not screenshots. Click, type and tab through them — then flip the language and do it
            again. The switch carries over to every example in the docs.
          </SectionIntro>
          <div className="mt-12">
            <ComponentGallery />
          </div>
        </section>

        <GetStartedSection />

        <ClosingSection />
      </div>

      <footer className="border-fd-border border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-fd-foreground text-lg font-extrabold tracking-tight">Avero</p>
            <p className="text-fd-muted-foreground max-w-sm text-sm leading-6">
              A bidirectional React component library. MIT licensed; the Lahzeh typeface keeps its
              own licence.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </main>
  );
}
