# Lesson 30 — FAQ: How to Get Better at Design (Using the 12 Essentials)
- **Source file:** 30) FAQ How to Get Better At Design (using the 12 Essentials).txt
- **Category:** faq
- **Topics:** design, discoverability, understanding, key-developer-use-cases, abstraction-prism, project-structure, patterns, stereotypical-responsibilities, metacognition, empathy, cohesion, design-of-everyday-things

## Summary
Design is about discoverability (how easily you find what you're looking for — features) and understanding, so you and others can add, change and test features. To get better: structure projects by the abstraction prism (the way requirements come to exist, get tested and implemented), use patterns everyone conceptually understands (patterns are shared mental models with stereotypical responsibilities), and practice metacognition plus empathetic thinking about whether others will understand your code. Read *The Design of Everyday Things* for the seven stages of action — your code is an interface for other developers.

## Core ideas
- Design = discoverability + understanding.
- What you're trying to find: features (key developer use cases) -> then understand, add, change, test them.
- Good design = your ability to find things and do what you need, and making that easier for others.
- Structure projects based on the abstraction prism — the most intuitive way for people to find things.
- Use patterns conceptually understood by everyone (said twice for emphasis).
- Patterns are mental models: abstractions and shortcuts for solving problems; they have stereotypical responsibilities.
  - Redux store -> event listener/handler/coordinator type thing.
  - React components -> present the view (though responsibilities sometimes get mixed up).
- At project start, ensure you and the team have clarity on which patterns will be used.
- Getting better at design = metacognition (understanding why you understand things) + empathetic thinking (will someone else understand what this is, how to use it, why I'm using it, and be able to do their tasks?).
- Internal awareness develops external awareness simultaneously.
- Cohesion: if it's hard to cohesively understand the purpose of code and you can't tether it to patterns, people will struggle to pick it apart.
- Every developer designs interfaces — not just UIs; your code is the interface for another developer's work.

## Named frameworks / mental models
- **Design = Discoverability + Understanding**, measured against key developer use cases (find, understand, add, change, test features).
- **Patterns as shared mental models** with stereotypical responsibilities — use them to make code instantly understandable.
- **Metacognition + empathetic thinking** loop: why do I understand this? -> would someone else? -> adjust.
- **Seven stages of action** (from *The Design of Everyday Things*) — recommended study; not detailed here.
- **Khalil's summary checklist:**
  1. Structure by the abstraction prism.
  2. Develop metacognition/awareness.
  3. Establish the patterns (team-wide clarity).
  4. Study the stages of action.

## Definitions
- **Design** — about discoverability and understanding.
- **Discoverability** — how easy it is to find the things you're trying to find.
- **Patterns** — mental models; abstractions and shortcuts to understanding how to solve problems.
- **Metacognition** — understanding why you understand things.

## Rules & heuristics
- Organize the project by abstraction prism (capabilities -> features).
- Establish the pattern set at the start of a project; ensure team clarity.
- Use conventional patterns with well-known responsibilities; don't mix responsibilities.
- Ask while coding: will someone else understand what this is, how to use it, why it's used?
- Keep code cohesive and tethered to known patterns.

## Anti-patterns / mistakes called out
- "Loosey goosey" code whose purpose can't be cohesively understood or mapped to patterns.
- Mixing up stereotypical responsibilities (e.g., React components doing more than presenting the view).

## Code discussed
None (patterns referenced: Redux store, React components).

## Diagrams / visual models described
None explicitly drawn (abstraction prism referenced).

## Notable quotes
- "Design is about discoverability and understanding."
- "You want to make sure you're using patterns that are conceptually understood by everyone."
- "Patterns themselves are mental models."
- "Getting better at design is really a practice of metacognition and developing awareness."
- "Your code is the interface for someone else to do their work."
- "It's the most human thing, really."

## Cross-references
- *The Design of Everyday Things* (Don Norman) — seven stages of action; human-computer interaction.
- Lesson 14 (Abstraction Prism), Lesson 29 (finding features), Lesson 25 (constraints from same book), cohesion (Lesson 67), stereotypes/RDD (Lessons 23, 38).

## Fluff skipped
Aside about studying the book in university.

## AI-era relevance hint
- Conventional, well-known patterns make AI-generated code predictable and reviewable; agents also follow established conventions better.
- Empathetic "will the next reader understand this?" now includes AI readers — discoverable structure improves agent context retrieval.
- Metacognition is the human edge: knowing *why* code is understandable lets you steer agents toward clarity.

## Coverage proof
- Lines read: 28 / 28
- Final line (verbatim): "stuff there, but it's the most human thing, really."
