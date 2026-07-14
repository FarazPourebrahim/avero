import { createFileSystemGeneratorCache, createGenerator } from "fumadocs-typescript";
import { join } from "node:path";

const WORKSPACE_ROOT = join(process.cwd(), "..", "..");

// Props tables are generated from package source, never written by hand. Each package needs its own
// generator, because a generator resolves types through exactly one tsconfig.
export const REACT_SOURCE_DIR = join(WORKSPACE_ROOT, "packages", "react", "src");
export const CHARTS_SOURCE_DIR = join(WORKSPACE_ROOT, "packages", "charts", "src");

export const typeGenerator = createGenerator({
  tsconfigPath: join(WORKSPACE_ROOT, "packages", "react", "tsconfig.json"),
  cache: createFileSystemGeneratorCache(".next/fumadocs-typescript"),
});

export const chartsTypeGenerator = createGenerator({
  tsconfigPath: join(WORKSPACE_ROOT, "packages", "charts", "tsconfig.json"),
  cache: createFileSystemGeneratorCache(".next/fumadocs-typescript-charts"),
});
