import { colorGroups } from "@/lib/foundations";

const AA_NORMAL = 4.5;
const AA_LARGE = 3;

function Ratio({ label, ratio }: { label: string; ratio: number | null }) {
  if (ratio === null) {
    return (
      <div className="flex justify-between gap-2">
        <dt>{label}</dt>
        <dd>translucent</dd>
      </div>
    );
  }

  const grade = ratio >= AA_NORMAL ? "AA" : ratio >= AA_LARGE ? "AA large" : "below AA";
  return (
    <div className="flex justify-between gap-2">
      <dt>{label}</dt>
      <dd>
        <span className="text-fd-foreground font-medium">{ratio.toFixed(2)}:1</span> · {grade}
      </dd>
    </div>
  );
}

/** Every Avero colour token, grouped by role, with its hex value and contrast on both grounds. */
export function ColorTokens() {
  return (
    <div className="not-prose flex flex-col gap-8">
      {colorGroups().map((group) => (
        <section key={group.title} className="flex flex-col gap-3">
          <h2 className="text-fd-foreground text-lg font-semibold">{group.title}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.colors.map((color) => (
              <div
                key={color.cssVar}
                className="border-fd-border overflow-hidden rounded-xl border"
                dir="ltr"
              >
                <div className="bg-background h-14">
                  <div className="h-full" style={{ background: `var(${color.cssVar})` }} />
                </div>
                <div className="flex flex-col gap-1 p-3 text-xs">
                  <code className="text-fd-foreground font-semibold">{color.cssVar}</code>
                  <span className="text-fd-muted-foreground font-mono">
                    {color.hex}
                    {color.value !== color.hex && ` · ${color.value}`}
                  </span>
                  <dl className="text-fd-muted-foreground mt-1 flex flex-col gap-0.5">
                    <Ratio label="on white" ratio={color.onSurface} />
                    <Ratio label="on background" ratio={color.onBackground} />
                  </dl>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
