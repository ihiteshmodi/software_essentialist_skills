# Lesson 33 — FAQ: How to Learn Frontend Architecture
- **Source file:** 33) FAQ How to Learn Frontend Architecture.txt
- **Category:** faq
- **Topics:** frontend architecture, phases of craftship, pattern first, responsibility first, RDD, object stereotypes, React hooks, testing beyond E2E

## Summary
Khalil explains where and how frontend architecture is taught in the course. It is mostly covered in the Pattern First phase (with some in Best Practice First): first learn backend patterns and use them, then look at the frontend patterns and the various kinds of state. The key insight is that frontend and backend architecture are "the same thing" because architectures are stereotypical. The Responsibility First phase adds bespoke design skills (the three-step RDD process) needed when frameworks such as React force awkward code shapes.

## Core ideas
- There is a lot of conflicting information about frontend architecture. The course deals with it by teaching the **backend patterns first**.
- Learning order:
  1. Pattern First phase: learn backend patterns, use them to build things a few times, and see how they work together.
  2. Then look at the frontend: frontend patterns, the various types of state, and how they "click" together.
  3. You will notice the frontend "looks a lot like the back-end". They are the same thing because architectures are stereotypical ("as textures are stereotypical" in the transcript).
- Responsibility First phase: learn **bespoke design**, meaning you design abstractions yourself instead of only applying patterns.
- Frameworks can force code into strange shapes. React hooks, for example, require a particular structure or they won't work. You then need to either:
  - scrap things and design them yourself, or
  - wrap the "ugly bits and pieces" behind your own designed abstractions.
- Few people structure frontend code so they can write robust tests "that can go further than just doing end-to-end tests". Expect to hit problems here.
- If you master the three-step RDD process, you "pretty much know how to design anything" and don't need to think in patterns much anymore.

## Named frameworks / mental models
- **Phases of craftship** (as referenced): Best Practice First → Pattern First → Responsibility First.
  - Purpose: sequence the learning. Frontend architecture comes after backend patterns are familiar.
- **Stereotypical architecture**: architectures are made of stereotypical roles, so frontend and backend architectures map onto each other.
  - When to use: to transfer backend pattern knowledge to the frontend.
- **Three-step RDD process** (Responsibility-Driven Design): a bespoke design process. The steps are not detailed in this lesson.
  - When to use: when frameworks or patterns don't fit and you need to design or wrap abstractions yourself.

## Definitions
- **Bespoke design** — designing your own abstractions rather than applying off-the-shelf patterns. Taught in Responsibility First.

## Rules & heuristics
- Learn backend patterns before frontend patterns. The frontend reuses the same stereotypes.
- When a framework's rules push your code into a strange shape, wrap or isolate those parts behind your own designed abstractions.
- Structure frontend code so it can be tested with more than end-to-end tests.

## Anti-patterns / mistakes called out
- Letting framework rules (e.g., React hooks structure) dictate your code design. Khalil says it "will make you do strange stuff in your code".
- Relying only on end-to-end tests for the frontend because the code isn't structured for anything else.

## Code discussed
None

## Diagrams / visual models described
None

## Notable quotes
- "The reality is they are the same thing because [architectures] are stereotypical."
- "You're going to need to know how to sometimes scrap things and design them out yourself or instead wrap surround some of these ugly bits and pieces."
- "If you can learn how to do that you pretty much know how to design anything."
- "You don't really have to think in patterns that much either anymore."

## Cross-references
- Phases of craftship: Best Practice First, Pattern First, Responsibility First
- Lesson 38 (How Will I Learn RDD), which covers object stereotypes and stereotypical architecture
- Lessons 90, 92 (Frontend Architecture Q&As 1 and 2)
- Responsibility-Driven Design; React hooks

## Fluff skipped
Closing filler ("you you").

## AI-era relevance hint
- AI agents readily produce framework-idiomatic code such as hook-heavy React. Recognizing when framework rules distort the design, and wrapping them, is a human judgment call.
- Seeing frontend and backend as the same stereotypical roles lets you review AI output in either layer with one mental model.
- Bespoke RDD design is the skill that remains when patterns and generators run out.

## Coverage proof
- Lines read: 17 / 17
- Final line (verbatim): "and yeah we'll we'll do the pattern stuff in pattern first for the most part you you"
