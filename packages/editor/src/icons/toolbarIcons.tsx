// Lucide glyphs for the editor toolbar, vendored so that lucide-react stays an optional peer.
// Source: Lucide (https://lucide.dev), ISC licence. See THIRD_PARTY_NOTICES.md.
import { createIcon } from "@averoui/react";

export const BoldIcon = createIcon("BoldIcon", {
  viewBox: "0 0 24 24",
  mode: "stroke",
  paths: ["M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"],
});

export const ItalicIcon = createIcon("ItalicIcon", {
  viewBox: "0 0 24 24",
  mode: "stroke",
  paths: ["M19 4h-9", "M14 20H5", "M15 4 9 20"],
});

export const UnderlineIcon = createIcon("UnderlineIcon", {
  viewBox: "0 0 24 24",
  mode: "stroke",
  paths: ["M6 4v6a6 6 0 0 0 12 0V4", "M4 20h16"],
});

export const StrikethroughIcon = createIcon("StrikethroughIcon", {
  viewBox: "0 0 24 24",
  mode: "stroke",
  paths: ["M16 4H9a3 3 0 0 0-2.83 4", "M14 12a4 4 0 0 1 0 8H6", "M4 12h16"],
});

export const Heading2Icon = createIcon("Heading2Icon", {
  viewBox: "0 0 24 24",
  mode: "stroke",
  paths: ["M4 12h8", "M4 18V6", "M12 18V6", "M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1"],
});

export const Heading3Icon = createIcon("Heading3Icon", {
  viewBox: "0 0 24 24",
  mode: "stroke",
  paths: [
    "M4 12h8",
    "M4 18V6",
    "M12 18V6",
    "M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2",
    "M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2",
  ],
});

export const ListIcon = createIcon("ListIcon", {
  viewBox: "0 0 24 24",
  mode: "stroke",
  paths: ["M3 12h.01", "M3 18h.01", "M3 6h.01", "M8 12h13", "M8 18h13", "M8 6h13"],
});

export const ListOrderedIcon = createIcon("ListOrderedIcon", {
  viewBox: "0 0 24 24",
  mode: "stroke",
  paths: [
    "M10 12h11",
    "M10 18h11",
    "M10 6h11",
    "M4 10h2",
    "M4 6h1v4",
    "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1",
  ],
});

export const TextQuoteIcon = createIcon("TextQuoteIcon", {
  viewBox: "0 0 24 24",
  mode: "stroke",
  paths: ["M17 6H3", "M21 12H8", "M21 18H8", "M3 12v6"],
});

export const SquareCodeIcon = createIcon("SquareCodeIcon", {
  viewBox: "0 0 24 24",
  mode: "stroke",
  // Lucide draws the square as an 18×18 rect with rx 2; the first path is the same rounded rect.
  paths: [
    "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
    "m10 9-3 3 3 3",
    "m14 15 3-3-3-3",
  ],
});

export const Undo2Icon = createIcon("Undo2Icon", {
  viewBox: "0 0 24 24",
  mode: "stroke",
  paths: ["M9 14 4 9l5-5", "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"],
});

export const Redo2Icon = createIcon("Redo2Icon", {
  viewBox: "0 0 24 24",
  mode: "stroke",
  paths: ["m15 14 5-5-5-5", "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"],
});
