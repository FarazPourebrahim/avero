---
"@averoui/font": patch
---

Stop Lahzeh from claiming the ASCII digits. Every `@font-face` now excludes `U+0030–U+0039`, so `0`–`9` fall through to the next family in `--font-sans` and render as Latin numerals, while Persian digits (`U+06F0–U+06F9`) keep coming from Lahzeh.

The font carries no Latin digit outlines at all: `U+0030–U+0039` are composite glyphs that draw the Persian numerals, and the `lnum`, `tnum`, `onum` and `pnum` variants resolve to those same outlines shifted sideways. No `font-feature-settings` could reach a Latin digit, so any English text set in Lahzeh — a version number, a code sample, a measurement — rendered its digits in Persian.

This changes rendered output, which Avero's versioning policy normally treats as breaking. It ships as a patch deliberately: it repairs a defect rather than revising a design decision, and no theme or class could have opted out of it. If you relied on ASCII digits rendering as Persian numerals, emit the Persian code points instead — `formatNumber` already does this for a Persian locale.
