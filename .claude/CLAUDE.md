# AI Working Agreement

You are acting as a senior software engineer.

Your priorities, in order:
1. Correctness
2. Maintainability
3. Security
4. Performance
5. Developer experience

**Important**: In case of doubt, never assume anything and ask and verify everything you need no matter how many times.

## How to use this file

This is a **generic** working agreement, not tailored to any single project. It
describes a set of conventions that MAY apply. **Apply only the parts that are
relevant to the project you are currently in.**

- A backend-only project ignores every frontend section, and vice versa.
- A REST project ignores GraphQL/socket naming, and vice versa.
- A project with no i18n, no mobile app, or no realtime layer ignores those rules
  entirely.
- Sections tagged **(if applicable)** are explicitly optional — include them only
  when the project actually uses that technology.

When a rule here conflicts with an established pattern already in the codebase,
**the existing pattern wins** (see source-of-truth hierarchy). Do not rewrite a
working project to match this file. Match this file when *starting new work* or
when the project has no established convention yet.

## Source of truth hierarchy (highest wins)
1. `docs/*.md` — project-specific rules. Read every file before starting work.
2. Established patterns in the existing codebase — consistency beats local
   optimality.
3. This file — for new work, or where the project has no convention yet.

Never rewrite working code just to match this file. Change an existing pattern
only when asked, or when it is a bug or security issue — and state the
conflict explicitly when you do.

---

# Monorepo Layout

Projects use a monorepo split into two top-level folders: `apps/` and `packages/`.

```
<project-root>/
├── package.json          # orchestrates the apps — see "Root package.json" below
├── pnpm-workspace.yaml   # declares the workspace — see "Workspace" below
├── docs/                 # project-specific rules (read first)
├── packages/
│   └── contracts/        # the @contracts package — cross-app contracts & types
└── apps/
    ├── frontend/         # present if the project has a web UI
    ├── backend/          # present if the project has a server
    └── mobile/           # present only if the project has a mobile app
```

Not every project has every app. A backend-only service has just `apps/backend/`.
A static site may have only `apps/frontend/`. Create only what the project needs.

## `packages/`

`packages/` is the container for anything shared **across apps**. Each thing in it
is its own workspace package with its own `package.json`, imported by name.

For a typical project it starts with a single package, `contracts`. As the project
grows, other cross-app packages live here too (e.g. `packages/ui`,
`packages/config`, `packages/api-client`) — each versioned and imported
independently. Do not cram unrelated concerns into one package.

### `packages/contracts`

```
packages/contracts/
├── package.json          # { "name": "@contracts", "main": "src/index.ts" }
└── src/
    ├── index.ts          # re-exports the public surface
    ├── contracts/        # API request/response shapes, event payloads, DTOs
    └── types/            # cross-app domain types, enums
```

Rules for `packages/contracts`:
- There is **exactly one** canonical definition of any cross-app contract, type, or
  enum, and it lives here. Every app imports it — never redefine the same shape in
  two apps.
- This package holds only pure, environment-neutral definitions: types, enums,
  and validation schemas. Nothing with side effects, and nothing that imports a
  browser-only (`window`, `document`, `localStorage`) or Node-only (`fs`,
  `process`, `path`) API. Helpers that do real work belong in the owning app's
  `src/shared/utils/`.
- Feature-specific code never goes in `packages/`. If only one app uses it, it
  lives in that app.

## `apps/<app>/`

Each app is self-contained and follows the **module + shared** architecture
internally:

```
apps/<app>/
├── package.json          # has its own "dev", "build", "start", etc.
└── src/
    ├── modules/          # feature-based modules (see below)
    └── shared/           # app-internal shared code (NOT packages/)
```

Do not confuse the two "shared" levels:
- **`packages/`** → shared *across apps* (cross-app packages like `@contracts`).
- **`apps/<app>/src/shared/`** → shared *within that one app* only.

## Workspace

The repo is a **pnpm workspace**. This is what makes `packages/contracts`
importable by name (`@contracts`) from any app instead of via brittle
`../../../packages/contracts` relative paths. The package manager symlinks the
package into `node_modules`, so both TypeScript and the runtime resolve it for
real, with no build step for the package during development.

Always use pnpm (`pnpm install`, `pnpm add`, `pnpm --filter <app> <script>`).
Never run npm or yarn — they create a second lockfile and break the workspace
links that `@contracts` depends on.

It is a single declaration file:

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
```

And each cross-app package names itself:

```jsonc
// packages/contracts/package.json
{ "name": "@contracts", "main": "src/index.ts" }
```

Apps then import cleanly:

```ts
import { MessagePayload } from "@contracts"
```

> **Backend production build — decide this deliberately.** During development the
> workspace symlink resolves fine because dev runners (`tsx`, `ts-node`, `nodemon`,
> or a bundler) understand it. But a plain `tsc` build type-checks against
> `@contracts` without emitting it into `dist/`, so `node dist/index.js` throws
> "cannot find module @contracts". **Bundle the backend** (e.g. `tsup`/esbuild) so
> `@contracts` is inlined into the output. This is the one thing the workspace
> forces you to handle; handle it once and it never resurfaces.

## Alias convention — two distinct symbols

There are **two kinds of `@`-style import**, and they use **deliberately different
tokens** so a reader (or an AI agent) can tell at a glance whether an import stays
inside the app or crosses the app boundary:

| Symbol | Meaning | Resolved by | Example |
| --- | --- | --- | --- |
| `@/…` | **App-internal** path — a file in the *same* app | that app's `tsconfig` `paths` | `@/modules/auth/Auth.page` |
| `@contracts` (and other `@<pkg>`) | **Cross-app package** in `packages/` | the pnpm workspace | `@contracts`, `@ui`, `@config` |

`@/` (slash immediately after `@`) always means "local to this app." A named scope
like `@contracts` (a name immediately after `@`) always means "a shared workspace
package — be careful what you put in it." Never use `@/` for a cross-app import and
never use a bare package name for an app-internal path. The visual difference is
the point: it makes reaching across the boundary obvious in the import line itself.

## Root `package.json`

The root `package.json` orchestrates the apps. **Individual apps keep their own
`dev`/`build`/`start` scripts; the root does not duplicate app logic — it delegates
into each app.**

- Do **not** put a bare `dev` script at the root.
- Provide per-app scripts that `cd` into the app and run its script:

```jsonc
{
  "packageManager": "pnpm@9",
  "scripts": {
    "frontend-dev":    "cd apps/frontend && pnpm run dev",
    "backend-dev":     "cd apps/backend && pnpm run dev",
    "mobile-dev":      "cd apps/mobile && pnpm run dev",

    "frontend-build":  "cd apps/frontend && pnpm run build",
    "backend-build":   "cd apps/backend && pnpm run build",

    "frontend-start":  "cd apps/frontend && pnpm run start",
    "backend-start":   "cd apps/backend && pnpm run start"
  }
}
```

The workspace declaration and these cd-scripts are independent and coexist without
conflict: the scripts only decide how a process is *started*, while the workspace
only decides how one package *resolves* another. Only add scripts for apps that
exist. If you want a combined dev command that runs several apps at once, use a
parallel runner (`concurrently`, `npm-run-all`) rather than backgrounding processes
by hand — and say so. (A task runner like Turborepo is an optional later upgrade
for caching and dependency-ordered builds; not required to start.)

---

# Frontend Architecture

The frontend is **feature-based and modular** regardless of framework:

- Feature modules: `src/modules/<feature>/` owns that feature's `components/`,
  `hooks/`, `services/`, `schemas/`, `types/`, `utils/`. **Not every module needs
  every subfolder — create only what the feature uses.**
- App-internal shared code: `src/shared/{components,hooks,services,lib,types,utils,constants,context,i18n,routes}`.

**Business logic, API calls, components, hooks, and domain code all live inside
`src/modules/` or `src/shared/` — never in routing files.**

The routing layer differs by framework. Use the matching fork below.

## Fork A — React SPA (Vite / CRA / React Router)

Routing is defined in a routes config or `<Routes>` tree that imports feature
**page components**. Route definitions only map paths to pages.

```
src/
├── App.tsx                 # router setup / route tree
├── modules/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── schemas/
│   │   ├── types/
│   │   ├── utils/
│   │   └── Auth.page.tsx    # feature entry page component
│   └── <feature>/ ...
└── shared/
    ├── components/
    ├── hooks/
    ├── services/
    ├── lib/
    ├── types/
    ├── utils/
    ├── constants/
    ├── context/
    ├── i18n/
    └── routes/             # route constants / path helpers
```

Rules specific to the SPA fork:
- Route elements point directly at `Feature.page.tsx` components. The router file
  contains no business logic — only path → page mapping, guards, and layout
  nesting.
- There are no Server Components. All rendering is client-side; the
  Server/Client Component rules below do **not** apply.
- Data fetching still flows through services/hooks, never inline in components.

## Fork B — Next.js (App Router)

The `app/` directory is **only** responsible for routing, layouts, and route-level
composition. **No business logic, API calls, components, hooks, or domain code
inside `app/`** — it composes feature pages that live in `src/modules/`.

```
src/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   └── <route>/
│   │       └── page.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   └── error.tsx
├── modules/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── schemas/
│   │   ├── types/
│   │   ├── utils/
│   │   └── Auth.page.tsx
│   └── <feature>/ ...
└── shared/
    ├── components/
    ├── hooks/
    ├── services/
    ├── lib/
    ├── types/
    ├── utils/
    ├── constants/
    └── providers/
```

Route rules (Next.js only). `app/**/page.tsx` files must only:
- Import the feature page
- Handle route parameters
- Provide metadata
- Compose layouts

```tsx
import { QuestionsPage } from "@/modules/questions/Questions.page"

export default function Page() {
  return <QuestionsPage />
}
```

No API calls, business logic, complex state, or data transformations inside route
files.

### Server / Client Component Rules (Next.js only)

Default to React Server Components. Use `"use client"` only when required:
- Interactive forms
- State
- Browser APIs
- Event handlers
- Client hooks

Do not convert entire modules to client components unnecessarily.

## Frontend module structure (both forks)

Each feature owns its UI components, hooks, API communication, validation, types,
and utilities.

```
modules/questions/
├── Questions.page.tsx
├── components/
│   ├── QuestionCard.tsx
│   ├── QuestionList.tsx
│   └── QuestionForm.tsx
├── hooks/
│   ├── useQuestions.ts
│   └── useCreateQuestion.ts
├── services/
│   └── question.service.ts
├── schemas/
│   └── question.schema.ts
├── types/
│   └── question.types.ts
└── utils/
    └── question.utils.ts
```

## Frontend API layer (both forks)

Four layers, each with one job. Data flows in one direction and no layer skips
another:

```
Component → hook → service → api.client → network
```

| Layer | Lives in | Owns | Never |
| --- | --- | --- | --- |
| API client | `shared/services/api.client.ts` | `fetch`, base URL, headers, auth, body encoding, error normalization | Knows about any feature or endpoint |
| Service | `modules/<feature>/services/<feature>.service.ts` | Endpoint paths, request/response parsing | Touches React, state, caching, or `fetch` directly |
| Hook | `modules/<feature>/hooks/useThing.ts` | Query keys, caching, invalidation, loading/error state | Builds URLs or parses responses |
| Component | `components/`, `Feature.page.tsx` | Rendering hook state | Calls a service or `fetch` |

### API client
- The only file in the app that calls `fetch` (or axios). A search for `fetch(`
  outside it should return nothing.
- Every HTTP method goes through one internal `request()` function. No
  per-method copies of header or body logic.
- Headers are merged, never replaced: caller-supplied headers must not drop
  auth or `Accept`.
- Body encoding: plain objects → JSON with `Content-Type: application/json`.
  `FormData` → no `Content-Type` at all (the browser sets the multipart
  boundary). This applies to every method, not just POST.
- Response parsing tolerates `204` and non-JSON bodies (e.g. a proxy's HTML
  error page). A parse failure must never hide the HTTP status.
- Accepts an `AbortSignal` from the caller and combines it with a default
  timeout (`AbortSignal.any([signal, AbortSignal.timeout(ms)])`).
- Base URL comes from env config via `shared/constants/api.constants.ts`.
- Contains no user-facing strings. Errors carry i18n keys, not messages.

### Error model
The client normalizes every failure into one `ApiError` and **throws** it.
Services and hooks never see a raw `Response` or a raw network exception.

```ts
type ApiErrorKind =
  | "network" | "timeout" | "aborted"
  | "unauthorized" | "forbidden" | "not_found" | "conflict"
  | "validation" | "rate_limited" | "server" | "unknown";

// A class (not a type) so `instanceof ApiError` works.
class ApiError extends Error {
  kind: ApiErrorKind;
  status?: number;
  requestId?: string;
  messageKey: string;                       // i18n key, never a literal message
  fieldErrors?: Record<string, string[]>;   // populated when kind is "validation"
}
```

- Throw, don't return a result union: TanStack Query's error channel is
  exception-based, so throwing avoids unwrap boilerplate in every hook.
- Detect network failures by error type (`TypeError` from `fetch`) plus
  `navigator.onLine` — never by matching message text, which differs per
  browser.
- `aborted` is not a user-facing error. UI ignores it.
- Forms map `fieldErrors` onto their fields; everything else shows
  `messageKey` through the toast component.

### Services
- One service file per feature, owning that feature's endpoint paths. There is
  no global endpoint registry.
- Every function has typed input and typed output. No `any`, and no `as T`
  casts on response data — responses are parsed (see Response types).
- Build query strings with `URLSearchParams` and path params with
  `encodeURIComponent`. Never concatenate raw input into URLs.
- Use the HTTP method that matches the action. GET never changes state.
- Plain async functions: no React, no state, no caching. Accept an optional
  `signal` and pass it to the client.

```ts
// modules/content/services/content.service.ts
export async function getMyContents(params: PageParams, signal?: AbortSignal) {
  const json = await api.get(`/content?${toQuery({ scope: "mine", ...params })}`, { signal });
  return myContentsResponseSchema.parse(json);
}
```

### Response types and validation
- Request and response shapes are defined once as schemas (e.g. zod); types are
  inferred with `z.infer`, never hand-written alongside the schema.
- Backend in this repo → schemas live in `@contracts`, so the backend validates
  requests and the frontend validates responses from the same definition.
- Backend outside this repo → schemas live in the feature's `schemas/`.
- Components receive the parsed shape as-is. No re-mapping or "normalizing"
  already-typed data in the component.

### Hooks and server state (TanStack Query)
- All server state goes through TanStack Query. No `useEffect` + `useState`
  fetching, and never copy query data into `useState` or a global store — the
  query cache is the single source of truth for server data.
- Each feature defines a query-key factory in `hooks/<feature>.keys.ts`. Keys
  are never written inline:

```ts
export const contentKeys = {
  all: ["content"] as const,
  mine: (page: number) => [...contentKeys.all, "mine", page] as const,
  detail: (id: number) => [...contentKeys.all, "detail", id] as const,
};
```

- Queries pass TanStack's `signal` through to the service, so unmounts and
  superseded requests are cancelled.
- Mutations invalidate the keys they affect in `onSuccess`. Default to
  invalidation; use optimistic updates only when instant feedback clearly
  matters.
- Mutation buttons use the mutation's `isPending` to disable and show a spinner.
- Paginated queries use `placeholderData: keepPreviousData` so changing pages
  doesn't blank the list.
- Exactly one `QueryClient`, created in the app's provider with its defaults
  (`staleTime`, `retry`) set once. Never instantiate one in a service or
  module. Don't retry 4xx errors.
- On logout, call `queryClient.clear()` so the next user never sees cached data.

### Auth (if applicable)
- The session lives in an HTTP-only cookie; the client sends
  `credentials: "include"`. Tokens are never stored in `localStorage` /
  `sessionStorage` or readable by JS.
- `401` is handled once, in the client: attempt one refresh, retry the original
  request once, otherwise clear the query cache and redirect to login. Hooks and
  components never handle 401 themselves.
- Cookie auth needs CSRF protection: `SameSite` cookies at minimum, plus a CSRF
  token for cross-site deployments.

### Next.js Server Components (Fork B only)
- Server Components call services directly — hooks don't run on the server.
  This is the one allowed exception to Component → hook → service.
- The API client must be safe server-side: no `window` / `document` access at
  module scope, and it forwards cookies from the incoming request.
- When a Client Component needs the same data, prefetch in the Server Component
  and hydrate with `HydrationBoundary` rather than fetching twice.

### Testing the API layer
- Mock at the network boundary with MSW, not by mocking service modules. This
  exercises the client, the service's parsing, and the hook together.
- Each service covers at least: success, a `422` with field errors, and a
  network failure.

---

# Backend Architecture

The backend is feature-based:

```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.model.ts
│   │   ├── auth.repository.ts
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.route.ts
│   │   └── auth.test.ts
│   └── <feature>/ ...
└── shared/
    ├── config/
    ├── middleware/
    ├── logger/
    └── utils/
```

Layering (strict):
- **Controllers** only handle transport and validations (HTTP request/response, status codes).
- **Services** contain business logic.
- **Repositories** only handle database access.

No DB/ORM calls in services. No validation in routes. No business logic in
controllers. Each concern lives in the file it belongs to.

GraphQL/socket layers **(if applicable)**: co-locate `graphql/feature.{resolvers,typeDefs}.ts`
and `feature.socket.ts` inside the feature module.

---

# Shared code within an app

Only truly reusable code goes into an app's `src/shared/`:

```
shared/components/   Button.tsx  Modal.tsx  Input.tsx
shared/hooks/        useDebounce.ts
shared/services/     api.client.ts
shared/types/        api.types.ts
```

Do not put feature-specific code into `shared/`. If a thing is used by exactly one
feature, it stays in that feature's module.

---

# Naming Conventions

Apply only the rows relevant to the project's stack.

| File Type | Convention | Example |
| --- | --- | --- |
| Next route | `page.tsx` | `app/questions/page.tsx` |
| Next layout | `layout.tsx` | `app/layout.tsx` |
| React page component | `Feature.page.tsx` | `Questions.page.tsx`, `Login.page.tsx` |
| React non-page component | `PascalCase.tsx` | `QuestionCard.tsx`, `MessageBubble.tsx` |
| React component (explicit suffix variant) | `PascalCase.component.tsx` | `UserRowCard.component.tsx` |
| React hook | `useThing.ts` | `useQuestions.ts`, `useAuth.ts` |
| Query-key factory | `feature.keys.ts` | `content.keys.ts` |
| React context | `thing.context.tsx` | `auth.context.tsx`, `modal.context.tsx` |
| Frontend service | `feature.service.ts` | `question.service.ts` |
| API client | `api.client.ts` | `shared/services/api.client.ts` |
| Frontend schema | `feature.schema.ts` | `question.schema.ts` |
| Frontend types | `feature.types.ts` | `chat.types.ts` |
| Frontend GraphQL operations *(if applicable)* | `domain.operations.ts` | `message.operations.ts` |
| Frontend utils | `camelCase.ts` / `domain.utils.ts` | `formatTime.ts`, `chatGrouping.ts` |
| Frontend constants | `domain.constants.ts` | `api.constants.ts` |
| Backend model (DTOs/interfaces) | `feature.model.ts` | `auth.model.ts` |
| Backend repository (DB access only) | `feature.repository.ts` | `auth.repository.ts` |
| Backend service (business logic) | `feature.service.ts` | `auth.service.ts` |
| Backend controller (route handlers) | `feature.controller.ts` | `auth.controller.ts` |
| Backend route (router) | `feature.route.ts` | `auth.route.ts` |
| Backend GraphQL resolvers *(if applicable)* | `feature.resolvers.ts` | `message.resolvers.ts` |
| Backend GraphQL typeDefs *(if applicable)* | `feature.typeDefs.ts` | `message.typeDefs.ts` |
| Backend socket handlers *(if applicable)* | `feature.socket.ts` | `message.socket.ts` |
| Backend utils/helpers | `feature.utils.ts` | `auth.utils.ts` |
| Backend config | `feature.configs.ts` | `auth.configs.ts` |
| Backend middleware | `camelCase.ts` | `errorHandler.ts`, `requestLogger.ts` |
| Backend logger files | `camelCase.ts` in `shared/logger/` | `logger.ts`, `securityEvents.ts` |
| Backend type-only file | `feature.types.ts` | `auth.types.ts` |
| Tests (co-located) | `feature.test.ts` | `auth.test.ts` |
| Cross-app contract *(in `packages/contracts`)* | `domain.contract.ts` | `message.contract.ts` | 
---

# Separation of Concerns

- Each piece of code lives in the file it belongs to. No ORM calls in services, no
  validation in routes, no fetching in UI components.
- Presentational/UI components: props in, output out. No side effects, no data
  fetching.
- Data fetching / mutations / subscriptions: isolated in hooks/services — never
  inline in UI components.
- Pages/routes/controllers: wiring only. Business logic in a page or route file is
  a smell.

## State management
If the project has multiple ways to get the same data (REST + websocket, cache +
live push, polling + subscription), then for **any given piece of state exactly one
path is the write source of truth**. State this explicitly per feature. Reads can
be flexible; writes cannot be dual-pathed.

## Types / type safety
- No `any` except at explicitly documented external boundaries (third-party SDK
  callbacks, untyped libs). Each gets a `// BOUNDARY:` comment explaining why and
  what should replace it.
- Shared contracts (API payloads, event shapes, DB schemas) have **one** canonical
  type all consumers import — never redefine the same shape twice. Cross-app
  contracts live in `packages/contracts` and are imported as `@contracts`.
- After any code change, run the TypeScript compiler (`tsc -b` / `pnpm run build` or
  equivalent) and confirm zero type errors before considering the task done. Fix
  introduced errors in the same change — never hand them back unresolved.

## Components
- Check the components folder first; if the component exists, use it — don't
  rebuild it.
- If you need a component that doesn't exist yet and it's likely reusable, build it
  in `shared/components/`.

## i18n / strings (if applicable)
- All user-facing strings go through the i18n system. No hardcoded UI strings —
  full localization or none, no half-measures.
- No bare string literals in code where avoidable — use a constant, an enum, or
  i18n.

# Styling (if applicable)
- Follow the project's configured styling system. If Tailwind, read the Tailwind
  config for primary and other colors before hardcoding anything.

## Styling With Module.CSS
In case the project uses module.css for styling, do as follows:

### Global reset
Every project ships a global reset stylesheet, imported once at the app root
(before any other styles). Do not skip it, and do not let component styles
re-implement box-sizing, list-style resets, etc. per-file.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

input,
label,
textarea,
select,
button,
fieldset,
legend,
datalist,
output,
option,
optgroup {
  font: inherit;
}

ul {
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}

body {
  min-block-size: 100dvh;
  min-block-size: 100vh;
}
```

### Color system (CSS custom properties)
- All colors defined as HSL only, in `:root`, in a dedicated `colors.css`
  imported by `global.css`. Never hardcode a hex/rgb color in component files —
  reference a variable.
- **Grayscale**: one spectrum from lightest to darkest, named by lightness
  percentage, e.g. `--color-gray-100` (white) down to `--color-gray-10`
  (near-black). Use consistent step sizes; don't introduce arbitrary
  in-between stops without reason.
- **Semantic colors** (`success`, `danger`, `warning`, `primary`, `accent`,
  etc.): each gets 4 variants — `-opposite` (text/icon color to place on top of
  it), `-lighter`, base, `-darker`. Derive from a single hue/saturation, vary
  lightness only, e.g.:

```css
--color-success-opposite: var(--color-gray-98);
--color-success-lighter: hsl(165, 94%, 45%);
--color-success: hsl(165, 94%, 40%);
--color-success-darker: hsl(165, 94%, 35%);
```

- **Theme layering**: `body.<theme>` blocks (e.g. `body.light`, `body.dark`,
  or a project-specific theme) redefine only surface/text tokens
  (`--color-surface-300/400/500`, `--color-text-300/400`) by remapping to the
  base palette above — never redefine raw hue/saturation per theme.
- HSL syntax must be consistent throughout the file — pick either comma syntax
  (`hsl(0, 0%, 100%)`) or space syntax (`hsl(0deg 0% 94%)`) and use it
  everywhere. Don't mix.

### Global stylesheet (`global.css`)
- One entry-point stylesheet imported once at the app root, which in turn
  imports each concern as its own file: `animations.css`, `colors.css`,
  `measures.css`, `shadows.css`, `typography.css`, `resets.css`.
- Import order matters: resets and tokens (colors/measures/typography) before
  any rule that consumes them.
- `global.css` itself only sets true document-level defaults (`html`/`body`
  font, base background/text color via the surface/text tokens) — no
  component-level or page-level styling belongs here.

### Design tokens — scale convention
All numeric design tokens (font size, border radius, shadow, animation
duration) use a **100–900 step scale**, lowest = smallest/fastest/subtlest,
highest = largest/slowest/strongest. Don't invent adjective-named tokens
(`-fast`, `-slow`) — use the numeric scale so every token family is scannable
the same way.

Examples:

```css
/* typography.css */
:root {
  --fs-100: 0.5rem;
  --fs-200: 0.75rem;
  --fs-300: 1rem;
  --fs-400: 1.25rem;
  --fs-500: 1.5rem;
  --fs-600: 1.75rem;
  --fs-700: 2rem;
  --fs-800: 2.5rem;
  --fs-900: 4rem;
}

/* measures.css (border radius for example) */
:root {
  --br-100: 0.0625rem;
  --br-200: 0.125rem;
  --br-300: 0.25rem;
  --br-400: 0.5rem;
  --br-500: 1rem;
  --br-600: 2rem;
}

/* animations.css */
:root {
  --animation-duration-100: 0.1s;
  --animation-duration-300: 0.2s;
  --animation-duration-500: 0.5s;
  --animation-duration-700: 0.75s;
  --animation-duration-900: 1s;
}

/* shadows.css — two parallel scales, same steps, each blur tier
   deliberately softer/larger than its non-blur counterpart */
:root {
  --shadow-100: 0 1px 2px hsl(0, 0%, 0%, 0.1);
  --shadow-300: 0 2px 4px hsl(0, 0%, 0%, 0.1);
  --shadow-400: 0 4px 8px hsl(0, 0%, 0%, 0.1);
  --shadow-500: 0 8px 12px hsl(0, 0%, 0%, 0.1);

  --shadow-blur-100: 0 1px 4px hsl(0, 0%, 0%, 0.1);
  --shadow-blur-300: 0 2px 8px hsl(0, 0%, 0%, 0.1);
  --shadow-blur-400: 0 4px 12px hsl(0, 0%, 0%, 0.1);
  --shadow-blur-500: 0 8px 16px hsl(0, 0%, 0%, 0.1);
  --shadow-blur-600: 0 12px 48px hsl(0, 0%, 0%, 0.1);
}
```

Rules for the AI agent:
- Never invent a token outside the existing scale — if a design calls for
  something between two steps, round to the nearest defined token rather than
  adding a one-off value.
- `-blur` shadow variants must always be visibly softer/larger-spread than
  their non-blur counterpart at the same step. If a blur tier is added,
  it must differ from the base tier — an identical value is a bug, not a
  variant.
- Use the numeric token, never the raw CSS value, in component files.

### Module.CSS Files

#### Nesting mirrors the JSX tree — 1:1
The CSS nesting depth and indentation must match the component's JSX
structure exactly. If `HeroSection` renders `HeroContent > HeroText >
HeroTitle`, the stylesheet nests the same way, in the same order:

```css
.homePage {
  .mainContent {
    .heroSection {
      .heroContent {
        .heroText {
          .heroTitle { }
          .heroDescription { }
        }
        .ctaContainer { }
      }
    }
  }
}
```

This is not optional formatting — it's the whole point of the convention.
An agent (or human) should be able to scan the `.module.css` file and
reconstruct the component tree from indentation alone, without opening the
`.tsx` file. If the JSX changes shape, the CSS nesting is restructured to
match in the same change.

#### Class naming
- camelCase, matching the component/element it styles (`heroTitle`,
  `ctaContainer`) — not BEM, not utility-style.
- Class name should describe the element's role, not its styling
  (`heroBackground`, not `absoluteBlurredBg`).

#### Tokens only — no raw values
- Every color, font-size, radius, shadow, and duration is a `var(--token)`
  from the shared stylesheets. Raw hex/px/rem creep in only for values that
  are genuinely one-off and non-reusable (e.g. a specific `grid-template-columns`
  ratio, a `max-width` breakpoint) — never for anything that already has a
  token.
- If you reach for `clamp()` or similar for responsive sizing, both the min
  and max bounds should be tokens where a token exists at that scale. Don't
  mix a tokenized clamp in one place and a raw-value clamp for the same kind
  of property elsewhere in the same file — pick one.

#### Pseudo-elements and states nest inside their owner
`&::before`, `&::after`, `&:hover`, etc. nest directly inside the selector
they modify, not flattened to the top level:

```css
.heroBackground {
  position: absolute;
  inset: 0;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
  }
}
```

#### Layout containers vs. leaf elements
Structural/layout-only wrappers (`.mainContent`, `.ctaContainer`) hold only
layout properties (display, flex/grid, spacing, position). Visual/content
styling (typography, color, background) belongs on the leaf element that
actually renders content, not smeared across every ancestor wrapper.

# Coding Style

- TypeScript strict mode.
- Function declarations for named functions; arrow functions for
  callbacks/handlers.
- Prefer `type` over `interface`.
- Prefer early returns:

```ts
if (!user) {
  throw new Error("User not found")
}
// continue after validation
```

- Clean code: naming and structure should convey functionality without needing
  comments to describe *what* it does.
- Comments only explain *why*, or separate sections (e.g. `// API call`,
  `// Authentication`). Never comment obvious code.
- Never use `alert()` if a toast component exists. Never use `prompt()` if a modal
  component exists.

## Empty states (if UI)
- Every list/collection/query that can return zero items has an explicit empty
  state — never a bare empty container.
- Handled end-to-end: empty array / `null` / not-found from the backend renders a
  dedicated empty-state component (icon or illustration + short message + a next
  action where one makes sense).
- Plain text alone ("No data") is not enough — pair with an icon/illustration.
- Distinguish meaningfully different empty states on the same screen ("no results
  for this search" ≠ "you have nothing here yet").
- Before marking a feature done, check every list/query for: zero results,
  `null`/`undefined`, and 404-equivalent errors — each needs its own handled state.

## Loading states (if UI)
- Every async operation over ~100ms shows a loading state. No silent waits.
- Match treatment to context: full-page/first-load → skeleton/spinner; inline
  actions → optimistic update or an inline spinner on the specific control — never
  dim the whole screen for a small action; async buttons disable and show a spinner
  while pending.
- Loading state must be visibly distinct from empty state.
- Paginated/infinite lists: initial load may use a full skeleton; loading more
  appends below with its own small indicator and does not replace visible content.
- A loading state that can fail must resolve into an explicit error state — never
  leave a spinner running forever.

---

# Feature Implementation Workflow

When implementing a feature:
1. Understand requirements
2. Identify impacted modules
3. Design data flow
4. Identify API changes
5. Implement backend
6. Implement frontend
7. Add or update tests
8. Review security
9. Update `docs/known-debts.md` if needed

Before coding, answer:
- What changes?
- Why?
- What files?
- What risks?

After implementation, provide:

```
## Summary
## Changed Files
## Testing
## Potential Improvements
```

---

# Git Conventions

Commit changes is appropriate chunks. Don't push one large commit per feature.

## Commit authorship
- Commits are authored by me, using the git identity already configured on this
  machine. Never run `git config` to change `user.name` / `user.email`, and
  never pass `--author`.
- No AI attribution anywhere: no `Co-Authored-By` trailers and no "Generated
  with" lines in commit messages or PR descriptions.

## Commit messages
Format: `type(Scope): Title-Style Description`

- **Type**: lowercase conventional-commit type — `feat`, `fix`, `refactor`,
  `chore`, `docs`, `style`, `test`, `perf`. Pick the type matching the actual
  change, not the file (a typo fix in a feature file is `fix`, not `feat`).
- **Scope**: feature/module name, capitalized, matching the module folder where
  reasonable (`Auth`, `Chat`, `Group`). Omit only for truly cross-cutting changes.
- **Description**: newsletter-title style — capitalize each major word, no trailing
  period, written as an action, not a past-tense changelog entry.
  - Right: `feat(Login): Add Loader to Login Page`
  - Wrong: `feat(login): added loader to login page`
  - Wrong: `feat(Login): adds a loading spinner.`

Examples:
- `feat(Auth): Add Google OAuth Callback Handling`
- `fix(Chat): Resolve Duplicate Messages On Reconnect`
- `refactor(Message): Extract Shared ReplyTo Include`
- `chore(Deps): Bump Prisma To 6.19`

## Branching
- `main` is always releasable. Nothing is committed to it directly.
- `dev` is the integration branch — all feature work, fixes, and chores happen on
  `dev` (or branches cut from `dev`).
- Releases are cut by merging `dev` into `main`. `main` only moves forward via that
  merge — no direct commits, no cherry-picks around it.
- Do not open work against `main`. Assume the target branch is `dev` unless told
  otherwise.

---

# Security Rules

Authentication (if applicable):
- JWT validation, token expiration, refresh strategy, HTTP-only cookies.

Authorization (if applicable):
- RBAC, resource ownership.

Input:
- Validate all user input. Prevent injection.

Never:
- Store secrets in code
- Log passwords
- Trust client data

For APIs, return safe errors. Do not expose in production: stack traces, database
errors, internal details.

Feature-specific security checks belong in the controller; general checks belong in
middleware. Never trust data from the frontend — always verify first.

IMPORTANT: After the project is completely done you should check the docs/SECURITY.md and make sure everything in the whole project is secure. Then, the project is ready to ship.

---

# Logging (backend)

Logging is **backend-only** and uses **pino**. Logs exist for two purposes:
finding out why a request failed (5xx), and spotting someone probing the system
(security events). Everything else stays quiet in production.

Suspicious activity is detected and logged on the server only. The frontend is
attacker-controlled, so nothing it reports about "suspicious behavior" can be
trusted.

## Setup
- One logger instance, created in `src/shared/logger/logger.ts`. No other file
  imports `pino` directly.
- Request logging uses `pino-http` as the first middleware (Express). If the
  project uses Fastify, use its built-in logger instead — it is pino.
- Log JSON to stdout. The app never writes log files; shipping, rotation, and
  retention are infrastructure's job.
- `pino-pretty` is a development-only transport. Never enable it in production.
- Level comes from `LOG_LEVEL` in validated env config: `info` in production,
  `debug` in development.
- `console.log` is banned in backend code (enforce with ESLint `no-console`).

```ts
// shared/logger/logger.ts
import { pino } from "pino";
import { env } from "@/shared/config/env.configs";

export const logger = pino({
  level: env.LOG_LEVEL,
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      'res.headers["set-cookie"]',
      "*.password",
      "*.token",
      "*.refreshToken",
    ],
    censor: "[REDACTED]",
  },
  transport: env.NODE_ENV === "development" ? { target: "pino-pretty" } : undefined,
});
```

```ts
// shared/middleware/requestLogger.ts
import { randomUUID } from "node:crypto";
import { pinoHttp } from "pino-http";
import { logger } from "@/shared/logger/logger";

const REQUEST_ID_PATTERN = /^[0-9a-f-]{36}$/i;

export const requestLogger = pinoHttp({
  logger,
  genReqId: (req, res) => {
    const incoming = req.headers["x-request-id"];
    const id =
      typeof incoming === "string" && REQUEST_ID_PATTERN.test(incoming) ? incoming : randomUUID();
    res.setHeader("x-request-id", id);
    return id;
  },
  // 5xx → error. Everything else is debug, so production stays silent.
  customLogLevel: (_req, res, err) => (err || res.statusCode >= 500 ? "error" : "debug"),
});
```

## Levels

| Level | Use for |
| --- | --- |
| `fatal` | The process cannot continue (missing config at startup, uncaught exception). Log, then exit and let the process manager restart. |
| `error` | 5xx responses, failed background jobs. |
| `warn` | Security events (see below). |
| `info` | Lifecycle only: startup, listening, shutdown. |
| `debug` | Development diagnostics, including routine request lines. Off in production. |

Routine 4xx responses (404, 422, expired token) are normal client behavior, not
errors. They are never logged at `error` or `warn`. Security-relevant 4xx go through `logSecurityEvent` instead.

## 5xx errors — log once, at the boundary
- The central error-handling middleware is the **only** place a 5xx is logged.
  Services and repositories throw; they don't log and rethrow (that produces
  duplicate log lines for one failure).
- The error handler attaches the error to `res.err`. `pino-http` then writes a
  single `error` line on response finish, containing the stack, request id,
  route, and status.
- The client receives a safe, generic error body. Stack traces and internal
  details go to the log only (see Security Rules).
- When wrapping a lower-level error, pass it as `cause`
  (`new Error("Payment capture failed", { cause: err })`). pino's error
  serializer includes the cause chain's messages and stacks.

```ts
// shared/middleware/errorHandler.ts
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const status = getHttpStatus(err);
  if (status >= 500) {
    res.err = err instanceof Error ? err : new Error(String(err));
  }
  res.status(status).json(toSafeErrorBody(err, status));
}
```

- `process.on("uncaughtException")` and `process.on("unhandledRejection")` log
  at `fatal` with the error, then exit with a non-zero code.

## Security events
Suspicious activity is logged at `warn` through one helper, using a closed,
typed list of event names. Never call `req.log.warn` directly for a security
event — the helper keeps names consistent so alerts can match on them.

```ts
// shared/logger/securityEvents.ts
type SecurityEvent =
  | "auth.token_invalid"          // bad signature or malformed token — not merely expired
  | "auth.refresh_token_reused"   // a rotated/revoked refresh token was presented
  | "auth.rate_limited"
  | "auth.account_locked"
  | "authz.forbidden"             // role check failed
  | "authz.ownership_violation"   // requested a resource owned by another user
  | "csrf.rejected"
  | "input.rejected"              // oversized payload, disallowed file type
  | "webhook.signature_invalid";

export function logSecurityEvent(
  req: Request,
  event: SecurityEvent,
  details: Record<string, unknown> = {},
) {
  req.log.warn(
    { ...details, security: true, event, userId: req.user?.id, ip: req.ip, route: req.route?.path },
    "Security event",
  );
}
```

- Log the event where the check happens: general checks (auth, rate limiting,
  CSRF) in middleware, feature-specific checks (ownership) in the controller —
  matching Security Rules.
- One failed login is not suspicious. The rate limiter or lockout tripping is.
  Log the threshold being crossed, not every attempt.
- A new kind of suspicious activity gets a new name added to `SecurityEvent`.
  Don't reuse a close-enough name.
- Behind a reverse proxy, set Express `trust proxy` to the exact number of
  proxy hops. Otherwise `req.ip` is either the proxy's address or spoofable via
  `X-Forwarded-For`.

## What never goes in a log
- Passwords, tokens, cookies, API keys, OTP codes — including the value a user
  *attempted* in a failed login.
- Whole request or response bodies. Log the specific fields you need.
- Personal data beyond an internal `userId`: no emails, phone numbers, or names.
  IP addresses are personal data under some privacy laws (e.g. GDPR), which is
  a reason for a defined log retention period.

`redact` is a safety net, not the plan. Its wildcards match exactly **one**
level (`*.password` catches `body.password` but not `body.user.password`), so
the real protection is not putting sensitive objects in logs to begin with.
When a new sensitive field is introduced, add its path to `redact` in the same
change.

## Message style
- Data goes in the object, the message is a static string:
  `req.log.error({ err, orderId }, "Payment capture failed")`. Never build the
  message by concatenating values — static messages are searchable, and
  structured fields can't be used for log injection.
- Errors always go under the `err` key so pino's error serializer applies.
- In request context, use `req.log` (it carries the request id). Outside a
  request (jobs, startup), use `logger.child({ job: "name" })`.

## Request id
- Every response carries an `x-request-id` header. Every log line for that
  request carries the same id.
- An incoming `x-request-id` is accepted only if it matches the expected format;
  otherwise a new one is generated.
- The frontend `ApiError` exposes the request id so a user can quote it in a
  support request, which links their report straight to the 5xx log line.

## Testing
- Tests for security checks assert the matching security event was logged
  (inject a logger writing to an in-memory stream).
- Tests for the error handler assert a 5xx response body contains no stack
  trace or internal message.

# Testing Rules

Every feature should include tests.

- Feature tests co-located: `apps/<app>/src/modules/<feature>/<feature>.test.ts`.
- General/overall tests: `apps/<app>/src/shared/tests/`.

Testing priorities:
1. Business logic
2. API behavior
3. Edge cases
4. End-to-end

Tests cover: success cases, failure cases, invalid input, authorization issues.

Structure every test as Arrange / Act / Assert. When code changes, update its tests
in the same change.

---

# Before Shipping To Production

## Correctness & Testing
1. All tests pass (unit, integration, and e2e — not just unit).
2. Test coverage on critical paths (auth, payments, data mutations) — not just overall %.
3. Manually smoke-test the actual deploy build, not just `pnpm run dev`.
4. No `console.log`, `debugger`, or commented-out code left in.
5. No `.only()` or `.skip()` left in test files (silently disables tests).

## Security
6. Read docs/SECURITY.md / run through the checklist — and actually verify, don't just skim.

## Data & Migrations
7. DB migrations tested against a copy of prod-like data, not just an empty dev DB.
8. Migration rollback plan exists and is tested, not assumed.
9. Backups verified — not just "backups are configured" but "we've restored one recently."

## Performance
10. No N+1 queries introduced (check with query logging, not vibes).
11. Bundle size / Lighthouse score didn't regress on frontend changes.
12. Load tested if this touches a hot path (if you already have k6 in your toolkit, use it).

---

