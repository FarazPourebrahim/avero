import { AveroProvider, Button, CtaBanner } from "@averoui/react";

export function ClosingSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6" aria-label="Start building">
      <AveroProvider locale="en-US">
        <div dir="ltr" lang="en" className="font-sans">
          <CtaBanner
            titleAs="h2"
            eyebrow="Ready when you are"
            title={
              <span className="block max-w-2xl text-3xl leading-tight tracking-tight md:text-5xl">
                Ship the Persian version on day one.
              </span>
            }
            actions={
              <>
                <Button asChild size="lg" elevated>
                  <a href="/docs">Read the documentation</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:border-white/60 hover:text-white"
                >
                  <a href="/docs/blocks/gallery">See all 25 blocks</a>
                </Button>
              </>
            }
          >
            More than seventy components, twenty-five page blocks and nine layout shells, all built
            from the same tokens and tested in both directions.
          </CtaBanner>
        </div>
      </AveroProvider>
      <p className="text-fd-muted-foreground mt-3 text-center font-mono text-xs">
        ↑ This banner is Avero’s own <code className="text-fd-foreground">CtaBanner</code> block.
      </p>
    </section>
  );
}
