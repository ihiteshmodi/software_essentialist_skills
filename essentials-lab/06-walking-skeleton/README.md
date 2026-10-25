# Lab 06 · Walking Skeleton

> "We want to get the most bare-bones version of something that is valuable to somebody shipped in front of them."
> "We don't actually know how long it's going to take us to get something deployed."

**The essential:** build the thinnest valuable slice through every main component (UI → server → database), deploy it to a production-like environment, and prove it with an automated E2E acceptance test, **before** building features.

## Smell (no `before/` code; it's a timeline)
| Week | Components first |
|---|---|
| 1 | React components with mocked data |
| 2 | Node API with no database |
| 3 | Connect the database; schema mismatches |
| 4 | Try to deploy: CORS errors, env vars, ports, container issues. Deploy date unknown |

Agents make weeks 1–2 seductively fast. Every infrastructure surprise lands last.

## Fix (this folder)
| Piece | File |
|---|---|
| UI | `public/index.html` (a form + `fetch`) |
| Server | `src/app.ts` (Express: `/health`, `POST /users`, `GET /users?email=`) |
| Database | `src/users.ts` (SQLite via `node:sqlite`, a file under `DATA_DIR`) |
| Runtime | `src/main.ts` runs under plain Node (no build step) |
| Deployable | `Dockerfile` + `docker-compose.yml` (healthcheck, data volume) |
| Acceptance test, 4 layers | `tests/users/registration/registration.feature` (1) → `registration.acceptance.ts` (2–3: runner + steps that read like the scenario) → `tests/drivers/registrationDriver.ts` (4: the only code that knows HTTP) |

The **same acceptance spec** runs in two environments; only the driver's URL changes:
- `registration.spec.ts`: in-process server + in-memory SQLite (part of `npm test`).
- `registration.e2e.spec.ts`: against the running container (`npm run test:e2e`, set `APP_URL`).

## Run it
```bash
docker compose -f 06-walking-skeleton/docker-compose.yml up -d --build --wait
APP_URL=http://localhost:3000 npm run test:e2e
open http://localhost:3000
docker compose -f 06-walking-skeleton/docker-compose.yml down -v
```
Without Docker: `PORT=3000 node 06-walking-skeleton/src/main.ts`.

## What to notice
- The skeleton is crude on purpose (no layers yet). Its job is to prove the path and the pipeline. Labs 01–05 show the structure you grow into.
- Building it surfaced a real snag: Vitest sets `process.env.BASE_URL` itself, so the driver uses `APP_URL`. That's the kind of thing you want to discover on day 1.

## Exercises
1. Swap `RegistrationApiDriver` for a browser page-object driver (e.g. Playwright) without touching the `.feature` or the steps.
2. Add the next thinnest slice, "buy tickets", end to end. Write the scenario first.

Skill: `walking-skeleton-delivery`. Course: essentials-physical--walking-skeleton, testing--acceptance.
