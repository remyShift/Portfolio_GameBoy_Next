# Portfolio GameBoy — Claude Instructions

Personal portfolio built with Next.js 15 / React 19 / TypeScript / Tailwind 3 / Zod / Resend.
Deployed on Vercel at `remy-shift.dev`.

## Collaboration rules

- **No co-author in commits.** Never add `Co-Authored-By: Claude ...` or equivalent. Commits are signed by Rémy alone.
- **Plan → architecture → implementation.** Never skip steps. For any non-trivial change, align on the approach before touching code.
- **TDD is non-negotiable for any new code** (see `.claude/skills/tdd.md`).
- **Commit format**: Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, `test:`, `style:`, `docs:`), description in French, short imperative.
- **One PR = one plan step.** Stack if the previous PR isn't merged, otherwise branch from main.

## Code standards

This project follows the Software Craft principles detailed in `.claude/skills/`:

- [`clean-code.md`](.claude/skills/clean-code.md) — Clean Code, SOLID, SRP, Law of Demeter, no Primitive Obsession, zero duplication
- [`naming.md`](.claude/skills/naming.md) — Naming matters: verbs for actions, intent-revealing names, no `Helper`/`Utils`/`Data`/`Manager`
- [`tdd.md`](.claude/skills/tdd.md) — Red/Green/Refactor, tests before implementation
- [`git-workflow.md`](.claude/skills/git-workflow.md) — Commits, stacked PRs, branches

These skills are not decorative. A refactor or feature that violates them gets rejected in review.

## Tech stack

- Next.js 15 App Router, React 19, TypeScript strict
- Tailwind 3 (Tailwind 4 migration deferred)
- Zod for validation (env, API, forms)
- React Hook Form + `@hookform/resolvers/zod`
- Resend 6 for email (contact form)
- Sonner 2 for toasts
- Vitest + @testing-library/react for tests
- ESLint 8 (flat-config ESLint 10 migration planned)

## Areas that demand rigor

- **Contact form + API route** (`src/app/contact/api/send/route.tsx`): Zod env validation at boot, in-memory rate limiting, honeypot, never log sensitive data.
- **Metadata / SEO** (`src/app/*/page.tsx`): every route defines its own `title`, `description`, `canonical`. No generic fallback.
- **A11y**: `aria-hidden` on decorative elements, `alt=""` on decorative images, one semantic `<h1>` per page.

## Things NOT to do

- Mock the DB or external APIs in integration tests — we test real behavior.
- Use `any`, `as unknown`, or `@ts-ignore` without a justifying comment.
- Create files in `src/utils/` or `src/helpers/` — those folders are banned (see `naming.md`).
- Commit without `npm run build` and `npm test` passing locally.
- Create "WIP" or "fix typo" commits mid-PR — squash or amend.
- Add comments that explain **what** the code does (redundancy). Only `// Why:` comments on non-obvious invariants are acceptable.
