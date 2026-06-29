import { tokens } from "@avero/tokens";
import type { Meta, StoryObj } from "@storybook/react-vite";

const animations = Object.values(tokens).filter((token) => token.cssVar.startsWith("--animate-"));

function MotionSpecimen() {
  return (
    <div className="grid grid-cols-2 gap-6 bg-white p-6 sm:grid-cols-3 lg:grid-cols-5">
      {animations.map((token) => (
        <div key={token.cssVar} className="flex flex-col items-center gap-3">
          <div className="flex h-24 w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-50">
            <div
              className="border-secondary bg-primary size-10 rounded-xl border-2"
              style={{ animation: `var(${token.cssVar})` }}
            />
          </div>
          <div className="flex flex-col items-center gap-0.5 text-center" dir="ltr">
            <span className="text-xs font-bold text-gray-800">{token.cssVar}</span>
            <span className="text-2xs font-mono text-gray-500">{token.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: "Foundations/Motion",
  component: MotionSpecimen,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MotionSpecimen>;

export default meta;

export const Animations: StoryObj<typeof meta> = {};
