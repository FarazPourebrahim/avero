---
"@averoui/react": minor
"@averoui/tokens": minor
---

`Spinner` gains four variants next to `ring` and `glow`: `track`, an arc turning on a faint full circle; `dots`, three pulsing dots; `bars`, four bars rising and falling; and `spokes`, eight spokes fading in turn. All six follow the same sizes and tones, draw with the current colour (except `glow`), and stay decorative unless `labelled`. `ring` is still the default, so existing spinners and `Button`'s loading state render exactly as before. The root now also carries `data-variant`, and the parts of the new variants carry `data-slot="spinner-part"`.

`@averoui/tokens` adds the animations behind them: `--animate-spinner-dot`, `--animate-spinner-bar` and `--animate-spinner-spoke`.
