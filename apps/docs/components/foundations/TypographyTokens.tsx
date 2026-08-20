import { fontFamilies, lineHeights, typeScale } from "@/lib/foundations";
import { TokenSource } from "./TokenSource";

const WEIGHTS = [
  { weight: 100, name: "Thin" },
  { weight: 200, name: "ExtraLight" },
  { weight: 300, name: "Light" },
  { weight: 400, name: "Regular" },
  { weight: 500, name: "Medium" },
  { weight: 600, name: "SemiBold" },
  { weight: 700, name: "Bold" },
  { weight: 800, name: "ExtraBold" },
  { weight: 900, name: "Black" },
];

const PERSIAN_SAMPLE = "یادگیری ساده و لذت‌بخش";
const ENGLISH_SAMPLE = "Simple, joyful learning";

/** The font stacks behind `font-sans` and `font-code`. */
export function FontFamilies() {
  return (
    <table>
      <thead>
        <tr>
          <th>Utility</th>
          <th>Stack</th>
        </tr>
      </thead>
      <tbody>
        {fontFamilies().map((family) => (
          <tr key={family.cssVar}>
            <td>
              <code>font-{family.name}</code>
            </td>
            <td className="text-xs">{family.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Lahzeh in all nine weights, in Persian and English. */
export function FontWeights() {
  return (
    <div className="not-prose border-fd-border divide-fd-border divide-y rounded-xl border">
      {WEIGHTS.map(({ weight, name }) => (
        <div key={weight} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 px-4 py-3">
          <span className="text-fd-muted-foreground w-28 text-xs" dir="ltr">
            {weight} · {name}
          </span>
          <span className="font-sans text-xl" style={{ fontWeight: weight }} dir="rtl" lang="fa">
            {PERSIAN_SAMPLE}
          </span>
          <span className="font-sans text-xl" style={{ fontWeight: weight }} dir="ltr" lang="en">
            {ENGLISH_SAMPLE}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Tailwind's type scale merged with Avero's micro sizes, smallest first. */
export function TypeScale() {
  return (
    <table>
      <thead>
        <tr>
          <th>Utility</th>
          <th>Size</th>
          <th>Source</th>
          <th>Sample</th>
        </tr>
      </thead>
      <tbody>
        {typeScale().map((size) => (
          <tr key={size.cssVar}>
            <td>
              <code>text-{size.name}</code>
            </td>
            <td className="whitespace-nowrap">
              {size.value}
              {size.px !== null && ` · ${size.px}px`}
            </td>
            <td>
              <TokenSource source={size.source} />
            </td>
            <td
              className="font-sans leading-tight whitespace-nowrap"
              style={{ fontSize: size.value }}
              dir="rtl"
              lang="fa"
            >
              آوِرو
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Avero's prose line heights. */
export function LineHeights() {
  return (
    <table>
      <thead>
        <tr>
          <th>Utility</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {lineHeights().map((lineHeight) => (
          <tr key={lineHeight.cssVar}>
            <td>
              <code>leading-{lineHeight.name}</code>
            </td>
            <td>{lineHeight.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
