"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { HeroStage, type StageDirection } from "./HeroStage";

type Motion = "rise" | "leftward" | "rightward";

type Phrase = {
  text: string;
  lang: "fa" | "en";
  /** How the glyphs arrive. The two direction phrases travel the way they read. */
  motion: Motion;
  /** The direction the stage beside the headline shows while this phrase is up. */
  stage: StageDirection;
};

const PHRASES: readonly Phrase[] = [
  { text: "فارسی", lang: "fa", motion: "rise", stage: "rtl" },
  { text: "right-to-left", lang: "en", motion: "leftward", stage: "rtl" },
  { text: "Jalali dates", lang: "en", motion: "rise", stage: "rtl" },
  { text: "English", lang: "en", motion: "rise", stage: "ltr" },
  { text: "left-to-right", lang: "en", motion: "rightward", stage: "ltr" },
];

const HOLD_MS = 2600;

/**
 * Persian is cursive: splitting a word into per-letter spans breaks the joins between letters, so a
 * Persian phrase animates as one unit. Latin phrases animate letter by letter, and a phrase that
 * moves leftward staggers from its last letter so the wave travels the same way the letters do.
 */
function glyphsOf(phrase: Phrase): Array<{ glyph: string; order: number }> {
  if (phrase.lang === "fa") return [{ glyph: phrase.text, order: 0 }];
  const letters = [...phrase.text];
  return letters.map((letter, index) => ({
    // A plain space collapses inside an inline-block, so word gaps use a no-break space.
    glyph: letter === " " ? " " : letter,
    order: phrase.motion === "leftward" ? letters.length - 1 - index : index,
  }));
}

export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  // Once someone uses the stage it stops following the headline, so it never flips mid-interaction.
  const [pinnedDir, setPinnedDir] = useState<StageDirection | null>(null);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => {
      setLeaving(index);
      setIndex((index + 1) % PHRASES.length);
    }, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused]);

  const current = PHRASES[index]!;
  const stageDir = pinnedDir ?? current.stage;
  const rendered = leaving === null ? [index] : [leaving, index];

  return (
    <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10">
      <div className="flex flex-col items-start">
        <p className="text-fd-muted-foreground border-fd-border bg-fd-card mb-7 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs">
          <span className="bg-secondary size-1.5 rounded-full" aria-hidden />
          React · Radix UI · Tailwind CSS v4
        </p>

        <h1 className="text-fd-foreground text-[2.6rem] leading-[1.08] font-extrabold tracking-tight sm:text-6xl lg:text-[4.1rem]">
          React components,
          <br />
          fluent in
          <br />
          <span className="landing-rotator text-primary dark:text-sky-400" aria-hidden>
            {rendered.map((phraseIndex) => {
              const phrase = PHRASES[phraseIndex]!;
              const isLeaving = phraseIndex !== index;
              return (
                <span
                  key={phraseIndex}
                  className="landing-phrase"
                  data-motion={phrase.motion}
                  data-leaving={isLeaving ? current.motion : undefined}
                  lang={phrase.lang}
                  dir={phrase.lang === "fa" ? "rtl" : "ltr"}
                  onAnimationEnd={(event) => {
                    if (isLeaving && event.target === event.currentTarget) setLeaving(null);
                  }}
                >
                  {glyphsOf(phrase).map(({ glyph, order }, glyphIndex) => (
                    <span
                      key={glyphIndex}
                      className="landing-glyph"
                      style={{ "--i": order } as CSSProperties}
                    >
                      {glyph}
                    </span>
                  ))}
                </span>
              );
            })}
          </span>
          <span className="sr-only">Persian and English, right-to-left and left-to-right.</span>
        </h1>

        <p className="text-fd-muted-foreground mt-7 max-w-xl text-lg leading-8">
          Avero is a component library for products that ship in Persian and English. Behaviour
          comes from Radix, styling from Tailwind tokens, and every layout mirrors itself — so the
          right-to-left version is never the one you fix last.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="/docs/getting-started/installation"
            className="bg-fd-primary text-fd-primary-foreground focus-visible:ring-primary/40 inline-flex h-11 items-center rounded-xl px-5 text-sm font-semibold transition-opacity hover:opacity-85 focus-visible:ring-4 focus-visible:outline-none"
          >
            Get started
          </a>
          <a
            href="/docs/components/button"
            className="border-fd-border text-fd-foreground hover:bg-fd-accent focus-visible:ring-primary/40 inline-flex h-11 items-center rounded-xl border px-5 text-sm font-semibold transition-colors focus-visible:ring-4 focus-visible:outline-none"
          >
            Browse components
          </a>
        </div>
      </div>

      <div className="relative">
        <HeroStage
          dir={stageDir}
          onDirChange={setPinnedDir}
          onInteract={() => setPinnedDir((pinned) => pinned ?? stageDir)}
          toolbarEnd={
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-pressed={paused}
              aria-label={paused ? "Resume the headline animation" : "Pause the headline animation"}
              className="text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground focus-visible:ring-primary/40 inline-flex size-8 items-center justify-center rounded-lg transition-colors focus-visible:ring-4 focus-visible:outline-none"
            >
              {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            </button>
          }
        />
      </div>
    </div>
  );
}
