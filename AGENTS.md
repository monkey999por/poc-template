# Repository Guidelines

## Project Structure & Module Organization

- `apps/web`: Remix app (Node >=20). `apps/docs`: Next.js docs. `apps/web-temp`: temporary Next.js app. `apps/api`: Cloudflare Worker (Hono + Wrangler).
- `packages/ui`: Shared React components. `packages/eslint-config`: Shared ESLint configs. `packages/typescript-config`: Shared TS configs.
- Root tooling: `turbo.json`, `pnpm-workspace.yaml`, `package.json` (scripts), `.vscode/`.

## Build, Test, and Development Commands

- Install: `pnpm install`
- Dev all: `pnpm dev` (turborepo, non-cached, runs app dev servers).
- Dev one: `pnpm --filter web dev` | `pnpm --filter docs dev` | `pnpm --filter api dev` (Wrangler).
- Build all: `pnpm build` (turbo pipeline; respects cache). Start Next/Remix apps with app scripts (`pnpm --filter docs start`, `pnpm --filter web start`).
- Lint: `pnpm lint` (ESLint via shared config). Types: `pnpm run check-types`. Format: `pnpm format`.
- Deploy (API): `pnpm --filter api deploy` (Cloudflare Workers via Wrangler).

## Coding Style & Naming Conventions

- Language: TypeScript across apps and packages.
- Formatting: Prettier 3 (`pnpm format`). Use 2-space indent; do not hand-format.
- Linting: Use `@repo/eslint-config` presets (`base`, `react-internal`, `next-js`). Fix warnings before pushing.
- Naming: React components `PascalCase` (e.g., `Button.tsx`); hooks `useX`; files/directories `kebab-case` except components.

## Testing Guidelines

- No test runner is configured yet. When adding tests:
  - Unit: prefer Vitest or Jest; name files `*.test.ts(x)` co-located or in `__tests__/`.
  - E2E: consider Playwright for web apps.
  - Add a turbo task `test` in each package and wire a root script `pnpm test`.

## Commit & Pull Request Guidelines

- Use Conventional Commits: `feat(scope): ...`, `fix: ...`, `chore: ...` (see history: `feat(create-turbo): ...`).
- PRs: clear description, linked issues, and screenshots for UI changes. Ensure `pnpm lint` and `pnpm run check-types` pass. Mention affected packages/apps (`apps/web`, `packages/ui`, etc.).

## Security & Configuration Tips

- Secrets: never commit `.env*`. Provide per-app env files locally; Wrangler manages Cloudflare secrets.
- Node/pnpm: root requires Node >=18; `apps/web` targets Node >=20. Use `pnpm@10` per `packageManager`.
- Caching: turbo caches builds; include `.env*` in inputs only when necessary.
