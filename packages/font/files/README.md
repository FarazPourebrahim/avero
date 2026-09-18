# Lahzeh font files

Place the licensed Lahzeh font files here (the licence allows redistribution).
File names must match exactly, because `src/lahzeh.css` references them:

| Weight | woff2                     | woff                     |
| ------ | ------------------------- | ------------------------ |
| 100    | `Lahzeh-Thin.woff2`       | `Lahzeh-Thin.woff`       |
| 200    | `Lahzeh-ExtraLight.woff2` | `Lahzeh-ExtraLight.woff` |
| 300    | `Lahzeh-Light.woff2`      | `Lahzeh-Light.woff`      |
| 400    | `Lahzeh-Regular.woff2`    | `Lahzeh-Regular.woff`    |
| 500    | `Lahzeh-Medium.woff2`     | `Lahzeh-Medium.woff`     |
| 600    | `Lahzeh-SemiBold.woff2`   | `Lahzeh-SemiBold.woff`   |
| 700    | `Lahzeh-Bold.woff2`       | `Lahzeh-Bold.woff`       |
| 800    | `Lahzeh-ExtraBold.woff2`  | `Lahzeh-ExtraBold.woff`  |
| 900    | `Lahzeh-Black.woff2`      | `Lahzeh-Black.woff`      |

Run `pnpm --filter @averoui/font test` to verify that every file is present.
