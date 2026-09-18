import { tokens } from "@averoui/tokens";
import type { Meta, StoryObj } from "@storybook/react-vite";

const SAMPLE = "یادگیری یعنی تمرین — Avero 1234";

// Tailwind's default scale followed by Avero's micro sizes.
const TAILWIND_SIZES = [
  ["text-xs", "0.75rem"],
  ["text-sm", "0.875rem"],
  ["text-base", "1rem"],
  ["text-lg", "1.125rem"],
  ["text-xl", "1.25rem"],
  ["text-2xl", "1.5rem"],
  ["text-3xl", "1.875rem"],
  ["text-4xl", "2.25rem"],
  ["text-5xl", "3rem"],
] as const;

const AVERO_SIZES = Object.values(tokens)
  .filter((token) => token.cssVar.startsWith("--text-"))
  .map((token) => [token.cssVar.replace("--", ""), token.value] as const);

const WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

function TypographySpecimen() {
  return (
    <div className="flex flex-col gap-10 bg-white p-6">
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800">Type scale</h2>
        {[...AVERO_SIZES, ...TAILWIND_SIZES].map(([name, size]) => (
          <div key={name} className="flex items-baseline gap-4 border-b border-gray-100 pb-3">
            <span className="w-32 shrink-0 font-mono text-xs text-gray-500" dir="ltr">
              {name} · {size}
            </span>
            <span style={{ fontSize: size }}>{SAMPLE}</span>
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800">Lahzeh weights</h2>
        {WEIGHTS.map((weight) => (
          <div key={weight} className="flex items-baseline gap-4">
            <span className="w-32 shrink-0 font-mono text-xs text-gray-500">{weight}</span>
            <span className="text-2xl" style={{ fontWeight: weight }}>
              {SAMPLE}
            </span>
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800">Line heights</h2>
        {[
          ["leading-8 (body)", "2rem"],
          ["--leading-prose", "1.8"],
          ["--leading-airy", "2.2"],
        ].map(([name, value]) => (
          <div key={name} className="flex gap-4">
            <span className="w-32 shrink-0 font-mono text-xs text-gray-500" dir="ltr">
              {name}
            </span>
            <p className="max-w-md text-base text-gray-700" style={{ lineHeight: value }}>
              طراحی خوب فقط زیبایی نیست؛ یعنی کاربر بدون درنگ بداند قدم بعدی چیست و چرا باید آن را
              بردارد.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

const meta = {
  title: "Foundations/Typography",
  component: TypographySpecimen,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TypographySpecimen>;

export default meta;

export const Specimen: StoryObj<typeof meta> = {};
