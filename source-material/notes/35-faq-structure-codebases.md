# Lesson 35 — FAQ: How to Learn to Structure My Code Bases
- **Source file:** 35) FAQ How to Learn to Structure My Code Bases.txt
- **Category:** faq
- **Topics:** project structure, abstraction prism, key developer use cases, feature discoverability, monolith, monorepo, best practice first

## Summary
Khalil says to think about project structure through the lens of the abstraction prism. Structure should support the key developer use cases: discovering features in the codebase, working on them, testing them, extending them and removing them. In the Best Practice First phase the course structures a monolith inside a monorepo (frontend and backend in one project) and shows how to share code between them.

## Core ideas
- Judge project structure with the **abstraction prism**.
- Structure exists to serve the **key developer use cases**: work on features, test, extend and remove features. That requires being able to **discover** features in the codebase.
- The Best Practice First phase is the main phase for project structuring:
  - structure the project as a **monolith**
  - use a **monorepo** with frontend and backend in the same project
  - learn to **share** code between frontend and backend

## Named frameworks / mental models
- **Abstraction prism**: the lens for deciding structure. Khalil calls it "the key thing here".
- **Key developer use cases**: discover, work against, test, extend and remove features. Use them as the criteria a good structure must satisfy.

## Definitions
- **Monorepo (as used here)** — frontend and backend in the same project, with shared code between them.

## Rules & heuristics
- A good structure makes features discoverable and easy to test, extend and remove.

## Anti-patterns / mistakes called out
None

## Code discussed
None

## Diagrams / visual models described
None

## Notable quotes
- "Thinking in terms of project structure through the lens of the abstraction prism."
- "We're going to need to be able to discover them in the code base."
- "Study the abstraction prism, because I think that is the key thing here."

## Cross-references
- Lesson 14 (Abstraction / abstraction prism)
- Best Practice First phase
- Lesson 16 (Vertical Slicing, inferred relevance to feature-based structure)

## Fluff skipped
Garbled sign-off/thanks at the end.

## AI-era relevance hint
- AI agents navigate and edit a codebase better when features are discoverable, so structure is effectively an interface for agents as well as humans.
- "Can I remove this feature cleanly?" is a quick check for reviewing AI-generated structure.

## Coverage proof
- Lines read: 9 / 9
- Final line (verbatim): "is the key thing here. Thank you. Thanks,budry. Thanks, both of them. Thanks, guys. Fucking thank you. Thanks. Take care. Bakit."
