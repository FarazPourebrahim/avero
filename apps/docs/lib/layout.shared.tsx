import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { appName, gitConfig } from "./shared";

const repoFile = (path: string) =>
  `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/${path}`;

export function baseOptions(): BaseLayoutProps {
  return {
    // Direction and locale belong to the demos, not to the site chrome: each preview carries its
    // own switch, and the choice it writes is still shared across every preview on every page.
    nav: {
      title: appName,
    },
    links: [
      {
        text: "Contributing",
        url: repoFile("CONTRIBUTING.md"),
        external: true,
        description: "How to build and document a component in this repository.",
      },
      {
        text: "Conventions",
        url: repoFile("docs/avero-conventions.md"),
        external: true,
        description: "The project's API, naming, styling and RTL rules.",
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
