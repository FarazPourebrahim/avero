import { AutoTypeTable } from "fumadocs-typescript/ui";
import { join } from "node:path";
import { REACT_SOURCE_DIR, typeGenerator } from "@/lib/typegen";

type PropsTableProps = {
  /** Source file relative to `packages/react/src`, e.g. `components/button/Button.tsx`. */
  file: string;
  /** Exported type to document, e.g. `ButtonOwnProps`. */
  name: string;
};

/** Renders a props table generated from the component's TypeScript source. */
export function PropsTable({ file, name }: PropsTableProps) {
  return (
    <AutoTypeTable generator={typeGenerator} path={join(REACT_SOURCE_DIR, file)} name={name} />
  );
}
