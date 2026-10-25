# Lesson 29 — FAQ: How to Break Down and Understand Large Codebases
- **Source file:** 29)  FAQ How to Break Down and Understand Large Codebases.txt
- **Category:** faq
- **Topics:** large-codebases, features, abstraction-prism, key-developer-use-cases, acceptance-tests, folder-structure, modules, capabilities, feature-folders, 80-20

## Summary
A developer's one main task is to keep delivering user/customer benefit, and the work itself is entirely on features. Using the abstraction prism (who, why, what -> features/how), you enter a large codebase looking for features: to discover, understand, test, add, change and execute them. If the codebase has no acceptance tests or no explicit "feature" concept, find features via asking people, tickets, or using the front-end app, then trace how each is realized in code. Ideally structure code so features are explicit: `src/modules/<capability>/<feature>` mirrored in `tests/` with acceptance tests. Focusing on features is the 80/20 of understanding a codebase.

## Core ideas
- One main task: keep user benefit and customer benefit while doing your work; your work is entirely on features.
- Abstraction prism: role's goal -> capabilities -> features. Who, why, what are theoretical; features are the "how".
- Have who/why/what clear first, then think about features.
- In a codebase you're looking for features: discover, test, add, change them.
- Features aren't just specific operations/API calls; they're user stories or more general.
- Hard to find features when there are no acceptance tests or the concept of a feature doesn't exist in the code.
- Ways to find them anyway: ask, look into tickets, ask what the most common features are, use the front-end app, then trace how the feature is realized in the codebase — reveals how the original developers thought.
- Recommendation: a layer of code with tests that represent features specifically.

## Named frameworks / mental models
- **Abstraction prism (as a codebase lens)**: who -> why -> what (capabilities) -> features (how). Developers operate at the feature level.
- **Key developer use cases** (for features): discover, understand, test, add, change, execute.
- **Feature-tracing technique** (for codebases without acceptance tests):
  1. Identify common features (ask people, read tickets, use the front-end app).
  2. Trace how each feature is realized in the code.
  3. Infer the developers' mental model from that.
- **Capability/feature folder structure** (see Code discussed).

## Definitions
- **Features** — user stories or more general units of user-facing behavior, not merely specific operations or API calls.
- **Modules** — folders representing high-level capabilities (same as capabilities in the abstraction prism).
- **Key developer use cases** — the tasks devs perform on features: discover, understand, test, add, change, execute.

## Rules & heuristics
- When entering a large codebase, hunt for features first — that's the 80/20.
- Mirror capability/feature structure in both `src` and `tests`.
- Place acceptance tests per feature in the tests folder.
- Structure within features (feature folders vs. operations) is flexible — a "delicate balance" of more vs. fewer entities.

## Anti-patterns / mistakes called out
- Codebases with no acceptance tests / no explicit concept of a feature — features become hard to find.
- Treating features as just individual API calls/operations.

## Code discussed
- Recommended folder structure (reconstructed from narration):

```text
// reconstructed from narration
src/
  modules/            # high-level capabilities (abstraction prism)
    <capability>/
      <feature>/      # feature folders (or operations inside)
  shared/
tests/
  modules/            # optional name, mirrors capabilities
    <capability>/
      <feature>/
        # acceptance tests for the feature
```

## Diagrams / visual models described
- Abstraction prism: goal -> capabilities -> features (who, why, what, how).
- Mirrored `src` / `tests` trees organized by capability then feature.

## Notable quotes
- "The work that you need to do is entirely on features."
- "If we were to maneuver into the code base, you are looking for features."
- "Features are not just specific operations, API calls. Features are user stories or more general."
- "Try to trace to find out how that feature is realized in the code base."
- "You need to find those features. You need to discover them, understand them, test them, add them, change them, execute them."

## Cross-references
- Lesson 14 (Abstraction Prism), Lesson 30 (design = discoverability of features), Lesson 35 (FAQ structuring codebases), key developer use cases (metaphysics).

## Fluff skipped
Garbled speech-to-text tail (last ~3 lines are nonsense transcription).

## AI-era relevance hint
- Agents navigate feature-organized codebases far better; capability/feature folders + acceptance tests act as a map for both humans and AI.
- Tracing a feature from UI to code is a great task to delegate to an agent, but you must know that "feature" is the unit to ask about.
- Acceptance tests per feature give agents unambiguous targets when changing behavior.

## Coverage proof
- Lines read: 30 / 30
- Final line (verbatim): "purpose on the tenido Easter So that you can thousands ofavedaru So that the one does deal with the 80-20 in terms that you could hold the solemnity."
