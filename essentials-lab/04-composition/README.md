# Lab 04 · Composition

> "The way in which we link together our dependencies is incredibly important."
> "We need to link things together almost like a Russian doll."

**The essential:** wire collaborating abstractions deliberately, in one composition root. Everything else receives its collaborators through constructors and never knows the environment.

## Smell (`before/`)
- `db.ts` picks the database at **import time** from `NODE_ENV`.
- `payments.ts` checks `NODE_ENV` and a secret `DECLINE_ALL` flag inside the function.
- `tickets.ts` imports both directly.

`before/tests/tickets.spec.ts` must mutate environment variables and **re-import the module graph** (`vi.resetModules`) just to change one collaborator.

## Fix (`after/`)
```
main.ts         reads process.env once → plain config values
compose.ts      the only place that chooses actors per environment (test: in-memory; development: SQLite; production: HTTP payments)
application.ts  ApplicationAPI: everything the app can do (users.register, tickets.purchase)
web/server.ts   delivery mechanism; *uses* the application, doesn't build it
modules/…       use cases with constructor-injected contracts
infra/actors.ts every actor that touches the world
```
Tests:
- `compose.spec.ts`: the **same behavior tests run against two environments** (`describe.each(['test','development'])`), and one actor is swapped with an override (a declining payment gateway). No env flags.
- `webServer.spec.ts`: level-6 incoming test with a fake `ApplicationAPI`.
- `architecture.spec.ts`: the rules are checked: only `main.ts` reads `process.env`; only `compose.ts` constructs actors; no use case imports the DB driver.

## What to notice
- The application interface is the "modules as mini-applications" idea: REST today, CLI or GraphQL tomorrow, same app.
- Start with a hand-written root ("poor man's DI"). Move to a DI container only when this file gets messy.

## Exercises
1. Add a `staging` environment that uses SQLite and the HTTP payment gateway against a sandbox URL. Which files change?
2. Add a CLI (`cli.ts`) that registers a user from the command line using `compose()`.
3. Break a rule (read `process.env` in a use case) and watch `architecture.spec.ts` catch it.

Skill: `layering-and-composition` (composition root, application interface). Course: essentials-physical--composition, architecture--app-interface.
