# Lesson 23 — Theoretical Essential: Strategic Design
- **Source file:** 23) Theoretical Essential Strategic Design.txt
- **Category:** essential-theoretical
- **Topics:** strategic-design, architecture, architecture-guess-point, non-functional-requirements, architectural-components, responsibility-driven-design, build-vs-buy, integration, prioritization, phases-of-craftship

## Summary
Strategic design (a concept borrowed from DDD) is about making smart large-scale decisions about how the architecture is pieced together — most of which are made very early in a project. It sits at the transition from the solution guess point to the architecture guess point: the solution guess point outputs requirements (functional via concrete examples, plus non-functional), and those drive which architectural components to use. Khalil claims every developer needs four abilities: stereotype components, develop components (via responsibility-driven design), integrate components, and prioritize components. Strategic design is "a bit of an art" because it is decision-making, which only improves with more decisions made. It is used across the best-practice-first, responsibility-first and pattern-first phases of craftship.

## Core ideas
- Architecture = the large-scale decisions; the majority are made very early in the project.
- Order of theoretical guess points so far: problem guess point -> solution guess point -> architecture guess point. With clarity on features, concrete examples, language, and possibly lower-level details (domain events, aggregates, business rules), the next question is "how do we realize this in the real world?" -> architecture.
- Think in inputs/outputs between guess points: the solution guess point outputs **requirements**.
  - Functional requirements — mostly from the concrete examples.
  - Non-functional requirements — how the system should *be*/behave; more qualitative (how fast, how real-time, how many concurrent users).
- These requirements drive decisions about which architectural components to use.
- Core problems strategic design must answer:
  - Which components to use, without getting stuck, while making good decisions.
  - What to build yourself vs. install (NPM package) vs. use as an external service.
  - How to integrate components that "just aren't integrating".
  - What to do when a needed component doesn't exist (no external service handles it), or when it isn't fully related to the core problem you're solving.
- Responsibilities are, in Khalil's experience, the "atomic, deepest level" at which we can think about code. Thinking at that level lets you stitch anything together.
- Developers who progress code-first -> best-practice-first -> pattern-first often get stuck thinking only in patterns; they can't go deeper to reason strategically at the level of responsibilities.
- Prioritize the contexts/domains/modules that lead to the most business value; sometimes you must build pieces yourself, sometimes use off-the-shelf.
- Decision-making improves only by making more decisions and learning what works.

## Named frameworks / mental models
- **The 4 things every developer must be able to do (strategic design skills)**
  - Purpose: make good architectural decisions and fill gaps between components.
  - Components:
    1. **Stereotype components** — look at any library, framework, tool, platform ("architectural component" = anything assistive for piecing together the architecture) and identify which aspects, concerns, and responsibilities it helps implement.
    2. **Develop components** — build components yourself when needed; this leads to responsibility-driven design (RDD).
    3. **Integrate components** — make systems that don't talk to each other work together (fill "object design gaps" / "responsibility gaps").
    4. **Prioritize components** — choose which contexts, domains, modules to build first, generally those leading to the most business value.
  - When to use: at the architecture guess point, when choosing/assembling the architecture.
- **Responsibility-Driven Design (RDD)**
  - Purpose: the "deepest level of design" Khalil can teach; once learned, "you learn how to really design anything."
  - Components: software = a set of **responsibilities** (doings and knowings) -> grouped into **roles** -> roles **collaborate** with other responsibilities -> objects/functions (whatever abstraction is the "syntactic sugar") fill and play those roles.
  - Analogy: a Broadway play — there are roles to play; objects fill in and play them.
  - Includes a "three-step RDD process" (named, not detailed here).
  - Answers questions like: where things belong, how to organize concerns, how big/small objects should be, how many instance variables they should have.
  - When to use: responsibility-first phase of craftship; whenever you need to "drop in" and design the pieces yourself.
- **Guess points flow (theoretical side):** problem -> solution -> architecture; outputs of one are inputs of the next.

## Definitions
- **Strategic design** — making very smart decisions about how we piece together our architecture (originally from DDD).
- **Architecture** — the large-scale decisions we make, mostly very early in a project.
- **Non-functional requirements** — qualitative descriptions of how the system should behave/be (speed, real-time-ness, concurrent users).
- **Architectural component** — any library, framework, tool, platform — anything assistive that helps piece together the architecture.
- **Stereotyping a component** — identifying which aspects, concerns and responsibilities a component helps implement.
- **Responsibility-driven design** — seeing software as responsibilities (doings and knowings) grouped into roles that collaborate; objects/functions fill those roles.
- **Object design gap / responsibility gap** — a missing responsibility between components that must be filled to integrate them.

## Rules & heuristics
- Derive architectural component choices from functional + non-functional requirements (output of the solution guess point).
- Think about components at the responsibility level (atomic level) to be able to stitch things together.
- Build what's core/most valuable; use off-the-shelf for sub-aspects where possible (e.g., Next.js SSR + libraries for SEO).
- When two systems don't integrate, think it through from an object-design perspective to identify the missing responsibility and fill it with the smallest thing that works.
- Expect strategic design to improve with experience; treat it as an art of decision-making.

## Anti-patterns / mistakes called out
- Getting stuck choosing components / not making good decisions.
- Thinking only in patterns (pattern-first plateau) without being able to go deeper to responsibilities and think strategically.

## Code discussed
- No code. Integration example (described): Khalil needed Discord to talk to the course platform with little time. Solution: a form students submit to get community access — quick HTML that sends data to a hosted service, which talks to the Discord API. Framed as filling an object design / responsibility gap.
- SEO example: Next.js server-side rendering plus other libraries used to realize the SEO sub-aspect of a system.

## Diagrams / visual models described
- Guess points diagram, theoretical guess points first: Problem -> Solution -> Architecture (then physical guess points).
- Input/output arrow: Solution guess point --(requirements: functional + non-functional)--> Architecture guess point --> choice of architectural components.
- Four-skill list: Stereotype / Develop / Integrate / Prioritize components.
- RDD model: Responsibilities (doings, knowings) -> Roles -> Collaborations -> Objects/functions playing roles.

## Notable quotes
- "Architecture is about the large-scale decisions that we're going to make and we make the majority of those decisions very early on in the project."
- "Non-functional requirements are pretty much just about how the system should behave."
- "Responsibility-driven design is about seeing software as a bunch of just different responsibilities, which are doings and knowings."
- "This is the deepest level of design I can teach you. Once you learn it, you learn how to really design anything."
- "The thing about decision-making is it only gets better over time as you make more and more decisions."
- "Strategic design is, as you would imagine, a little bit of an art because it's about strategy and it's about decision-making."

## Cross-references
- Domain-Driven Design (origin of "strategic design").
- Lessons 21 (Value Identification) and 22 (Domain Discovery) — problem & solution guess points.
- Guess points / architecture guess point (later lessons, e.g., 71 FeedBook Architecture Guess Point).
- Responsibility-driven design (Lesson 38; responsibility-first phase).
- Phases of craftship: code-first, best-practice-first, pattern-first, responsibility-first, value-first.
- Lesson 32 (FAQ: becoming a better architect) — strategic design essential expanded.
- Tools: NPM, Next.js (SSR), Discord API.

## Fluff skipped
Intro greeting, "we'll cover this in more detail later" housekeeping, sign-off.

## AI-era relevance hint
- AI agents can generate component glue code quickly, but choosing *which* components (build vs. buy vs. service) from non-functional requirements remains a human judgment call with long-lived consequences.
- Stereotyping components by responsibility lets you review AI-generated integrations and spot misplaced responsibilities.
- RDD vocabulary (responsibilities, roles, collaborations) gives precise prompts/specs for agents instead of vague "build X".

## Coverage proof
- Lines read: 59 / 59
- Final line (verbatim): "So I'll leave the video right here for now. And with that being said, I'll see you in the next one. And as always, to ministry."
