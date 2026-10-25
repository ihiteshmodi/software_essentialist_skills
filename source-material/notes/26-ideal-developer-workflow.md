# Lesson 26 — The Ideal Developer Workflow: How to Work Consistently
- **Source file:** 26) The Ideal Developer Workflow - How to Work Consistently.txt
- **Category:** workflow
- **Topics:** ideal-developer-workflow, 12-essentials, guess-points, abstraction-prism, theoretical-guesses, broad-stroke-architecture, testing-strategy, walking-skeleton, outer-loop, inner-loop, nth-looping, high-value-tests, value-first

## Summary
The ideal developer workflow integrates the 12 essentials into one repeatable process that moves through the value creation system / guess points from the theoretical to the physical, on any side of the stack. Steps: (1) clarify the theoretical guesses (non-negotiable), (2) broad-stroke architecture incl. patterns, components and testing strategy, (3) build/test/deploy a walking skeleton, (4) feature work using nth looping — outer-loop (feature/customer) tests plus inner-loop (developer) tests, then fill the remaining gaps (~20% of work). Not every step is possible every time, but it's an ideal to measure how far off you are. Practiced in the value-first phase of craftship.

## Core ideas
- Many ways to kick off a project (from code, from database...); the 12 essentials are what carry you through the guess points to working software in users' hands.
- Workflow works on any side of the stack.
- You won't be able to do all steps all the time; some are non-negotiable — step 1 is.
- Khalil's standard answer to Discord problem questions: "first, we need to clarify the theoretical guesses."
- Before implementing anything, clarify everything in the abstraction prism's theoretical space: vision, role, goal, capabilities ... down to concrete examples.
- First steps apply to new projects but also to new features on existing projects (clarify theory, know the broad-stroke architecture, know how you verify features, have infra to run high-value tests — as E2E or high-value unit/integration tests).
- Any time a new abstraction is introduced, write new tests.
- Value of the skill: **consistency** — something to always come back to; an ideal (never perfect) to measure how far off you are; integrates all 12 essentials.

## Named frameworks / mental models
- **Ideal Developer Workflow**
  - Purpose: consistent, effective way to kick off project/feature work using the 12 essentials.
  - Steps:
    1. **Clarify the theoretical guesses** (non-negotiable) — abstraction prism: vision, role, goal, capabilities -> concrete examples.
    2. **Broad-stroke architecture** — relatively high level but clarify patterns, architectural components, and the **testing strategy** (how to verify features work; how tests are embedded in the deployment pipeline).
    3. **Build, test and deploy a walking skeleton** — a slice of functionality run all the way to deployment, even if tiny.
    4. **Feature work** — nth looping: outer loop tests + inner loop tests; then fill in the gaps (~20% of the remaining work) before shipping and moving to the next feature.
  - When to use: every new project and every new feature.
- **Nth looping (outer loop / inner loop tests)** [transcript: "nth looping"]
  - Outer loop tests: verify the feature works; for the customer (e.g., high-value tests at the application level).
  - Inner loop tests: things developers need to know about — logic that isn't a feature but could cause problems if untested (e.g., a validation object for a User or JobPosting concept).
- **Abstraction prism** (referenced): vision -> role -> goal -> capabilities -> ... -> concrete examples.

## Definitions
- **Ideal developer workflow** — a way to put the 12 essentials together to move from the theoretical to the physical, based on what's learned from experts.
- **Outer loop tests** — tests verifying the feature works, for the customer.
- **Inner loop tests** — tests focused on things developers need to know about (internal logic).
- **High-value tests** — tests that verify features; can run as E2E, high-value unit, or integration tests (detailed in pattern-first).

## Rules & heuristics
- Never skip clarifying the theoretical guesses.
- Get concrete examples before thinking about architecture.
- Decide the testing strategy and how it plugs into the deployment pipeline as part of the architecture step.
- Deploy a walking skeleton before feature work.
- Write new tests whenever you introduce a new abstraction.
- Start feature work with outer-loop tests, then inner-loop tests; the final ~20% is filling gaps with other tests.
- Use the workflow as a yardstick for how far off the ideal you are.

## Anti-patterns / mistakes called out
- Jumping into implementation (starting from code or database) before theoretical clarity (inferred from framing).
- Leaving internal logic (e.g., validation objects) untested because "it's not a feature".

## Code discussed
- Example described: outer-loop high-value tests at the application level; inner-loop tests for an object doing validation on `User` or `JobPosting`. No code shown.

## Diagrams / visual models described
- Workflow as 4 sequential steps: Clarify theoretical guesses -> Broad-stroke architecture -> Walking skeleton -> Feature work.
- Feature-work diagram: outer loop (application-level high-value tests) wrapping inner loops (tests for new abstractions), then "gap filling" tests.
- Value creation system / guess points traversed theoretical -> physical.

## Notable quotes
- "Some of them are non-negotiable."
- "First, we need to clarify the theoretical guesses."
- "Anytime we mention a new abstraction, we're going to want to write some new tests."
- "It is an ideal and ideals are never perfect. But having this as something that we could use to determine and know how far off we are is incredibly powerful."
- "One of the most reasons why this is useful is consistency."

## Cross-references
- Lesson 10 (Value Creation System), Lesson 14 (Abstraction Prism), Lesson 15 (Feedback loop / guess points), Lessons 13–25 (12 essentials), Lesson 24 (Walking Skeleton), Lesson 25 (Deployment pipeline), Lesson 27 (FA²STR abstracts this workflow).
- Phases of craftship: code-first -> best-practice-first -> pattern-first -> responsibility-first -> value-first (practiced in value-first).
- Outer/inner loop resembles double-loop TDD from GOOS (inferred).

## Fluff skipped
Greeting, rhyme joke, "don't fret" reassurance, sign-off.

## AI-era relevance hint
- Step 1 (theoretical clarity -> concrete examples) is exactly what an agent needs as a spec; skipping it yields plausible-but-wrong code.
- Outer-loop acceptance tests written/approved by humans give a trustworthy target that agents iterate against in the inner loop.
- A fixed workflow gives consistent checkpoints for reviewing agent output.

## Coverage proof
- Lines read: 46 / 46
- Final line (verbatim): "the next one. And as always, to mystery."
