# The art of naming

Reference: *Clean Code* chap. 2 (Uncle Bob), extended with React/TypeScript conventions.

A good name replaces a comment. A bad name lies about intent and makes the code hostile.

## Hard rules (non-negotiable)

### Zero `Helper`, `Utils`, `Manager`, `Data`, `Common`

These words mean nothing. If a module is called `userHelper`, ask yourself **what it actually does** and name it by its intent.

```
NO  src/utils/Global/breadcrumbLinks.tsx
YES src/lib/navigation.tsx  (export buildBreadcrumb)

NO  dateHelper.ts
YES formatRelativeDate.ts

NO  userDataManager.ts
YES userProfileRepository.ts
```

### Functions = verbs

A function *does* something. Its name starts with a verb.

```
YES buildBreadcrumb(), sendContactEmail(), getClientKey(), checkRateLimit()
NO  breadcrumb(), email(), clientKey(), rateLimit()   (look like data)
```

### Variables and types = nouns

A variable is a *thing*, not an action.

```
YES const project: Project = ...
YES type ContactFormValues = ...
NO  const buildProject = projectFromApi   (variable named like a function)
```

### Booleans = predicates

Prefix with `is`, `has`, `can`, `should`, `will`.

```
YES isValid, hasPermission, canSubmit, shouldRetry
NO  valid, permission, submit, retry
```

## Precision > brevity

A short ambiguous name is worse than a long explicit one.

```
NO  const d = new Date()                           // d = ?
NO  const data = fetchUser()                       // data of what?
YES const submittedAt = new Date()
YES const user = fetchUser()
```

Exceptions: classic iterators (`i`, `j`) and trivial lambda parameters (`x => x * 2`).

## No invented abbreviations

```
YES pathname, currentUser, contactFormSchema
NO  pn, cu, ctctFrmSch
```

Standard domain abbreviations are fine: `url`, `api`, `id`, `db`, `env`.

## Don't lie about the type

```
NO  const userList: Set<User>        // lies — it is not a list
YES const users: Set<User>
YES const userList: User[]
```

## Conventions by file type

| Element | Convention | Example |
|---|---|---|
| React component | PascalCase | `ContactPage.tsx` |
| Hook | camelCase with `use` | `useIsInView.ts` |
| Utility function | camelCase, verb | `buildBreadcrumb.ts` |
| Type | PascalCase | `Project`, `ContactFormValues` |
| Top-level constant | SCREAMING_SNAKE_CASE | `VALID_PATHS`, `RATE_LIMIT` |
| Zod schema | camelCase + `Schema` | `contactFormSchema` |
| Feature folder | kebab-case | `fun-stats/` |

## Test file naming

```
YES navigation.test.tsx   (next to the file under test)
YES contactForm.test.ts
NO  test-navigation.ts
NO  navigationSpec.tsx
```

## Exports

**One export per file** when the file represents a primary concept (component, hook, function, major type). Barrel re-exports (`index.ts`) only to group a **public module API**, never to flatten the tree.

## Warning sign: the generic suffix

If you find yourself adding `Type`, `Interface`, `Impl`, `Service`, `Object` to tell two identifiers apart, one of them is poorly named.

```
NO  UserType, UserService, UserImpl
YES User (the type), UserRepository (the domain concept)
```
