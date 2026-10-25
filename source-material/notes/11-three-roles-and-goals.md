# Lesson 11 — The 3 Roles & Their Goals: Why Software Development Is So Hard
- **Source file:** 11) The 3 Roles & Their Goals Why Software Development Is So Hard.txt
- **Category:** metaphysics
- **Topics:** roles, goals, users, customers, developers, game-theory, key-developer-use-cases, features, scalability, negative-value, contending-elements, assistive-elements

## Summary
Using game theory as a lens, Khalil explains software development as a team game with three roles — users, customers, developers — each with different goals. Users want time saved/enriched; customers want to increase or protect revenue; developers must keep both in benefit simultaneously while keeping their own work (key developer use cases against features) easy over time. Every extra goal is a constraint that shrinks the set of possible actions, which is why it is hard. Scalability is the word for achieving all three goals at once; its enemies (bugs, regressions, slowing features, hard-to-change code) are "negative value".

## Core ideas
- **Game theory**: study of how/why we make decisions among active agents pursuing goals/resources. **Strategy** appears when there are multiple roles and goals contending.
- Chess = two-player game (goal: checkmate). Software development = **team sport**, but with contending elements.
- **Contending elements** (make winning hard): status/structure/maintainability of the codebase, the market, the competition, how much time we have, skill level of developers on the team.
- **Assistive elements** exist too (covered next lesson: the 4 pillars).
- **Three roles and goals**:
  1. **Users** — get time back or have time enriched.
  2. **Customers** — increase revenue or protect revenue (make money, save money).
  3. **Developers** — help users and customers succeed (keep them in benefit) *and* set things up so it's easy to continually carry out developer use cases. Developers get compensated when users and customers stay in benefit.
- Goal: create **software artifacts of value** benefiting users and customers at the same time.
- Developers work against **features** (ties to the vertical slicing essential). Features are the building blocks of software artifacts of value.
- **Key developer use cases** (this lesson's list): discover and understand features (esp. in a new codebase), test, extend/change, add new, debug features.
- Need "extremely effective mental models" that align with all three goals at once.
- **Constraints shrink options**: "make $1,000 by end of month" has many paths; add "as a clown technician" / "as a landscaper" and the option set narrows. Devs face three goal sets combined into one.
- **Scalability** = the apex of all three goals.
- **Negative value** (moving from benefit to a bad place) to watch out for:
  - bugs, defects, regressions
  - missing requirements
  - incomplete implementations
  - features taking longer and longer to build
  - codebases harder and harder to change over time
- Need mental models "closely aligned with reality" to avoid negative value.

## Named frameworks / mental models
- **The 3 Roles & Their Goals**
  - Purpose: explain competing objectives in software.
  - Components: User (time saved/enriched), Customer (increase/protect revenue), Developer (keep both in benefit + keep own use cases easy over time).
  - When to use: evaluating any technical decision against all three goals.
- **Game theory lens (contending vs assistive elements)**
  - Purpose: see dev as a strategic game.
  - Components: roles, goals, contending elements (codebase quality, market, competition, time, team skill), assistive elements (4 pillars — next lesson).
- **Key developer use cases (against features)**
  - Purpose: define what developers actually do.
  - Components: discover, understand, test, extend/change, add, debug features.
  - When to use: judging whether code/architecture makes developers' work easy.
- **Constraints narrow the solution space** ($1,000 by end of month example)
  - Purpose: explain why multiple simultaneous goals make things hard.

## Definitions
- **Game theory** — the study of how and why we make decisions among active agents trying to reach goals.
- **Customer goal** — increase revenue or protect revenue.
- **Developer goal** — keep user and customer in benefit at the same time, while making it easy to continually do the key developer use cases.
- **Scalability** — the word that best describes achieving the apex of all three roles' goals.
- **Negative value** — moving from benefit to a bad place (bugs, regressions, slowing delivery, etc.).

## Rules & heuristics
- Do your work against features.
- Make it easy for yourself and other developers to discover and understand what features exist.
- Every decision should serve user + customer + developer goals simultaneously.
- Adopt mental models closely aligned with reality to avoid negative value.

## Anti-patterns / mistakes called out
- Features taking longer and longer to build (Khalil: "This one hits close to home").
- Codebases getting harder to change over time.
- Bugs, defects, regressions, missing requirements, incomplete implementations.

## Code discussed
None

## Diagrams / visual models described
- Three roles image: Users (save time / enrich time), Customers (increase / protect revenue), Developers in the middle doing key developer use cases against features to produce software artifacts of value.
- Game board: roles + goals + contending elements + assistive elements.
- Constraint funnel: broad goal ($1,000) -> narrowed by role constraint (landscaper).

## Notable quotes
- "Strategy gets introduced when you have multiple roles, multiple goals, and they're all contending to get to their goals."
- "If we think of software development and everyone involved, it actually is a team sport."
- "They are made from features."
- "Scalability is the word that best describes what it is we're trying to achieve as the apex of all three of those goals."
- "All of this is negative value."

## Cross-references
- Lesson 10 (user goal: time saved/enriched).
- Lesson 12 (assistive elements = 4 pillars).
- Lesson 16 (vertical slicing essential — features).

## Fluff skipped
Greeting/outro; "clown technician" aside.

## AI-era relevance hint
- AI speeds up code output but can accelerate negative value (regressions, hard-to-change code) if developer-use-case ease is ignored.
- Balancing user, customer and developer goals is a strategic trade-off agents cannot own; humans must set constraints.
- Organizing work around features gives agents clear, testable units.

## Coverage proof
- Lines read: 43 / 43
- Final line (verbatim): "that in the next one. And as always, to mastery."
