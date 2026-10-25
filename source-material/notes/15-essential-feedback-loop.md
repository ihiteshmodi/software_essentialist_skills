# Lesson 15 — Metaphysical Essential: The Feedback Loop (Guesses & The Guess Points)
- **Source file:** 15) Metaphysical Essential The Feedback Loop (Guesses & The Guess Points).txt
- **Category:** essential-metaphysical
- **Topics:** feedback-loop, guesses, guess-points, feed-forward, refinement, testing, acceptance-criteria, code-first, subject-system-verification, tight-feedback-loops, problem-decomposition, systems-thinking, value-creation-system

## Summary
Everything in software development is a guess — edge cases, API calls, whether users even want the feature — and we'll make far more mistakes than successes. The feedback loop (feed forward, feedback, refinement) is the metaphysical essential for dealing with guesses. Three challenges: not knowing what guesses you're making, not knowing how to validate them, and loops that aren't tight enough. Tests are the maintainable way to keep validating an ever-growing number of guesses. The "guess points" apply systems thinking + abstraction + feedback to decompose problems into theoretical (problem, solution, architecture) and physical guess points, each a small input/output system with its own questions.

## Core ideas
- Example feature: **registration/sign-up** — loading spinner while waiting, success -> onboarding page. Frontend-only work already includes: present form, maintain form state, validate, marshal data, make request, display spinner (and make it work properly), present errors. These all become **acceptance criteria** to be confident in.
- We will make more mistakes than successes: bugs, errors, slightly-off requirements, tool snags.
- **Everything is one big guess**: edge cases, whether API calls reach the backend, whether users will use it.
- **Feedback loop = "the three ways"**: feed forward, feedback, refinement — make a guess, then a better guess. Foundational to many movements across the software development lifecycle [transcript: "lifestyle"].
- Hence: clarify before building, write tests, get feedback on whether we're building the right thing and whether users use it as intended.
- **Three challenges with guesses**:
  1. **Not knowing what guesses you're making** — e.g., code-first frontend devs unaware of the abstraction prism, code organization, abstraction layers. Abstraction layers are "buckets" for abstractions and for implementing guesses.
  2. **Not knowing how to validate a guess** — many devs only test features as a black box via end-to-end tests; need methods for more specific/in-depth testing -> **subject/system verification** essential.
  3. **Feedback loops not tight enough** — answers come late: write code, save, wait to compile, look. Time-consuming/costly; manual testing doesn't breed confidence and cost grows as code and team grow.
- First principle: we are making guesses (each feature is a guess); the only way to **maintainably** keep making more guesses is to cover that ground with **tests**.
- **Guess points** — best mental model for knowing what the guesses are, where and how to test. Same as the value creation system, viewed through systems thinking.
  - **Theoretical guess points**: **problem**, **solution**, **architecture** systems. Inside them are smaller systems that bring abstraction closer to code.
    - Problem guess point: vision, role, goal, capabilities (what someone should now be able to do). Its output is input to the solution guess point.
  - **Physical guess points** (past the architecture guess point): e.g., incoming adapter, [system applications — likely "application", inferred], stateful domain modeling, etc. Each has its own questions; answer mostly with tests.
- Benefits: makes problem decomposition straightforward; consistent language for communication within the community; "it's just systems thinking and it's just inputs and outputs".
- Not used immediately — need to move up the **phases of craftship** first; primary decomposition approach in the **value-first** phase.
- **FAQ in lesson**:
  - Where do physical guess points come from? Mostly heuristics; they come from the **stereotypical architecture** (responsibility-first phase).
  - Works for frontend? Yes — frontend patterns in **pattern-first** phase, then responsibility-first, then back to guess points in value-first.
  - More guess points? Possibly; it's Khalil's decomposition layout. E.g., **code review process** is another system with its own inputs, outputs, models/processes, environment.
- Systems thinking = tool to decompose systems at a meta level and communicate a consistent approach.

## Named frameworks / mental models
- **The Feedback Loop ("the three ways")**
  - Purpose: deal with the fact that everything is a guess.
  - Steps: 1) feed forward (make a guess) -> 2) feedback (learn if it was right) -> 3) refinement (make a better guess).
  - When to use: always — clarifying, testing, validating with users.
- **Three challenges of guesses**
  - Components: unknown guesses; unknown validation methods; loose feedback loops.
  - When to use: diagnosing why development feels slow/risky.
- **The Guess Points**
  - Purpose: systems-thinking problem decomposition framework applying abstraction + feedback loop.
  - Components: Theoretical — Problem (vision, role, goal, capabilities) -> Solution -> Architecture; Physical — incoming adapter, application [inferred], stateful domain modelling, ... Each guess point = a system with inputs, outputs, questions; answered mostly via tests.
  - When to use: decomposing problems, deciding what/where/how to test (primarily in value-first phase).

## Definitions
- **Guess** — anything we implement (a feature, an edge case, an API call, the belief users want it); unverified until feedback.
- **Feedback loop** — feed forward, feedback, refinement cycle.
- **Acceptance criteria** — the things we need to ensure are working (e.g., form state, validation, spinner, errors).
- **Code-first developer** — primarily thinks in code and solves problems from code.
- **Abstraction layers** — buckets for where we put abstractions while coding; also where we implement guesses.
- **Guess points** — the value creation system seen as systems (problem, solution, architecture, then physical ones), each posing questions to answer.

## Rules & heuristics
- Assume every decision is a guess; seek feedback.
- Know which guesses you're making (use abstraction prism/layers).
- Learn methods to validate guesses beyond black-box E2E tests.
- Tighten feedback loops; get answers early.
- Cover each guess (feature) with tests so guesses remain maintainable as the code/team grows.
- Output of one guess point feeds the next as input.

## Anti-patterns / mistakes called out
- Code-first development without awareness of abstraction prism/layers.
- Only testing via end-to-end black-box tests.
- Loose loop: write, save, wait to compile, eyeball.
- Relying on manual testing to validate features (cost grows with every change/new dev).

## Code discussed
Registration feature (frontend) broken into guesses/acceptance criteria — no code shown:
- present form, maintain form state, validate form, marshal data, make request, display spinner (working properly), present errors, navigate to onboarding page on success.

## Diagrams / visual models described
- Registration UI flow: form -> loading spinner -> onboarding page.
- Feedback loop cycle: feed forward -> feedback -> refinement.
- Guess points map: Theoretical (Problem -> Solution -> Architecture) -> Physical (incoming adapter, application [inferred], stateful domain modelling, ...), each a box with inputs/outputs; outputs chain into next inputs.
- Code review process as an additional system box.

## Notable quotes
- "Everything that we do in software development is one big guess."
- "We're going to make a lot more mistakes than we will successes."
- "You're going to make your guess, and then you're going to make a better guess again."
- "It's always been a guessing game."
- "When we implement a feature, that's a guess."
- "It's just systems thinking and it's just inputs and outputs."

## Cross-references
- Lesson 9 (systems thinking), Lesson 10 (value creation system), Lesson 14 (abstraction prism, abstraction layers, stereotypical architecture).
- Lesson 20 / 53 (subject/system verification).
- Lesson 65 (theoretical guess points), 71 (architecture guess point), 74 (stateful guess point), 52 (stateless guess point).
- "The three ways" (DevOps — *The Phoenix Project* / *DevOps Handbook*, inferred).
- Phases of craftship: pattern-first, responsibility-first, value-first.

## Fluff skipped
Greeting/outro.

## AI-era relevance hint
- AI-generated code is still a guess; tests are the feedback that turns it into verified value.
- Agents shorten the feed-forward step, so feedback (tests, CI, user validation) becomes the bottleneck and the key human investment.
- Guess points give a map for which questions humans must answer (problem/solution/architecture) before delegating physical guess points to agents.

## Coverage proof
- Lines read: 74 / 74
- Final line (verbatim): "now. That's going to do it. I'll see you in the next one. And as always, to Mastery. Mastery."
