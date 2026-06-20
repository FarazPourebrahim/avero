# Known Debts

Every known gap, shortcut or mismatch lives here until it is resolved. Each entry states its impact and the plan to resolve it.
Remove an entry in the same change that resolves it.

| ID    | Area      | Debt                                                                                                        | Impact                                                                                                       | Resolution plan                                                                  |
| ----- | --------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| KD-01 | Reference | Tier B components (see `Avero-plan.md` §7) have no captured markup or open states.                          | They cannot be built to parity yet.                                                                          | Blocked on the Phase 0.B capture list (Appendix A).                              |
| KD-02 | Font      | The licensed Lahzeh font files have not been added to the repository yet.                                   | Storybook, the docs and the replica fall back to the system font stack; visual baselines cannot be captured. | The user adds the `woff2`/`woff` files to `packages/font/files/` (Phase 2).      |
| KD-03 | Toolchain | Local Node is 22.16; jsdom 30 and size-limit 13 need Node ≥ 22.18/22.22, so they are pinned one major back. | None functionally; slightly older test tooling.                                                              | Upgrade local Node to the latest 22.x or 24 LTS, then bump jsdom and size-limit. |
| KD-04 | Toolchain | TypeScript is pinned to 6.0.x because typescript-eslint doesn't support TypeScript 7 yet.                   | We can't use the native TypeScript 7 compiler.                                                               | Bump when typescript-eslint's peer range includes 7.x.                           |
