import { animationTokens, easings } from "@/lib/foundations";
import { AnimationPreview } from "./AnimationPreview";

/** Every Avero animation with its definition and a live preview. */
export function AnimationTokens() {
  return (
    <table>
      <thead>
        <tr>
          <th>Utility</th>
          <th>Definition</th>
          <th>Preview</th>
        </tr>
      </thead>
      <tbody>
        {animationTokens().map((animation) => (
          <tr key={animation.cssVar}>
            <td>
              <code>animate-{animation.name}</code>
            </td>
            <td className="font-mono text-xs">{animation.value}</td>
            <td>
              <AnimationPreview name={animation.name} animation={animation.value} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Tailwind's easing curves. */
export function EasingTokens() {
  return (
    <table>
      <thead>
        <tr>
          <th>Utility</th>
          <th>Curve</th>
        </tr>
      </thead>
      <tbody>
        {easings().map((easing) => (
          <tr key={easing.cssVar}>
            <td>
              <code>ease-{easing.name}</code>
            </td>
            <td className="font-mono text-xs">{easing.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
