# Changesets

Every PR that changes a published package (`@avero/*` under `packages/`) adds a changeset:

```sh
pnpm changeset
```

Pick the affected packages and the semver bump, then describe the change from a consumer's point of view.
See the versioning policy in `docs/avero-conventions.md`.
