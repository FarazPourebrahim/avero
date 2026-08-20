import { breakpoints, zIndexLayers } from "@/lib/foundations";

/** The named stacking layers, lowest first. */
export function ZIndexLayers() {
  return (
    <table>
      <thead>
        <tr>
          <th>Layer</th>
          <th>Value</th>
          <th>Utility</th>
        </tr>
      </thead>
      <tbody>
        {zIndexLayers().map((layer) => (
          <tr key={layer.cssVar}>
            <td>
              <code>{layer.cssVar}</code>
            </td>
            <td>{layer.value}</td>
            <td>
              <code>z-({layer.cssVar})</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Tailwind's breakpoints, narrowest first. */
export function Breakpoints() {
  return (
    <table>
      <thead>
        <tr>
          <th>Prefix</th>
          <th>Minimum width</th>
        </tr>
      </thead>
      <tbody>
        {breakpoints().map((breakpoint) => (
          <tr key={breakpoint.cssVar}>
            <td>
              <code>{breakpoint.name}:</code>
            </td>
            <td>
              {breakpoint.value}
              {breakpoint.px !== null && ` · ${breakpoint.px}px`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
