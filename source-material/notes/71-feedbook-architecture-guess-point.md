# Lesson 71 — Discussion: FeedBook — The Architecture Guess Point
- **Source file:** 71)  Discussion FeedBook вЂ” The Architecture Guess Point.txt
- **Category:** architecture
- **Topics:** architecture-guess-point, theoretical-guess-points, feedbook, deployable-units, modular-monolith, microservices, bounded-contexts, core-supporting-generic-subdomains, stereotypical-architecture, vertical-slice, event-bus, event-driven, redis, bullmq, non-functional-requirements, rdd, ideal-developer-workflow, stateful-guess-point, encapsulation, fp-vs-oop

## Summary
Live (late-night) session covering the last theoretical step — the architecture guess point — applied to FeedBook. Khalil walks through the key architecture questions (external systems, components, modules, deployable units, code organization, non-functional requirements), stressing that by the time you reach this step most hard work is done: bounded contexts and their classification (core/supporting/generic) already dictate the code organization. He distinguishes a modular monolith (code organization) from process deployment, and introduces the event bus as the required component letting modules communicate. He admits the deployment topic is massive and plans to redo it with several deployment options. He closes by outlining the move to the physical (ideal developer workflow vs. jumping to the stateful guess point for learning) and discusses implementing encapsulation in FP vs OOP.

## Core ideas
- The architecture step is the **last step of the theoretical** guess points.
- Key questions Khalil asks himself at this step:
  - External systems, components, modules, and **deployable units**.
  - Deployable units: modular monolith vs microservices; bounded contexts; "[Stereo services]" (unclear STT — possibly stereotypical/serverless services).
  - Components (e.g. Redis).
  - How do we organize our code?
  - Non-functional requirements.
- **Components can play many roles**: Redis used for caching, Pub/Sub, key-value storage; can be combined with a scheduling/queuing library (Bull JS / BullMQ — "Bull H M Q") for queuing and scheduling. Components come up later at the **outgoing adapter guess point**.
- By the architect step "we've done the majority of the hard work" — the modules that must find their way into the codebase are already known.
- Prerequisite: clarity on the **stereotypical architecture** and how modules interact.
- Bounded contexts are classified, and that classification tells you how to organize code:
  - things we must build ourselves (core),
  - generic things — just import libraries,
  - supporting — things we have to build anyway but don't really want to.
- Code organization for a **modular monolith**: good folder structure by modules, plus probably a `shared` folder (core utilities, stuff describing the domain).
- **Modular monolith ≠ single process.** It's how you organize code, not how it runs. At bootstrap time you can run some modules in separate processes and others together.
  - FeedBook example: billing is external; core runs together; sessions/scheduling likely run in a separate process entirely; maybe other pairs run separately.
- Modular monolith = several modules in one project (one thing you commit and work on) — "usually a better place to start than microservices."
- A required architectural component: something that lets modules talk to each other → **event bus** (everyone registers events and subscribes). Deploying everything in one process is the easiest place to start.
- Students' alternatives: service-oriented architecture without an event bus; WebSockets. Course takes the **event-driven route**. "At the end of the day, we just need coordinators" — however we design that in.
- Deployment topologies is "a massive topic"; Khalil plans to redo this and present several ways to deploy.
- Non-functional requirements: the **three-step responsibility-driven design process** can also be used to find the correct architectural components (bigger topic, not yet covered).
- Moving to the physical (see lesson 72): code organization known, stereotypical architecture known, vertical slices. Ideal workflow: deployment pipeline → E2E test in prod-like env → level-three tests. For learning, instead jump to **level two, the stateful guess point**.
- Next session plan: state machines on FeedBook; value objects, entities, domain objects, domain events; use `Result` and `Guard`; "encapsulate the hell out of the object correctly."
- Students may implement domain models with either a functional or an object-oriented approach — both fine; encapsulation technique is the same, implementation differs.

## Named frameworks / mental models
- **Architecture guess point (theoretical)**
  - Purpose: decide external systems, components, modules, deployable units, code organization, NFRs before moving to the physical.
  - Components: questions list above; inputs are bounded contexts + subdomain classification from earlier guess points.
  - When: after subdomains/bounded contexts/process modelling are done.
- **Subdomain classification → code organization** (core = build; generic = import library; supporting = build reluctantly).
- **Modular monolith vs process topology** — organize code in one project; decide per module at bootstrap whether it runs in its own process.
- **Event bus as integration backbone** — modules register/subscribe to events; coordinators between modules.
- **Stereotypical architecture / vertical slice** — request enters through adapter, goes through app/domain, down to infra/database, and back up.
- **Three-step RDD process** applied to architecture (for NFRs; mentioned only).
- **Ideal developer workflow** kickoff sequence (pipeline → E2E in prod-like env → level-3 tests).

## Definitions
- **Modular monolith** — a way of organizing code: several modules in one project; does not imply one process.
- **Event bus** — component where everybody can register their events and subscribe to them; allows modules to talk to each other.
- **Encapsulation** — having data and its related behavior together, with the data protected.
- **Encapsulation in FP** — achieved by co-location (data and functions close together) (student answer, endorsed).
- **Encapsulation in OOP** — private constructor, static (factory) method, restricting scope of getters and setters.

## Rules & heuristics
- Start with a modular monolith rather than microservices.
- Let bounded-context classification drive folder/module structure.
- Decide process boundaries at bootstrap, independent of code organization.
- Deploy everything in one process first when truly getting started.
- Prefer event-driven integration (event bus) between modules.

## Anti-patterns / mistakes called out
- Conflating "modular monolith" with "single process."
- Jumping to microservices as a starting point (implied).

## Code discussed
- No code; folder-structure description only:
```ts
// reconstructed from narration (folder layout, not code)
// src/
//   modules/
//     feedbook/      (core)
//     sessions/      (scheduling; likely separate process)
//     billing/       (external/generic)
//   shared/
//     core/          (utilities)
//     domain/        (shared domain descriptions)
```

## Diagrams / visual models described
- Stereotypical architecture layers: domain, app, infra, adapter; a request comes in, travels down to the database and back up = vertical slice.
- Modules (FeedBook, sessions/scheduling, billing, core) drawn in one project, grouped into different processes at bootstrap.
- Event bus drawn beneath all modules, connecting them.

## Notable quotes
- "Once we get to this architect step, we've done the majority of the hard work."
- "Modular monolith does not mean modular process. This is just how you organize your code."
- "Just usually a better place to start than microservices."
- "At the end of the day, we just need coordinators."
- "Encapsulate the hell out of the object correctly."
- "The technique is encapsulation, but the way you implement it is a little bit different."

## Cross-references
- Lessons 66–70 (FeedBook subdomains, bounded contexts, event storming, process model refinement).
- Lesson 72 (Getting ready to move to the physical — overlapping ending).
- Lessons 16 (Vertical Slicing), 17 (Horizontal Decoupling), 18 (Temporal Decoupling — events), 23 (Strategic Design), 26 (Ideal Developer Workflow), 38 (RDD).
- Lessons 74, 76, 77 (stateful guess point, state machines, PreReaderInvite).

## Fluff skipped
Goku/energy banter, 4 a.m./hunger remarks, thanks to attendees, 20 GB file compression, Figma file sharing.

## AI-era relevance hint
- Agents happily scaffold microservices; the human judgment is choosing a modular monolith and deciding process boundaries later.
- Subdomain classification (build vs buy vs reluctantly build) is a business call agents can't make for you.
- Explicit event-bus contracts give agents clear seams to generate modules against.

## Coverage proof
- Lines read: 69 / 69
- Final line (verbatim): "All right, y'all. Talk to you soon, tomorrow. Have a great night, day at work and all of that. See you soon."
