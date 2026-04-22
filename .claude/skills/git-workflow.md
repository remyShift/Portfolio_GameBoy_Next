# Git workflow

## Absolute rule

**No co-author in commits.** Never add `Co-Authored-By: Claude ...` or equivalent. Commits carry only Rémy's signature.

## Commit message format

Strict **Conventional Commits**:

```
<type>: <short description in english, imperative>

<optional body — why, not what>
```

### Allowed types

- `feat:` new user-facing feature
- `fix:` bug fix
- `refactor:` reorganisation with no behavior change
- `chore:` maintenance task (deps, config, CI)
- `test:` tests only
- `style:` visual/CSS/formatting change
- `docs:` documentation

### Description

- Present imperative, in **English**: `feat: add the rate-limit on the contact API`
- No trailing period
- Under 70 characters

### Body

- Answers **why**, not what (the diff shows the what).
- Free format, blank line between header and body.
- Bullet list for multiple bumps or distinct points.

### Example

```
fix: breadcrumb displays 404 on nested routes

isKnown compares the segment alone (/fun-stats) instead of the full href
(/projects/fun-stats) to VALID_PATHS, so any route with 2+ levels
falls to 404. Check on href + regression test.
```

## Branches

Naming: `<type>/<short-kebab-case>`

```
feat/boot-animation
fix/breadcrumb-nested
refactor/code-cleanup
chore/deps-bump-react-19
test/vitest-setup
```

## PRs

- **One PR = one coherent plan step.** No mixing 5 workstreams.
- Title = commit format (a human must be able to skim it, in English).
- Description in 3 blocks: `## Summary` (bullet points), `## Test plan` (checklist), optional `## Follow-up` (what is not in this PR but comes next).
- **Stack when the previous PR is not merged**, branch from `main` otherwise. Check with `gh pr list --json number,state,mergedAt`.
- After the previous PR merges, retarget the base: `gh pr edit <n> --base main`.

## Commits = atomic

One commit = one coherent, buildable, testable change.

- No "WIP", "fix typo previous commit" — squash or amend before push.
- No giant commit mixing refactor + feat — split them.
- Every commit passes `npm run build` + `npm test`. A broken commit mid-branch makes bisect painful.

## Risky actions = confirmation required

Never:

- `git push --force` on `main`
- `git reset --hard` without checking state first
- `git rebase -i` on an already-pushed shared commit
- `rm -rf` on a git folder without checking `git status`

For rebases onto main on a pushed branch, use `git push --force-with-lease` only (never bare `--force`).

## Pre-commit hooks

This project has no pre-commit hook today. To consider in a future chore (husky + lint-staged):

- `npm run lint` on staged files
- `npm test` on impacted tests (vitest --related)

Until then: manual verification before `git push`.
