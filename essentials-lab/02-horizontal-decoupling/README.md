# Lab 02 · Horizontal Decoupling

> "It's not about where it comes from, it's about what it touches."
> "The skill that is going to give you more testing options is the skill of dependency inversion."

**The essential:** know the layers (domain ← application ← adapter contracts ← infrastructure), put every line in the right one, and decouple them with contracts.

## Smell (`before/src/server.ts`)
One Express handler parses HTTP, checks the registration deadline with `new Date()`, validates email and password, queries SQLite and inserts. The business rules have no home.

`before/tests/server.spec.ts` shows the cost: to check *any* rule you need HTTP (supertest), a real database, and a **global patch of the system clock** (`vi.setSystemTime`).

## Fix (`after/`)
| File | Layer | Touches |
|---|---|---|
| `modules/users/domain/email.ts`, `password.ts`, `user.ts` | Domain | nothing (pure) |
| `modules/users/registration/registerUser.ts` | Application (use case) | only contracts |
| `modules/users/usersRepository.ts`, `shared/clock.ts` | Adapter (contracts / roles) | — |
| `modules/users/infra/sqliteUsersRepository.ts`, `shared/infra/system.ts` | Infrastructure (actors) | DB, system clock, randomness |
| `modules/users/registration/registrationController.ts` | Infrastructure (incoming adapter) | HTTP |

Tests, one per level:
- `email.spec.ts`: level 1, pure examples with `it.each`.
- `registerUser.spec.ts`: level 3, in-memory repository + `FixedClock`. The deadline rule is tested by *choosing a time*, not by patching globals. Runs in milliseconds.
- `registrationController.spec.ts`: level 6, the controller only maps HTTP to the use case and back.
- `usersRepository.contract.spec.ts`: level 4, the same spec runs against the in-memory fake and SQLite, so the fake can't drift.

## What to notice
- The folder tree is still feature-first (lab 01). Layers are a *concern* inside the feature, not top-level folders.
- `User.create` returns an error value; it never throws for expected failures.
- The controller has no `if` about business rules; it has a status map.

## Exercises
1. New rule: "attendees from `@competitor.com` can't register". Which layer? Write the test first at that level.
2. Store `registeredAt` in a new column. Which tests must change? (Only the contract spec and the SQLite actor.)
3. Try writing exercise 1's test against `before/`. What do you need to set up?

Skill: `layering-and-composition`. Course: essentials-physical--horizontal-decoupling, architecture--code-placement.
