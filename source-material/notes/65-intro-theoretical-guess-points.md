# Lesson 65 — An Introduction to the Theoretical Guess Points & Your Theoretical Assignments
- **Source file:** 65) An Introduction to the Theoretical Guess Points & Your Theoretical Assignments.txt
- **Category:** theoretical-ddd
- **Topics:** abstraction, theoretical-before-physical, course-structure, theoretical-guess-points, problem-guess-point, problem-space, solution-space, domain-knowledge, role-goal, feature-injection, impact-mapping, user-story-mapping, subdomains, bounded-contexts, event-storming, event-modeling, core-supporting-generic, build-vs-buy, feedbook, tactical-ddd, design-story, concrete-examples, systems-thinking, tic-tac-toe

## Summary
This live session opens the theoretical guess points. Khalil's big reflection is that design is fundamentally **abstraction**: thinking before doing, the what separated from the how, declarative vs imperative, theoretical vs physical, upfront vs emergent. From that follows the principle that **theoretical guesses come before physical ones**. You shouldn't model a domain until you know the problem, the solution and the architecture. So he restructured the course to do the theoretical guess points before the stateful one. He walks the top-to-bottom roadmap. Problem space: problem, concrete examples of what and why, role-goal, domain knowledge. Then subdomains, then bounded contexts and a domain model in the solution space, always driven by a concrete scenario (state A → state B), with event storming/modeling to find events, state changes, and core/supporting/generic subdomains. Then build-vs-buy and architecture choices, then code. He introduces the demo domain **FeedBook**, an app where authors test manuscripts with pre-readers, and the assignment sequence: find subdomains → consolidate into bounded contexts → process-model (event storm) → classify core/supporting/generic → implement the Feedback Cycle abstraction at the stateful guess point with value objects, entities and identifiers. He shows how problem framing changes the work (tic-tac-toe vs multiplayer web vs McDonald's terminal) and answers Q&A on design stories and collaborative event storming.

## Core ideas
- **Design = abstraction.** "If nothing else, the most important thing to understand is abstraction." It's the thinking before doing, what vs how, declarative vs imperative, theoretical vs physical, upfront vs emergent. It's "seeing it before you actually have it".
- **Theoretical guesses before physical guesses.** Why model a domain unless you know the problem, its solution, and the architecture you'll use to implement the model?
- Restructuring the course is itself emergent design: "There's the plan and then there's reality."
- **New course structure** (as described):
  1. Introduction.
  2. Metaphysics: clarity on the main mental technology.
  3. From code-first to first principles. Do something like "create user / edit user" end to end, make it work, then "let's go and see why it's messed up".
  4. A little RDD: contracts, roles, playing roles.
  5. First win, early: decouple from infrastructure using the essentials.
  6. The emergent / stateless part.
  7. The theoretical guess points.
  8. The stateful guess point. "You can't really do the stateful part unless you made your theoretical guesses first."
- There are **three theoretical guess points**, drawn as an input → output system. The roadmap goes left to right, then down into the physical guess points. Only the **problem guess point** is named explicitly here. The other two are, by inference, the solution/domain-modelling and architecture guess points (inferred; see Lesson 71).
- **Where to start a new app:** the problem and the people. A student's answer: explore what people currently face and do, lay it out with sticky notes, identify how the current solution fails, then apply your own knowledge.
- Many processes go from problem to solution: BDD's **feature injection**, DDD's **impact mapping**, agile's **user story mapping**. What matters is what you carry into the solution space:
  1. The problem.
  2. Concrete examples of **what** you're building.
  3. Concrete examples of **why** you're building it.
- **Role-goal** (Khalil's technique, a "mishmash", more responsibility-driven): get clear on the concrete people (actors), the roles they play, and their goals.
- Example, finding better study places in Toronto: options are Google Maps, asking locals, Yelp, a shared spreadsheet. If the problem is substantial enough, add software. Crunch domain knowledge: what a "spot"/"study spot"/"place" is, and whether you care about power outlets (yes).
- Understanding the problem comes from crunching domain knowledge with your boss or the domain experts.
- Problem → **subdomains** (breaking the problem into parts). Then **bounded contexts**, a term that "confuses everybody", Khalil included, for a long time.
- The **solution space** means creating a **domain model**, which is different from understanding. You decide the abstractions you'll codify and get concrete about language: "no, it's going to be called this. And here's how it works."
- Everything must be **driven through a concrete example**. Event storming without one leaves your brain mush. You need a user story/scenario: person is at state A, wants state B, here's their experience. Then model the system where that can happen.
- Modeling the scenario clarifies (a) the events needed to go from A to B, and (b) the systems you might build yourself, pull off the shelf, or reluctantly build because they matter. That gives you **core, supporting, generic** subdomains.
- After event storming (a stream of events and commands; Khalil avoids the word "aggregate" and just says "data") and optionally **event modeling** (how the screens connect), you have clarity on state changes and on which parts of the app relate to the problem and which don't.
- Then **decide how to assemble it**: try out systems, build vs buy. Don't build email or auth yourself. But if you're building something like Google Calendar, scheduling is core, so keep control and don't outsource it.
- With clarity on what to build, what not to build, tools, external systems, and how the bounded contexts/modules connect, **then build**: modular monolith, microservices, integration with other systems. Khalil keeps it simple for the course.
- **Changing the problem framing changes the work.** "Build tic-tac-toe" vs "a web-based multiplayer tic-tac-toe game" adds concurrency, client and server domains, creating games and rooms, setting up games, network issues and rendering (students also mentioned client concerns and "financial issues"). A tic-tac-toe game on a McDonald's order terminal changes the problem again and exposes different subdomains. The point is to practice systems thinking and decompose from the problem level.
- Frontend work for these assignments isn't required.

## Named frameworks / mental models
- **Abstraction as the core of design**: pairs that are all the same idea. What/how, declarative/imperative, theoretical/physical, upfront/emergent, thinking/doing.
- **Theoretical-first principle**: make theoretical guesses (problem, solution, architecture) before physical ones (domain model code).
- **Theoretical guess points roadmap** (input → output system)
  - Problem guess point: understand the problem, people, domain knowledge, concrete examples (what and why), role-goal.
  - Problem space → subdomains → bounded contexts → domain model in the solution space, driven by a concrete scenario and event storming/modeling. The explicit label for this guess point isn't given (inferred: solution/domain guess point).
  - Deciding systems, build-vs-buy, how bounded contexts connect, modular monolith vs microservices. Inferred to be the architecture guess point.
  - Then down to the physical guess points (the stateful guess point: implement the domain model).
- **Problem → solution discovery techniques**: feature injection (BDD), impact mapping (DDD community), user story mapping (agile), role-goal (Khalil's).
- **Role-goal**: actors → roles → goals. Responsibility-driven.
- **Concrete scenario (state A → state B)**: "Person is at state A, person wants to be at state B, and here's their experience." This drives event storming and domain modeling.
- **Event storming / process modeling**: a stream of events and commands (and "data"), which reveals events, state changes and needed systems.
- **Event modeling**: connects screens to state changes.
- **Core / supporting / generic subdomains**: what you must build yourself, what supports it, what you buy off the shelf (email, auth).
- **Systems thinking for decomposition**: small changes in problem framing (multiplayer, web, McDonald's terminal) expose different subdomains.
- **Assignment input kit**: design story (upfront) + concrete example → extract domain knowledge and rules → find subdomains → bounded contexts.

## Definitions
- **Domain knowledge** — "specific knowledge related to a field or of a place where you can be solving problems."
- **Domain model** — in the solution space, the abstractions you decide to codify, with concrete agreed names and behavior. Different from just having an understanding.
- **Subdomains** — the smaller parts a problem breaks down into.
- **Bounded context** — named here (and called confusing); to be defined in the upcoming demos. Assignments will teach the difference from subdomains.
- **Core / supporting / generic** — the classification of subdomains by whether you build it (core), build it reluctantly because it matters (supporting), or pull it off the shelf (generic). The mapping is inferred from narration: "build ourselves", "pull from off the shelf", "don't want to have to build this but need to".
- **Design story** — the upfront problem narrative given with each assignment. You extract domain knowledge and rules from it.
- **FeedBook** — the demo app, which helps authors test their manuscripts against pre-readers.
- **Feedback cycle** — a FeedBook concept: a cycle that runs at a particular time, where invited readers leave reactions and feedback on the book.

## Rules & heuristics
- Don't start the domain model until the problem, solution and architecture guesses are made.
- Start a new app from the problem and the people, not the code.
- Carry the problem plus concrete what/why examples into the solution space.
- Always drive event storming and modeling with a concrete scenario (state A → state B).
- Don't build generic capabilities like email or auth yourself. Build the core (e.g., scheduling for a calendar product).
- Keep architecture choices simple (modular monolith etc.) unless needed.
- Blow the assignment up to the problem level. Framing changes the subdomains.
- Expect design stories to be missing some rules. Design story plus a concrete example still gets you far.
- Learn by watching the demos (find subdomains, consolidate to bounded contexts), then do the same for each assignment.

## Anti-patterns / mistakes called out
- Modeling a domain (the stateful guess point) before making theoretical guesses.
- Event storming with no concrete example ("event storm until your brain's like mush").
- Building commodity systems (email, auth) yourself.
- Treating "build tic-tac-toe" as context-free code, ignoring how problem framing changes the work.
- Thinking in the code-first mindset: jumping to solve problems with code.

## Code discussed
None. No code is shown. The planned implementation is the **Feedback Cycle** abstraction at the stateful guess point, using DDD tactical patterns: **value objects, entities, identifiers**. **Domain services** aren't needed yet.

**FeedBook product (demo domain):**
- Source idea: the book *Write Useful Books* (author Rob Fitzpatrick, inferred).
- Flow: an author (e.g., with Solidbook) invites a group of readers to review the book → creates a **feedback cycle** that runs at a particular time → collects reactions (hearts, thumbs up, etc.) and feedback per chapter → the author can drill in to see where people react, leave comments, and "fall off" in the book.
- Khalil once considered building it but realized he doesn't need it.

**Theoretical assignments (sequence):**
1. Find the subdomains (FeedBook first, then the other assignments).
2. Consolidate subdomains into bounded contexts.
3. Process modeling (event storming).
4. Classify core, supporting and generic subdomains.
5. Move to the stateful guess point: implement the domain model in code (Feedback Cycle).
- Students will get the full set of assignments (a "course plot" [original unclear], tic-tac-toe, etc.) to practise top to bottom: problem → solution → domain model implementation.

## Diagrams / visual models described
- The theoretical guess points roadmap: three systems as input → output, drawn left to right, then flowing down to the physical guess points (link shared in session).
- Problem space (problem, domain knowledge, concrete examples) → subdomains → bounded contexts → solution space / domain model.
- A FeedBook mock-up: chapters listed with reaction counts (hearts, thumbs up), clickable for detail.

## Notable quotes
- "If nothing else, the most important thing to understand is abstraction. It's the thinking before doing."
- "We need to make theoretical guesses first before we can make physical ones."
- "There's the plan and then there's reality."
- "You can't really do the stateful part unless you made your theoretical guesses first."
- "What you need is a concrete example."
- "Person is at state A, person wants to be at state B, and here's their experience."
- "Just changing it ever so slightly really changes the work that we have to do."

## Cross-references
- Lesson 14 (Essential: Abstraction), Lesson 9 (Systems thinking)
- Lessons 21–23 (Value identification, Domain discovery, Strategic design)
- Lesson 15 (Feedback loop and guess points)
- Lessons 66–72 (FeedBook demos: subdomains, bounded contexts, event storming, architecture guess point)
- Lessons 74, 77 (Stateful guess point, PreReaderInvite domain object)
- Lesson 38 (RDD), Lesson 28 (learning DDD as code-first dev)

## Fluff skipped
Greetings, "four gigs" recording aside, emoji check-ins, meta chat about course feedback.

## AI-era relevance hint
- Agents are strongest at the physical guess points. Making the theoretical guesses (problem, subdomains, build vs buy, architecture) is where human judgment adds the most leverage.
- A concrete state-A → state-B scenario and a design story are exactly the context an agent needs to produce a coherent domain model instead of generic CRUD.
- Build-vs-buy and core/generic classification stop agents from happily rebuilding commodity systems like auth and email.

## Coverage proof
- Lines read: 146 / 146
- Final line (verbatim): "in the chat. Oh, okay. Okay, cool. We're good. So let's move along. Great intro. I'm already at four gigs. So let's go to the first thing here."
