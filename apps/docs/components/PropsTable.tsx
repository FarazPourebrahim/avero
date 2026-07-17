import { AutoTypeTable } from "fumadocs-typescript/ui";
import { join } from "node:path";
import {
  CHARTS_SOURCE_DIR,
  EDITOR_SOURCE_DIR,
  REACT_SOURCE_DIR,
  chartsTypeGenerator,
  editorTypeGenerator,
  typeGenerator,
} from "@/lib/typegen";

// A generator resolves types through one tsconfig, so each documented package has its own.
const SOURCES = {
  react: { dir: REACT_SOURCE_DIR, generator: typeGenerator },
  charts: { dir: CHARTS_SOURCE_DIR, generator: chartsTypeGenerator },
  editor: { dir: EDITOR_SOURCE_DIR, generator: editorTypeGenerator },
} as const;

type PropsTableProps = {
  /** Source file relative to the package's `src`, e.g. `components/button/Button.tsx`. */
  file: string;
  /** Exported type to document, e.g. `ButtonOwnProps`. */
  name: string;
  /** Package holding the type. @defaultValue "react" */
  package?: keyof typeof SOURCES;
};

/** Renders a props table generated from the component's TypeScript source. */
export function PropsTable({ file, name, package: packageName = "react" }: PropsTableProps) {
  const source = SOURCES[packageName];

  return <AutoTypeTable generator={source.generator} path={join(source.dir, file)} name={name} />;
}
