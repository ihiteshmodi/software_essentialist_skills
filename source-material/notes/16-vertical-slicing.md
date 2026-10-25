# Lesson 16 — Physical Essential: Vertical Slicing
- **Source file:** 16) Physical Essential Vertical Slicing.txt
- **Category:** essential-physical
- **Topics:** vertical-slicing, features, operations, commands, queries, folder-structure, package-by-feature, package-by-infrastructure, transaction-script, discoverability, acceptance-tests, maintainability

## Summary
Vertical slicing is the first physical essential: a way to decompose work into manageable chunks aligned with how developers actually work — against features. Khalil contrasts it with three code-first habits (packaging by infrastructure, "transaction script" thinking, starting from React components) that hurt discoverability and maintainability. He distinguishes **features** (customer-valuable, made of user stories spanning many API calls) from **operations** (low-level slices: commands or queries, effectively API calls). Features should be first-class citizens in code structure and are the most valuable thing to test. The lesson is a high-level overview; deeper treatment comes in Best Practice First (feature slicing) and Pattern First (read/write path separation, CQRS-like models).

## Core ideas
- Vertical slicing = decomposing the work into manageable chunks ("vertical slices of functionality").
- Tied to the course's definition of **design = discoverability and understanding**: it must be easy to find what you need in the code.
- "If you can't see your features from the folder structure alone," maintainability is likely under pressure.
- The mental models in your head show up in your code, and other developers read those models back out of it — so how you *think* about work (scripts vs. features) matters.
- **Key developer use cases** = discover, understand, add, change, remove, test, and debug **features**. Structure code to serve these.
- Chunk your work, modules, features, and operations into vertical slices.
- Features come from the customer and customer needs; features have user stories describing how someone moves through and experiences the system.
- The essential works because it matches reality: developers work against features.
- Most valuable thing to test = the **features**, not individual operations (e.g. not `createUser`/`editUser` in isolation).
- Once features are obtained from the **theoretical guess points**, you move to the **physical guess points**, where acceptance tests get written.
- Later: **high-value unit tests** and **value integration tests** let you test features without going through the front end, isolating internals (front end or back end).
- Isolation is sometimes necessary by context — e.g. a front-end dev whose back end isn't ready yet must mock/simulate the missing back-end behavior to test features.

## Named frameworks / mental models
- **Vertical slicing (physical essential)**
  - Purpose: decompose work and structure code around features so they are discoverable and testable.
  - Components: **Feature** (customer value, user story, spans many operations) → composed of a sequence of **Operations** (commands that change the system / queries that read from it; = API calls).
  - When to use: always, when organizing a codebase and deciding the unit of work/testing.
- **Key developer use cases**: discover, understand, add, change, remove, test, debug features — the lens for judging structure.
- **4 Pillars** (architecture, design, testing, strategy): vertical slicing touches several of them; it sits in the "grid/matrix of topics that matter."
- **Guess points**: theoretical guess points yield features → physical guess points are where acceptance tests are written.

## Definitions
- **Vertical slicing** — decomposing work into manageable chunks; chunking modules, features, and operations into vertical slices of functionality.
- **Feature** — something valuable to the customer; has business value; described by a user story that takes someone through an experience from A to B, involving many API calls.
- **Operation** — lower-level slice that either changes the system (command, e.g. `create user`) or gets information from it (query, e.g. `get user`, `get profile details`); effectively an API call. Operations in sequence build up a feature.
- **Packaging by infrastructure** — organizing files/features by the type of infrastructure they are (code-first habit); hurts maintainability, design, discoverability, understanding.
- **Transaction script approach (to thinking)** — thinking of work as "just adding code," as if working against a bunch of tiny scripts; not effective for maintainability.
- **Design** — (as referenced) discoverability and understanding.

## Rules & heuristics
- Make features first-class citizens in both code-base structure and how you approach work.
- Features should be visible from the folder structure alone.
- Prioritize testing features over testing individual operations.
- Self-check questions: Can you see the features in your code base? Could someone else identify where features are? How easy/hard would that be?
- When dependencies (e.g. back end) aren't ready, isolate them and mock/simulate behavior to still test features.

## Anti-patterns / mistakes called out
- **Packaging by infrastructure** (folders by technical type) — hurts design, discoverability, understanding.
- **Transaction-script thinking** — just adding code to tiny scripts.
- **Starting work from React components** — "not the worst thing," but not aligned with the key developer use case (working against features), so it hurts maintainability.
- Testing operations as if they were the most valuable unit.

## Code discussed
None (only example names: user story "register and sign up for a premium package on a membership website"; operations `create user`, `get user`, `get profile details`, `edit user`).

## Diagrams / visual models described
- Feature → sequence of operations (commands/queries) as vertical slices cutting through the system (inferred visual: user story spanning multiple API calls).
- Grid/matrix of 4 pillars × topics, with vertical slicing related to several cells.
- Guess points diagram: theoretical guess points producing features, then physical guess points where acceptance tests are written.

## Notable quotes
- "If you can't see your features from the folder structure alone there's a good chance maintainability is under pressure."
- "It is the internal representations that we have in our minds, the mental models that we're working off of, that's what is going to show up in our code."
- "The key developer use cases are to discover, understand, add, change, remove, test and debug features."
- "Features are the thing that is most valuable for the customer."
- "The most valuable thing we can test is actually going to be the features themselves."
- "Can you see the features in your code base?"

## Cross-references
- Lesson 12 (4 Pillars: architecture, design, testing, strategy); design = discoverability & understanding.
- Lesson 15 / guess points (theoretical → physical).
- Lesson 17 (Horizontal Decoupling), Lesson 20 (Subject/System Verification — high-value unit/integration tests).
- Phases of craftship: Best Practice First (main vertical-slicing work), Pattern First (read/write paths, read/write models, one-directional event-driven architecture).
- Transaction Script (Martin Fowler's pattern name, inferred).

## Fluff skipped
Greeting, "go slice it" pep, closing "thank you".

## AI-era relevance hint
- Feature-sliced structure gives AI agents (and reviewers) a clear place to put and find changes; package-by-infrastructure scatters one change across many folders, increasing agent error surface.
- Specifying work as features/user stories (not "add code") is the right prompt granularity for agents, and feature-level acceptance tests are the best oracle to verify agent output.

## Coverage proof
- Lines read: 46 / 46
- Final line (verbatim): "there are lots of great reasons for that But I won't get into them just now So let's continue along to the next essential Thank you Thank you"
