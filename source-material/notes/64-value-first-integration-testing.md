# Lesson 64 — Value-First Testing Strategies for Integration Testing
- **Source file:** 64) [New] Value-First Testing Strategies for Integration Testing.txt
- **Category:** testing-practice
- **Topics:** testing-strategy, high-value-unit-test, high-value-integration-test, integration-testing, e2e, ideal-developer-workflow, controllers, use-cases, express, fakes, test-doubles, builders, incoming-adapter-tests, result-verification, communication-verification, roi, context-dependent

## Summary
Prompted by a community post on "TDD-induced design damage", Khalil argues against prescribing any single testing strategy for every scenario. Learn all the ways to test, then choose based on ROI for the situation. On a quick iPad diagram of a backend (Express → controllers → application/use cases → real or fake database), he compares three options. **A:** test from the application level including the real database. **B:** a "high value integration test" from the controllers (decoupled from Express) through to the real database. **C:** the familiar high-value unit test, from use cases with a fake database, combined with the Ideal Developer Workflow's end-to-end tests. For each he covers benefits, drawbacks, when to choose it, and the verification style it needs. His conclusion: no perfect strategy, it's entirely context-dependent (time, cost, quality needed).

## Core ideas
- Driving design only with tests leads to a code-first or "test-first best-practice-first" mindset. The course wants to move toward thinking about **value** and what actually matters.
- Prescribing one testing strategy "1000% in every scenario" isn't productive. Build skill in all approaches first, then pick a strategy when the situation comes up.
- The strategy in the post works well. The objection is to making any one strategy dogma.
- Baseline architecture (backend): Express (server) → relatively decoupled controllers → an app composed of many use cases → use cases configured to talk to a real **or** a fake database.
- **High-value unit tests + Ideal Developer Workflow (IDW)**: the IDW's end-to-end tests cover pretty much the whole system (confidence it all works together). High-value unit tests then cover many edge cases faster than E2E could.
- Real-database tests: real and no mocking, but setup is more complex (you need builders), and hundreds of edge-case tests become slow.
- The IDW sits "in the middle": decoupling for fast edge-case tests, plus full end-to-end integration confidence.
- If your role is backend-only, you can write backend-only end-to-end tests, as opposed to front-to-back E2E.
- **Incoming tests**: verify that API requests translate into the correct use-case calls without exercising the use cases. Use the four-layer E2E [transcript: "E2B"] test infrastructure with a test double standing in for the application. This requires decoupling "the concept of the entire application" from the app itself. It's useful when you have multiple APIs (GraphQL and REST) and want lightweight proof that endpoints still work.
- **Express is a system (the server)**. Decouple controllers from Express so you can test controllers directly by feeding them request objects.
- The controller → use case connection "has messed me up plenty of times".
- Anecdote: before adopting the IDW and FA²STR, Khalil wrote only high-value unit tests. At the next step "nothing's really working properly" because no infrastructure was touched.
- Verification style depends on option. Unit tests with fakes use **result verification** (inputs → outputs). Tests involving infrastructure need **communication verification** (indirect inputs/outputs via mocks, stubs, spies), which is more complex. It's arguable which is harder: mocks/stubs or real fixtures against a real database and infrastructure.
- Choose by ROI: time available, cost, and required quality. These vary drastically by project.

## Named frameworks / mental models
- **Option A — Application-level test including the real database**
  - Scope: from the application/use-case level down to the real database. Excludes controllers and the incoming layer.
  - Benefits: tests the database for real, no mocks.
  - Drawbacks: complex setup (builders needed). Slow at scale (hundreds of edge-case tests). If it's the **only** test type, it leaves "a lot of ground open for uncertainty": you don't know whether requests translate into the correct use-case calls.
  - When: when you need to be "very tactical and strategic" about squeezing out "just a bit more" confidence.
  - Complement: add **incoming tests** (API → correct use case, app replaced with a test double, verified via four-layer E2E infrastructure).
- **Option B — High-value integration test (controller → database)**
  - Scope: from the controller (incoming adapter/infrastructure) all the way to the outgoing infrastructure (database). Express isn't needed: decouple controllers from Express and feed them request objects.
  - What it verifies: requests are validated, data is extracted from them properly, then commands/queries run against the database.
  - Benefits: same as A, plus it covers the incoming uncertainty.
  - Drawbacks: same as A. Takes more time and "can get very expensive".
  - When: "a really nice middle ground". Good if you're strapped or don't want any E2E testing. Khalil says he likes it a lot.
- **Option C — High-value unit test (use cases + fake database) with IDW E2E tests**
  - Scope: use cases against fakes, plus IDW end-to-end tests for whole-system confidence.
  - Benefits: hundreds of concrete examples that run fast. An obvious fit for problems tested across lots of data (frontend or backend). Uses result verification.
  - Drawbacks: the tests that involve infrastructure need communication verification (mocks/stubs/spies) for indirect I/O, which is more complex.
  - When: Khalil's default. "If you're doing the ideal developer workflow… combine those two together, we're in really good shape."
- **Three types of subject verification** (reference): result, state, communication. Only result and communication are discussed here.
- **ROI-based strategy selection**
  - Inputs: time available, cost, quality needed, project type.
  - Examples: zero customers and just launching → "maybe I'll just chuck some end-to-end tests". Staff developer where things must be airtight → invest in an approach that allows many edge-case tests.

## Definitions
- **High-value unit test** — tests from the application/use-case level with use cases configured to use a fake database. Fast, many concrete examples.
- **High-value integration test** — Khalil's name for testing from the controller (incoming adapter) through to outgoing infrastructure (real database).
- **Incoming tests** — tests that verify API requests call the correct use cases, using a test double for the application instead of exercising the use cases.
- **Result verification** — checking inputs against outputs.
- **Communication verification** — verifying indirect inputs/outputs (interactions) via mocks, stubs, spies.
- **Express (as a system)** — the server. Something you can decouple controllers from.

## Rules & heuristics
- Learn every way to test before choosing. Don't adopt one strategy as dogma.
- Test strategy belongs to the value-first phase of craftship. Pick it for ROI, not habit.
- Decouple controllers from Express so you can test them with plain request objects.
- If you only test from the application level, add incoming tests so you know endpoints route to the right use cases.
- For real-database tests, get good at builders (fixtures) to manage setup complexity.
- Combine high-value unit tests with IDW E2E tests to get both edge-case coverage and whole-system confidence.
- Match investment to stakes: early product → a few E2E; mature, high-reliability system → broad edge-case coverage.

## Anti-patterns / mistakes called out
- Driving design purely with tests (code-first / test-first best-practice-first mindset). This is "TDD-induced design damage".
- Prescribing one testing strategy for every scenario.
- Writing only high-value unit tests and never touching infrastructure, so things don't work when integrated. Khalil made this mistake himself.
- Relying on application-level tests alone and never verifying the incoming request → use case translation.
- Hundreds of slow real-infrastructure tests with no faster layer.

## Code discussed
None. No code is shown and the discussion is architectural (a diagram only). The one concrete technique described is to decouple controllers from Express and call them directly with request objects, then assert that validation, data extraction and the resulting DB commands/queries behave correctly.

## Diagrams / visual models described
- A rough iPad sketch of a backend: **Express → controllers → app (composed of many use cases) → real DB or fake DB**. Test-scope boxes are overlaid for each option:
  - A: box around application/use cases + database.
  - B: box from controllers (incoming adapter) through to the database (outgoing).
  - C: box around use cases with a fake database, plus IDW E2E across the full stack.
- An "incoming tests" slice: API layer → test double of the application, verified through the four-layer E2E test infrastructure.

## Notable quotes
- "We're trying to get away from thinking about solving problems with code."
- "I just have a problem with prescribing one testing strategy 1000% in every scenario."
- "You need to be aware of all the ways you can test."
- "Express here is acting as a system. It's the server."
- "This tiny little connection here has messed me up plenty of times."
- "There is no perfect testing strategy. It's going to be entirely context dependent."
- "If I have zero customers and I'm just launching something, maybe I'll just chuck some end-to-end tests."

## Cross-references
- Lesson 26 (Ideal Developer Workflow)
- Lesson 53 (Three types of verification: result, state, communication)
- Lesson 73 (Hand-written spies for indirect outputs)
- Lesson 78 (Builders for fixtures)
- Lesson 17 (Horizontal decoupling: decoupling controllers from Express)
- Lesson 31 (FAQ: getting better at testing)

## Fluff skipped
Greeting, comments about image quality ("need more pixels"), sign-off.

## AI-era relevance hint
- Agents will happily generate hundreds of tests. Picking which *layer* those tests target (unit with fakes vs controller-to-DB vs E2E) is the ROI judgment that stays human.
- Tests from controllers through the real DB catch the "tiny little connection" bugs that AI-written glue code often gets wrong.
- Context (customers, stakes, budget) decides the strategy. It's the kind of input a human has to feed the agent explicitly.

## Coverage proof
- Lines read: 76 / 76
- Final line (verbatim): "I'm in here. As always, see you in the next one and to mastery, my friends. Patience"
