import { createFileSystemGeneratorCache, createGenerator } from "fumadocs-typescript";
import { join } from "node:path";

// Props tables are generated from the @avero/react source, never written by hand.
export const REACT_SOURCE_DIR = join(process.cwd(), "..", "..", "packages", "react", "src");

export const typeGenerator = createGenerator({
  tsconfigPath: join(process.cwd(), "..", "..", "packages", "react", "tsconfig.json"),
  cache: createFileSystemGeneratorCache(".next/fumadocs-typescript"),
});
