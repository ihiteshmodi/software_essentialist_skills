# Lesson 28 — FAQ: How Should I Learn DDD If I'm a Code-First Developer?
- **Source file:** 28) FAQ How Should I Learn DDD If I_m a Code-First Developer.txt
- **Category:** faq
- **Topics:** DDD, phases-of-craftship, code-first, systems-thinking, chunking, layered-architecture, application-layer, high-value-unit-tests, monorepo, value-objects, presenters, view-models, ideal-developer-workflow

## Summary
A student in Mastery Foundations asks for an entry point to DDD coming from a code-first mindset. Khalil's answer: don't jump into DDD yet — climb the phases of craftship. DDD's many tools (impact mapping, event storming, process modeling) are consolidated by systems thinking and functional decomposition, which a code-first developer can't yet "compute". First build things (code-first), then learn best practices (acceptance tests, E2E, deploy, monorepo), then learn the DDD patterns in pattern-first. Architectural layers exist mainly to give different places to write tests; learning DDD before testing was Khalil's own mistake.

## Core ideas
- Guess points are a tool available only at the value-first / responsibility-first phases.
- DDD has many practices: impact mapping (also from BDD), event storming, process modeling — to learn the domain and see how to structure the architecture.
- These are consolidated by **systems thinking**: theoretically understand problem -> solution -> architecture -> deployment -> the system -> down to functions (functional decomposition).
- Code-first mindset can't yet think that way; entry is via doing: build the API code-first, then implement best practices (compose concepts, start with an acceptance test) which give "tiny hints" of DDD.
- **Chunking**: mind takes in only so much at a time; learning needs experiences. Redo assignments with new approaches to gain awareness of levels of abstraction and responsibilities.
- DDD patterns are introduced in pattern-first to carve out an architecture that lets you build a **domain layer**.
- Khalil learned DDD before knowing how to write tests — mistake. Since "everything we're doing is a guess", the point of layers (domain, application...) is that they give different opportunities/places to write tests with different impacts and coverage.
- Application-layer tests: test core functionality without starting React (front end), a database, or a web server (back end) — "incredibly valuable".
- Best-practice-first roadmap: E2E on backend, E2E on front end, deploy (not deep on the deployment pipeline yet), refactor to a monorepo to share concepts like DTOs and value objects between front end and back end.
- Avoid chucking yourself into patterns and getting stuck because you don't know why you're using them.

## Named frameworks / mental models
- **Phases of craftship as the learning path to DDD**: code-first (build it) -> best-practice-first (tests, E2E, deploy, monorepo) -> pattern-first (DDD patterns) -> responsibility-first / value-first (guess points, theoretical part).
- **Systems thinking / functional decomposition chain**: problem -> solution -> architecture -> deployment -> system -> functions.
- **Chunking**: learning bandwidth is limited; repeated experiences build understanding.
- **Layers as test seams**: architectural layers exist to create different test opportunities.
- **Ideal developer workflow (rough version)**:
  1. Get clear on the problem.
  2. Shared understanding of the architecture and patterns (e.g., front end: presenters, view models, decoupling from React/Svelte/Angular).
  3. Lay out a testing strategy.
  4. Take a feature, E2E test it (proof it works).
  5. Write high-value unit tests — ~80% confidence, ~80% of the work; roughly 10 high-value unit tests per 1 E2E test; fast to write and execute.

## Definitions
- **Functional decomposition** — dropping from problem/solution/architecture/deployment/system down to the level of functions.
- **Chunking** — the human mind can only take in so much at a time.
- **High-value unit tests** — fast tests giving ~80% confidence; the bulk of testing work.
- **Domain layer** — what DDD patterns carve out an architecture to enable (what "really matters").

## Rules & heuristics
- Don't jump into DDD from code-first; learn testing and best practices first.
- Repeat assignments, trying new approaches each time.
- Learn why patterns exist (test seams, decoupling) before using them.
- Ratio heuristic: ~1 E2E test : ~10 high-value unit tests.
- Patterns to know before DDD: back end — value objects, entities, use cases; front end — presenters, domain models, controllers, view models.
- Share DTOs and value objects between front end and back end via a monorepo.

## Anti-patterns / mistakes called out
- Learning DDD before knowing how to write tests (Khalil's own past mistake).
- Using patterns without knowing why -> getting stuck on the patterns.
- Front end coupled to React/Svelte/Angular (few devs know presenters/view models, so front ends aren't testable).

## Code discussed
None (patterns named: DTOs, value objects, entities, use cases, presenters, view models, domain models, controllers).

## Diagrams / visual models described
- Phases of craftship ladder with DDD entering at pattern-first.
- Decomposition stack: problem -> solution -> architecture -> deployment -> system -> functions.
- Test pyramid-like ratio: 1 E2E : ~10 high-value unit tests.
- Monorepo with shared DTOs/value objects between front end and back end.

## Notable quotes
- "The way to get into and to make sense of DDD is to go up these phases of craft."
- "For you to really actually learn and understand something, you need to have experiences with it."
- "I learned DDD before I even knew how to write tests."
- "Pretty much the whole mental model of software is everything we're doing is a guess."
- "It's giving you different places at which you can write tests that are going to have different impacts."
- "Rather than just chuck yourself into it and just start using patterns and then get stuck on the patterns because you don't even really know why you're using the patterns."

## Cross-references
- Domain-Driven Design; BDD (impact mapping); event storming; process modeling.
- Lesson 9 (Systems Thinking), Lesson 26 (Ideal Developer Workflow), Lesson 37 (Clean/Layered Architectures), Lessons 65–72 (FeedBook theoretical/DDD demos).
- Mastery Foundations; phases of craftship.

## Fluff skipped
Student's intro, thanks/pleasantries, garbled speech-to-text tail at end.

## AI-era relevance hint
- AI can emit DDD pattern boilerplate instantly; without knowing *why* layers exist (test seams), you can't judge whether it's appropriate.
- Application-layer tests that run without UI/DB/server are ideal fast feedback for agent iterations.
- Chunked, repeated practice still matters: judgment comes from experience, not from generated code.

## Coverage proof
- Lines read: 58 / 58
- Final line (verbatim): "instructions. Then I'm happy to have asked that question. Thank you,golden baş."
