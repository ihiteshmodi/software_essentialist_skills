# Lesson 25 — Physical Essential: Deployment & Delivery
- **Source file:** 25) Physical Essential Deployment & Delivery.txt
- **Category:** essential-physical
- **Topics:** deployment-pipeline, continuous-integration, constraints, negative-value, high-value-unit-tests, acceptance-tests, e2e, staging, git-hooks, husky

## Summary
Deployment & delivery is the final (12th) essential: it ensures all tests and verification work actually gate what ships, so we don't ship negative value (bugs, defects). Borrowing "constraints" from *The Design of Everyday Things*, the goal is a single enforced path to production — the deployment pipeline — which guarantees a minimum quality standard and replaces manual testing that doesn't scale with feature count. The ideal pipeline has three phases: commit (lint, build, high-value unit tests), acceptance (E2E tests against production-like infra), and deploy (manual or automated). Start with a minimum pipeline (commit + deploy). Local hooks like Husky are a supplementary feedback loop, not a constraint, because any dev can disable them.

## Core ideas
- Purpose: make sure the tests we write are actually used before shipping code.
- Never ship **negative value** to users: bugs, defects, anything that takes users "out of benefit".
- Constraints (from *The Design of Everyday Things*, seven stages of action): limit the set of possible actions. Ideal constraint = a single deployment path to production.
- Deployment pipeline's purpose: ensure code meets a minimum standard of quality. World-class companies use them.
- Manual testing/walkthroughs are fine initially but become a big deal and slow things down as feature count grows.
- Flow: commit to source control -> CI server picks it up -> runs through pipeline phases.
- Acceptance-phase E2E tests test the same things as high-value unit tests, but exercise the entire system as a user would, automated.
- Additional phases are possible: security validation, performance validation; pipeline speed can be continually improved; some orgs employ DevOps people solely to improve it — "the runway before code gets out to users".
- Concerns involved: tools, testing strategy, scripts, organization, environment variables.
- Mostly contained within the deployment and delivery guess points — little overlap with other areas.
- How to deploy is a theoretical guess made ahead of time; during the walking skeleton the task is just to figure out how to deploy.
- Right after the walking skeleton: set up proper scripts, run code cleanly in various environments, make sure composition works, confirm testing strategy (subject/system verification, boundaries covered), then embed the tests into the pipeline.

## Named frameworks / mental models
- **Ideal deployment pipeline phases**
  1. **Commit phase** — lint (code looks standard), build, run tests — ideally **high-value unit tests** that test features purely and fast (not just front-end component unit tests, though those can be included).
  2. **Acceptance phase** — set up infrastructure mirroring production; run E2E tests as acceptance tests.
  3. **Deploy phase** — manual or automated deploy.
  - When to use: every project that ships to users.
- **Minimum deployment pipeline** — commit phase + deploy phase only (acceptance/staging is more involved; add later).
- **Constraints (Design of Everyday Things)** — design the process so doing the wrong thing is virtually impossible; single source of truth for "is it shippable?".

## Definitions
- **Negative value** — bugs, defects, anything that takes users out of benefit.
- **Constraint** — something that limits you from all the possible sets of things you can do.
- **Deployment pipeline** — a constraint enforcing a single deployment path to production, ensuring code meets a minimum quality standard.
- **High-value unit test** — a pure, very fast test of the application's features (from the perspective of the app's internals), giving a lot of confidence.
- **Acceptance phase** — pipeline phase running E2E tests on production-like (staging) infrastructure.

## Rules & heuristics
- Enforce one path to production; make shipping negative value virtually impossible.
- Put feature-level, fast, pure tests (high-value unit tests) in the commit phase.
- Run E2E/acceptance tests against infra that mirrors production.
- Start minimal (commit + deploy), then add acceptance, security, performance phases.
- Know how you plan to deploy before building (theoretical guess); figure it out concretely during the walking skeleton.
- Local pre-push hooks (Husky) = optional extra feedback loop, never the source of truth.

## Anti-patterns / mistakes called out
- Relying on manual testing/walkthroughs as feature count grows.
- Only running front-end component unit tests rather than feature-level tests.
- Relying on local hooks (e.g., Husky) as the quality gate — any developer can turn them off locally and ship broken code.

## Code discussed
None (tooling mentioned: CI server, linting, build, Husky).

## Diagrams / visual models described
- Pipeline diagram: Source control commit -> CI server -> [Commit phase: lint -> build -> high-value unit tests] -> [Acceptance phase: production-like infra -> E2E acceptance tests] -> [Deploy: manual/automated] -> users.
- Optional extra boxes: security phase, performance phase.

## Notable quotes
- "We do not want to ship negative value to our users, and I classify that as bugs, defects, anything that is going to take the users out of benefit."
- "Constraint is something that limits you from all the possible sets of things you can do."
- "The entire purpose of a deployment pipeline is to ensure that our code is up to a minimum standard of quality."
- "This is the runway before code gets out to users."
- "We want to make it virtually impossible for someone to ship negative value."
- "There's nothing stopping any developer from just turning that off locally."

## Cross-references
- *The Design of Everyday Things* (Don Norman) — seven stages of action, constraints.
- Lessons 16–20 (vertical slicing, horizontal decoupling, composition, subject/system verification), Lesson 24 (Walking Skeleton).
- Best-practice-first phase (where this is built).
- Continuous Delivery concepts (inferred; book not named).

## Fluff skipped
Greeting, transition to "skills" section, sign-off.

## AI-era relevance hint
- With agents producing large volumes of code, a CI pipeline is the non-bypassable constraint that stops negative value; local checks an agent (or dev) can skip aren't enough.
- Fast, feature-level high-value unit tests in the commit phase give agents quick, meaningful feedback loops.
- Humans should own the pipeline design and test boundaries; that's where quality judgment lives.

## Coverage proof
- Lines read: 47 / 47
- Final line (verbatim): "always, two minutes street."
