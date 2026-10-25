# Lesson 31 — FAQ: How to Get Better at Testing (Using the 12 Essentials)
- **Source file:** 31) FAQ How to Get Better at Testing (using the 12 Essentials).txt
- **Category:** faq
- **Topics:** testing, testing-roadmap, phases-of-craftship, TDD, red-green-refactor, parameterization, input-output-testing, e2e, non-flaky-tests, decoupling, hexagonal-architecture, high-value-unit-tests, integration-tests, subject-system-verification, state-verification, communication-verification

## Summary
Testing is one of the four intertwined pillars and requires building some mastery in all of them. Khalil's roadmap follows the phases of craftship: code-first — build basic backend operations (purer than front end); best-practice-first — TDD mechanics with examples/parameterization (input-output tests), then non-flaky E2E tests using four layers of abstraction; pattern-first — decouple core from infrastructure (hexagonal/clean/onion) to unlock high-value unit and integration tests, stubs, mocks, and state/communication verification; value-first — choose testing strategies. The core skill: isolate exactly what you want to test by moving responsibilities to the right place. Goal: highest confidence for least work.

## Core ideas
- Khalil's early testing struggles: testing things that didn't need testing (Sequelize models [transcript: "SQLized models"]), flaky E2E tests.
- Testing, design, architecture, strategy = 4 intertwined pillars; you need some of all to do any one.
- Why backend first: it's "raw" — no front-end abstractions/tools/thought leadership — lets you think purely about code structure and testing.
- All tests fundamentally are input-output tests; E2E just tests the entire system "as a function".
- E2E tests are incredible when designed with appropriate levels of abstraction — need **four layers of abstraction** to do E2E properly.
- Need tests to run in different environments -> pull in composition.
- Decoupling core code from infrastructure code gives a large number of testing options.
- Test type naming depends on which system boundaries you include (systems thinking via guess points):
  - Application -> outgoing all the way to the database and used services = **integration test**.
  - Application + domain logic, up to but not including the database = **unit test** (pure core code).
- Foundational skill: become the person who can isolate what you want to test, moving concerns/responsibilities to the correct place so you can decouple and then test.
- Ultimately: highest confidence with the least work based on where you currently are.

## Named frameworks / mental models
- **Testing roadmap by phase of craftship**
  1. **Code-first** — build basic operations on the backend (anything).
  2. **Best-practice-first (part 1)** — TDD mechanics (red-green-refactor), start from examples, parameterization; simple input-output tests.
  3. **Best-practice-first (part 2)** — non-flaky E2E tests with four layers of abstraction; test the entire system as a function; run tests in different environments (composition).
  4. **Pattern-first** — decouple core from infrastructure (hexagonal / clean / onion — "all different ways to say the same thing"); high-value unit tests, high-value integration tests, stubs, mocks, controlling edge cases; subject/system verification; communication (behavior) verification; state verification.
  5. **Value-first** — decide testing strategies (ideal developer workflow and variations).
- **System boundaries define test type** — pick which systems to include; name follows (integration vs. unit).
- **Three verification types** (referenced): result/system, state, communication/behavior.

## Definitions
- **Input-output test** — feed input, check output; applies to functions and to the whole system.
- **E2E test** — input-output testing of the entire system as a function.
- **Integration test** — testing from the application through outgoing infrastructure (database, services).
- **Unit test** — testing application + domain logic, up to but not including the database; pure core code.
- **High-value unit/integration tests** — enabled by decoupling core from infrastructure.

## Rules & heuristics
- Learn testing on the backend first.
- Master TDD mechanics before architecture-level testing.
- Start tests from examples; use parameterization.
- Design E2E tests with proper abstraction layers to avoid flakiness.
- Decouple core from infrastructure to gain testing options.
- Place responsibilities correctly so you can isolate the subject under test and "forget everything else".
- Optimize for highest confidence per unit of work.

## Anti-patterns / mistakes called out
- Testing things that don't need testing (e.g., ORM/Sequelize models).
- Flaky E2E tests; deciding E2E "isn't worth it" or offloading all to QA.
- Learning testing through front-end tooling/thought leadership noise first.

## Code discussed
None (no code; architecture styles named: hexagonal, clean, onion).

## Diagrams / visual models described
- Systems diagram: incoming (UI/web) -> application -> domain -> outgoing (database, external services); drawing a boundary around application->outgoing = integration test; around application+domain excluding DB = unit test.
- Roadmap: code-first -> best-practice-first -> pattern-first -> value-first with testing skills at each.

## Notable quotes
- "Testing sucked for me."
- "You need to build up a little bit in all of them in order to do even one of them."
- "End to end tests are incredible when they are designed with the appropriate levels of abstraction."
- "Now I'm going to make you test the entire system as a function."
- "We need to decouple core code from infrastructure code."
- "Isolate exactly what it is you would like to test and forget everything else."
- "You just want the highest level of confidence to have to do the least amount of work based on where you currently are."

## Cross-references
- Lesson 12 (4 Pillars), Lesson 17 (Horizontal Decoupling), Lesson 19 (Composition), Lesson 20 & 53 (Subject/System Verification, 3 types), Lesson 26 (Ideal Developer Workflow), Lesson 64 (Value-first integration testing), Lesson 73 (spies).
- Hexagonal / Clean / Onion architectures.

## Fluff skipped
Personal anecdote framing; garbled speech-to-text tail (last ~3 lines).

## AI-era relevance hint
- Agents can write many tests fast; choosing boundaries (what to isolate, unit vs. integration) is the judgment that makes those tests valuable rather than brittle.
- Core/infra decoupling gives agents fast, deterministic test loops without spinning up infra.
- Non-flaky E2E with abstraction layers keeps AI-driven refactors from breaking tests superficially.

## Coverage proof
- Lines read: 51 / 51
- Final line (verbatim): "develop."
