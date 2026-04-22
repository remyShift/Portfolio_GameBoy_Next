# Clean Code — project standards

References: Uncle Bob (Clean Code), Kent Beck (Simple Design), Robert C. Martin (SOLID), Eric Evans (DDD).

## SRP — Single Responsibility Principle

A module, component, or function = **one reason to change**.

Warning signs:
- A React component over 150 lines
- A function over 30 lines
- A file importing from 5 different domains
- "And" in the description: "this component renders the form **and** handles the API **and** validates"

Fix: split into several units. Each unit has a name that describes its single responsibility.

## Law of Demeter

Only talk to your direct neighbours. An object should not know the internals of another.

```ts
// NO — deep chain
user.profile.address.city.toUpperCase()

// YES — encapsulation
user.getCityUppercase()
```

Warning signs: `a.b.c.d`, deep destructuring in props, nested ternaries on `pathname.startsWith().includes()`.

## Simple Design (Kent Beck, in order)

1. **Passes the tests**
2. **Reveals intent** (naming)
3. **Zero duplication** (DRY, applied with judgment)
4. **Minimal** — nothing extra

If a rule is violated, walk back up the list to find where to fix it.

## No Primitive Obsession

A domain concept is not a raw `string`. Build a dedicated type.

```ts
// NO
function sendEmail(from: string, to: string, subject: string)

// YES
type Email = string & { __brand: "Email" };
function sendEmail(from: Email, to: Email, subject: string)
```

On this project: `Project`, `ContactFormValues`, route types, etc. are already typed. Never regress to `any` or raw `string`.

## Zero duplication

Three similar occurrences = extract. **Not before two, not after four.** Kent Beck's rule.

Be careful: apparent duplication is not always real duplication. Two identical Tailwind class strings today that represent two different concepts — don't extract.

## Comments = deodorant

A comment usually signals a naming or structural problem, not a best practice.

**Banned:**
- Comments that paraphrase the code (`// increment i`)
- Comments describing the call site (`// used by ProjectsPage`)
- Comments that belong in the PR description (`// fixes bug from ticket #123`)
- Multi-line JSDoc docstrings on trivial functions

**Allowed (rare):**
- `// Why: <non-obvious reason>` on a business invariant, required hack, external constraint
- `// TODO(YYYY-MM-DD): <action>` with a date and specific action

## No dead code

- Unused functions → remove
- Commented-out variables → remove
- Unused imports → remove (ESLint should catch these)
- Debug `console.log` → remove before commit
- Paths in `validPaths.ts` that no longer exist → remove

## No `any`, no `as`, no `@ts-ignore`

Strict TypeScript is there to be used. If you are tempted to reach for any of the three:

1. First try to improve the upstream typing
2. If an external API forces a cast, use `as` with a `// Why: <externally mistyped API>` comment
3. Never `any`. Use `unknown` if truly unknown, then narrow with Zod.

## Errors

- No silent `try/catch` swallowing
- Validation errors → return a clean message to the user
- System errors → logged with context, never propagated raw to the client
- Fail fast on config (see `src/lib/env.ts` for the Zod-at-boot pattern)

## Quick review — pre-PR checklist

- [ ] No `any` introduced
- [ ] No comment that paraphrases the code
- [ ] No file over 200 lines (otherwise split)
- [ ] No function over 30 lines (otherwise extract)
- [ ] No hard-coded string that should live in `constants/` or a type
- [ ] No obvious duplication (same Tailwind classes, same logic)
- [ ] Tests added or updated if behavior changed
- [ ] `npm run build` + `npm test` green locally
