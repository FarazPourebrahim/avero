# Changesets

Every PR that changes a published package (`@averoui/*` under `packages/`) adds a changeset:

```sh
pnpm changeset
```

Pick the affected packages and the bump level, then describe the change from a consumer's point of view.
Avero's versioning is not semver: a routine breaking change is a `minor` changeset whose entry opens with
the break and the migration, and `major` is reserved for big updates. See the versioning policy in
`docs/avero-conventions.md`.
