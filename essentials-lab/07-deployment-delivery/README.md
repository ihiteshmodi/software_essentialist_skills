# Lab 07 · Deployment & Delivery

> "The entire purpose of the deployment pipeline is to ensure code is up to a minimum standard of quality."
> "We make it very hard to ship negative value to users."

**The essential:** one path to production. The pipeline is a constraint: every change passes the commit phase (fast, high-value tests) and the acceptance phase (E2E in a production-like environment) before a gated deploy.

## Smell (`before/.husky/pre-commit`)
A local hook is the only gate. `git commit --no-verify` skips it, a fresh clone doesn't have it, and agents skip hooks just like people do. Manual QA walkthroughs don't scale as features grow.

## Fix
| Phase | Where | What runs |
|---|---|---|
| 1 · Commit phase | `.github/workflows/pipeline.yml` job `commit-phase` | `npm ci`, `typecheck`, `test:unit` (all levels 1–4 + in-process acceptance; seconds) |
| 2 · Acceptance phase | job `acceptance-phase` | build the release candidate image, start it with `docker compose --wait`, run `test:e2e` against it, tear down |
| 3 · Deploy | job `deploy` | only on `main`, after both phases, through the `production` environment (add required reviewers in GitHub for a manual gate) |

`scripts/pipeline-local.sh` (`npm run pipeline:local`) runs the same phases on your machine and stops at the first failure. Without Docker it falls back to the skeleton on plain Node and says so. Deploy only runs when you set `DEPLOY=yes`.

The workflow lives at `essentials-lab/.github/workflows/`. GitHub runs it when `essentials-lab` is the repository root. It is checked with `actionlint`:
```bash
docker run --rm -v "$PWD:/repo" --workdir /repo rhysd/actionlint:latest .github/workflows/pipeline.yml
```

## What to notice
- Fast things early, slow things later. E2E in a pre-commit hook is so painful that everyone turns it off.
- The commit phase gives most of the confidence *because* labs 02–05 made the core testable without infrastructure.
- `deploy.sh` is a placeholder; the gates around it are the point.

## Exercises
1. Make the acceptance tests fail (e.g. change a step) and run `npm run pipeline:local`. Confirm deploy never runs.
2. Add a lint step to the commit phase.
3. Add a "smoke test after deploy" job that hits `/health` on the deployed URL.

Skill: `walking-skeleton-delivery`. Course: essentials-physical--deployment-delivery.
