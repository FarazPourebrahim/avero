import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { DirectionSwitch } from "@/components/DirectionSwitch";
import { appName, gitConfig } from "./shared";

const repoFile = (path: string) =>
  `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/${path}`;

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
      // Sets the direction and locale of every demo on the site; the choice persists across pages.
      children: <DirectionSwitch className="ms-auto me-2" />,
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
