import { tokens } from "@averoui/tokens";
import type { Meta, StoryObj } from "@storybook/react-vite";

const shadowTokens = Object.values(tokens).filter((token) => token.cssVar.startsWith("--shadow-"));
const dropShadowTokens = Object.values(tokens).filter((token) =>
  token.cssVar.startsWith("--drop-shadow-"),
);
const radiusTokens = [
  ["--radius-xs", "0.125rem"],
  ["--radius-md", "0.375rem"],
  ["--radius-xl", "0.75rem"],
  ["--radius-2xl", "1rem"],
  ["--radius-3xl", "1.5rem"],
  ...Object.values(tokens)
    .filter((token) => token.cssVar.startsWith("--radius-"))
    .map((token) => [token.cssVar, token.value] as const),
] as const;

function Label({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5" dir="ltr">
      <span className="text-xs font-bold text-gray-800">{name}</span>
      <span className="text-2xs font-mono break-all text-gray-500">{value}</span>
    </div>
  );
}

function ElevationSpecimen() {
  return (
    <div className="bg-background flex flex-col gap-10 p-6">
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800">Shadows</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shadowTokens.map((token) => (
            <div key={token.cssVar} className="flex flex-col gap-3">
              <div
                className="h-20 rounded-2xl bg-white"
                style={{ boxShadow: `var(${token.cssVar})` }}
              />
              <Label name={token.cssVar} value={token.value} />
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800">Drop shadows</h2>
        <div className="flex flex-wrap gap-8">
          {dropShadowTokens.map((token) => (
            <div key={token.cssVar} className="flex flex-col items-start gap-3">
              <div
                className="bg-secondary size-16 rounded-full"
                style={{ filter: `drop-shadow(var(${token.cssVar}))` }}
              />
              <Label name={token.cssVar} value={token.value} />
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800">Radius</h2>
        <div className="flex flex-wrap gap-6">
          {radiusTokens.map(([name, value]) => (
            <div key={name} className="flex flex-col gap-3">
              <div
                className="size-20 border border-gray-200 bg-white"
                style={{ borderRadius: `var(${name})` }}
              />
              <Label name={name} value={value} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: "Foundations/Elevation and Radius",
  component: ElevationSpecimen,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ElevationSpecimen>;

export default meta;

export const Specimen: StoryObj<typeof meta> = {};
