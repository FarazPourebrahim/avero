import { tokens } from "@averoui/tokens";

// Inline SVG artwork keeps demos deterministic and offline; colors come from Avero tokens.
function svg(markup: string) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(markup)}`;
}

export const portrait = svg(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${tokens.colorBorderSubtle.value}"/><circle cx="32" cy="25" r="12" fill="${tokens.colorTextChrome.value}"/><path d="M10 60c3-12 12-18 22-18s19 6 22 18" fill="${tokens.colorTextChrome.value}"/></svg>`,
);

export const cover = svg(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${tokens.colorPrimary.value}"/><stop offset="1" stop-color="${tokens.colorPrimaryHover.value}"/></linearGradient></defs><rect width="800" height="450" fill="url(#g)"/><circle cx="600" cy="120" r="80" fill="${tokens.colorSurfaceGlass.value}"/><rect x="80" y="280" width="360" height="40" rx="20" fill="${tokens.colorSurfaceGlass.value}"/></svg>`,
);
