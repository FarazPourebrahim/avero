import type { ReactNode } from "react";

type SectionIntroProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  /** Content aligned to the end of the title row, e.g. a switch that controls the section. */
  aside?: ReactNode;
};

export function SectionIntro({ id, eyebrow, title, children, aside }: SectionIntroProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="text-fd-muted-foreground mb-4 flex items-center gap-3 font-mono text-xs tracking-wider uppercase">
          <span className="bg-secondary h-px w-6" aria-hidden />
          {eyebrow}
        </p>
        <h2
          id={id}
          className="text-fd-foreground text-3xl leading-tight font-extrabold tracking-tight sm:text-[2.6rem]"
        >
          {title}
        </h2>
        {children ? (
          <p className="text-fd-muted-foreground mt-5 text-base leading-8 sm:text-lg">{children}</p>
        ) : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}
