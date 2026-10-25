# Lab 01 · Vertical Slicing

> "If you can't see your features from the folder structure alone, there's a good chance maintainability is under pressure."

**The essential:** features are first-class in folders and tests. Modules (capabilities) → features → operations (commands and queries).

## Smell (`before/`)
```
src/controllers/  src/services/  src/models/  src/repositories/  src/utils/helpers.ts
tests/users.spec.ts  tests/tickets.spec.ts
```
- Package by infrastructure: "register", "buy tickets" and "view my orders" are invisible. `TicketService` holds purchasing *and* listing; `helpers.ts` holds validation, IDs and formatting.
- Adding a feature means touching four folders.
- Test names (`works`, `purchase and list`) say nothing about which features are covered.

## Fix (`after/`)
```
src/modules/users/registration/registerUser.ts      command
src/modules/tickets/purchasing/purchaseTickets.ts   command
src/modules/tickets/my-orders/getMyOrders.ts        query (returns the simplest shape the screen needs)
src/modules/<module>/domain/                        shared within the module
src/shared/                                         developer plumbing (ids)
tests/<module>/<feature>/<feature>.feature          one Gherkin spec per feature
tests/<module>/<feature>/<feature>.spec.ts          bound to the .feature with vitest-cucumber
tests/structure.spec.ts                             fails if a feature folder has no .feature spec
```

## What to notice
- The tree reads like a table of contents. An agent dropped here reaches the right file in one hop.
- Each `.feature` file is the oracle: rename a step and the bound spec fails.
- `purchaseTickets` asks the users module one question (`userExists`) instead of importing its internals.
- `structure.spec.ts` turns the convention into a check.

## Exercises
1. Add "cancel my order" (a command). Where do the folder, `.feature` and spec go? Check that `structure.spec.ts` forces the spec into existence.
2. Do the same in `before/`. Count the files you touch.
3. A colleague proposes `src/modules/tickets/handlers/`. Is `handlers` a feature? What would you call it?

Skill: `feature-first-structure`. Course: essentials-physical--vertical-slicing, architecture--structuring.
