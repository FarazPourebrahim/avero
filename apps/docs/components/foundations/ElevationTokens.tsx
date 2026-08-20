import { blurScale, radiusScale, shadowScale } from "@/lib/foundations";
import { TokenSource } from "./TokenSource";

/** Every radius as a specimen box, smallest first. */
export function RadiusScale() {
  return (
    <div className="not-prose grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {radiusScale().map((radius) => (
        <div key={radius.cssVar} className="flex flex-col items-start gap-2" dir="ltr">
          <div
            className="border-primary/40 bg-primary/10 h-16 w-full border-2"
            style={{ borderRadius: radius.value }}
          />
          <code className="text-fd-foreground text-xs font-semibold">rounded-{radius.name}</code>
          <span className="text-fd-muted-foreground flex items-center gap-2 text-xs">
            {radius.px !== null ? `${radius.px}px` : radius.value}
            <TokenSource source={radius.source} />
          </span>
        </div>
      ))}
    </div>
  );
}

// A drop-shadow value may list several shadows; `filter` needs one `drop-shadow()` per shadow.
function toDropShadowFilter(value: string): string {
  return value
    .split(/,(?![^(]*\))/)
    .map((shadow) => `drop-shadow(${shadow.trim()})`)
    .join(" ");
}

/** Box or drop shadows as specimen cards on the page background. */
export function ShadowScale({ kind }: { kind: "shadow" | "drop-shadow" }) {
  return (
    <div className="not-prose bg-background grid grid-cols-1 gap-6 rounded-xl p-6 sm:grid-cols-2 lg:grid-cols-3">
      {shadowScale(kind).map((shadow) => (
        <div key={shadow.cssVar} className="flex flex-col gap-3" dir="ltr">
          <div
            className="h-20 rounded-2xl bg-white"
            style={
              kind === "shadow"
                ? { boxShadow: shadow.value }
                : { filter: toDropShadowFilter(shadow.value) }
            }
          />
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-2">
              <code className="text-xs font-semibold text-gray-800">
                {kind}-{shadow.name}
              </code>
              <TokenSource source={shadow.source} />
            </span>
            <span className="font-mono text-xs break-all text-gray-600">{shadow.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Avero's blur radii. */
export function BlurScale() {
  return (
    <table>
      <thead>
        <tr>
          <th>Utility</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {blurScale().map((blur) => (
          <tr key={blur.cssVar}>
            <td>
              <code>blur-{blur.name}</code>
            </td>
            <td>{blur.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
