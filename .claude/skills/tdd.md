# TDD — Test Driven Development

Reference: Kent Beck, *Test-Driven Development by Example*.

## The rule

**Red → Green → Refactor.** In that order. Always.

1. **Red**: write a failing test for the targeted behavior. It must fail for the right reason (no typo, no missing file — a real logic failure).
2. **Green**: write the *minimum* code to make the test pass. No over-engineering, no premature optimization.
3. **Refactor**: clean up while tests stay green. Remove duplication, rename, simplify.

One commit per cycle is ideal; at minimum Red + Green together, then Refactor separately.

## What this means concretely on this project

### Before writing a function / hook / API route

1. Create `xxx.test.ts` next to the target file
2. Write a first test describing the minimal behavior
3. Run `npm run test:watch` — verify it fails
4. Write the simplest implementation that makes it pass
5. Add a second test for an edge case
6. Iterate

### Before a bugfix

1. **Reproduce the bug with a failing test** — this is non-negotiable.
2. Fix the code until the test passes.
3. That test stays in the suite to prevent regression.

Concrete example: PR #14 fixed the breadcrumb falling to 404 on nested routes. The regression test (`it("renders a nested known route with full path check")`) was written **before** the fix and documented the expected behavior.

## What to test (descending priority)

1. **Pure business logic** (Zod schemas, utility functions, side-effect-free hooks): easy to test, high value.
2. **API routes** (validation, rate-limit, honeypot, error handling): critical product path.
3. **Custom hooks** with side-effects (useIsInView, useIsValidPath): via `@testing-library/react` + `renderHook`.
4. **Critical components** (ContactForm, breadcrumb): user interactions via `@testing-library/user-event`.

## What NOT to test

- Purely presentational components (a `<Divider />` that returns static JSX). One test = zero bugs caught.
- TypeScript types — the compiler does that.
- The internal implementation of a hook — test the contract (input/output), not internal state.

## Mocks — use sparingly

Rule: mock only what is **slow** or **non-deterministic**, never just to "go faster".

- **OK**: mock `Date.now()` via `vi.useFakeTimers()` to test a rate-limit.
- **OK**: mock `fetch` to isolate a component that calls an API.
- **NO**: mock a pure project function just to avoid importing it. Test the real thing.
- **NO**: mock a Zod schema. It is the heart of validation — test the real schema.

## Test structure

```ts
describe("checkRateLimit", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it("allows requests under the limit", () => {
    // Arrange
    const check = freshCheck();

    // Act + Assert
    expect(check("ip1", 3, 60_000).ok).toBe(true);
  });
});
```

- `describe` names the unit under test (function, component, hook).
- `it` describes **the expected behavior**, not the implementation. "blocks the request that exceeds the limit" > "returns false when count > limit".
- Arrange / Act / Assert — separate visually.
- One `it` = one behavior. No `it` that tests 5 things.

## Coverage

No rigid numeric target (80%, 100%, etc. = vanity). **Every bug reproduced by a test adds real value.**

Qualitative indicators:
- Every Zod schema has one test per validation rule (min, max, email, honeypot, optional)
- Every API route has tests for: happy path, failed validation, rate-limit, honeypot, missing config
- Every custom hook has a test for its public contract

## Dev workflow

```bash
npm run test:watch  # dev (Vitest watch mode)
npm test            # single run (CI)
```

Never commit if `npm test` fails. CI will block it anyway.
