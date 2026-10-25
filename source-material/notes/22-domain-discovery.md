# Lesson 22 — Theoretical Essential: Domain Discovery
- **Source file:** 22) Theoretical Essential Domain Discovery.txt
- **Category:** essential-theoretical
- **Topics:** domain-discovery, DDD, ubiquitous-language, shared-mental-model, naming, domain-layer, stability, domain-model, subdomains, generic-subdomains, boundaries, context-mapping, solution-guess-point, event-storming, event-modeling, aggregates, domain-events, commands, queries, GraphQL

## Summary
Domain discovery is the theoretical essential grounded in domain-driven design: developers work against mental models, and the names in code create images in other developers' minds, so a shared understanding of the domain produces higher-quality code. The most stable code — the domain layer — should embed that shared understanding (domain model), because a business's core rarely changes wholesale (a pet clinic won't start selling hot dogs). Boundaries around different domains (core vs generic like users/auth/notifications) keep problems contained, enable investment/scaling/replacement decisions, and are clarified through context mapping. The goal is the **solution guess point**: features, stories, acceptance criteria, and concrete examples, found via event storming and event modeling (Adam Dymitruk), which reveal aggregates, domain events, commands, queries, and even front-end data needs.

## Core ideas
- As a developer you primarily work against mental models; abstraction names get read → images/internal representations form in other devs' minds → that's how they know what to do. Links to design = discoverability & understanding.
- Beyond folder structure (structured by key developer use cases), **naming** of variables, folders, classes, functions has the same effect.
- DDD premise: if everyone works from a **shared understanding / shared mental model** of the problem/domain, code quality is much higher.
- Pet clinic example: language revolves around animals, pets, reservations, procedures, medication (reservation intakes, pet database).
- **Stability**: make some code super stable so everything else can rely on it; put the most important stuff there → the **domain layer** (in clean/hexagonal/onion/"stereotypical" architecture).
- The domain layer should have the shared understanding completely embedded in the code.
- Businesses rarely change wholesale (pet clinic won't switch to hot dogs) → confidence to continually refine and enrich the **domain model** (the shared understanding) and implement it in code as a **domain model implementation**.
- Common/generic domains every app has: users, auth, notifications, emails — none relate to the pet shop but are still needed.
- Sometimes side domains become the entire business: Slack originated from the game Glitch — they pivoted, taking the game's messaging part (Khalil says "I believe").
- Hence **boundaries** around domains: more maintainable code; keeps problems constrained, not bleeding everywhere; enables decisions per area — invest more, scale up, rip out and restart, or swap vendors (e.g. replace Auth0).
- **Context mapping**: separating contexts, applying namespacing boundaries, being clear how boundaries talk to each other → high-level clarity on how you solve a problem.
- Goal of domain discovery = the **solution**: given we know what/why/who (value identification), what will we build, how will we begin, what will someone experience, and concrete examples of how it works in our system → **solution guess point**: features, stories, acceptance criteria, examples.
- Techniques: **event storming** (done with mentorship students) and **event modeling** — surface technical concerns: aggregates, domain events, commands, queries.
- Not just back end: also clarifies the front end — e.g. the GraphQL query needed to show what's needed on a screen before performing a command/operation (a vertical slice) to enable the next step.
- Can take you through the user's entire experience, yielding the data, behavior, and namespaces to carry into the code base.
- **Event modeling** (Adam Dymitruk, "fellow Canuck"): similar to event storming; Khalil prefers it a bit more because it shows the system as **inputs, outputs, and state changes** — maps closely to vertical slicing (input data → work → save to DB → event triggers more behavior or user returns for next step).

## Named frameworks / mental models
- **Domain Discovery (theoretical essential)**
  - Purpose: discover the solution — features, stories, acceptance criteria, concrete examples — plus domain language, boundaries, data, behavior.
  - Components: shared mental model/ubiquitous language (inferred term), domain model, boundaries/subdomains, context mapping, event storming, event modeling.
  - When to use: after value identification; before implementing; heavily in Pattern First.
- **Words → images → action** mental model: names in code create internal representations that guide other developers.
- **Stability principle**: stable domain layer at the center; everything relies on it.
- **Boundaries per domain** (core vs generic): contain problems; decide invest/scale/replace per area.
- **Context mapping**.
- **Event modeling as inputs/outputs/state changes** ↔ vertical slicing.
- **Solution guess point** (features, stories, acceptance criteria, examples) following the problem guess point.

## Definitions
- **Domain-driven design (premise)** — working from a shared understanding/mental model of the problem/domain yields higher quality code.
- **Stability** — the idea that some code should be super stable so everything else can rely on it.
- **Domain layer** — the layer that should have the shared understanding of the problem fully embedded in code.
- **Domain model** — the shared understanding, continually refined and enriched; its code form is the domain model implementation.
- **Context mapping** — separating contexts, applying namespacing boundaries, and clarifying how the boundaries talk to each other.
- **Solution guess point** — where we find features, stories, acceptance criteria, and examples.
- **Event modeling** — technique (Adam Dymitruk) similar to event storming that views the system as inputs, outputs, and state changes.

## Rules & heuristics
- Name everything (variables, folders, classes, functions) using the domain's language.
- Put the most important, least-changing knowledge in the domain layer.
- Place boundaries around domains/subdomains so issues don't bleed across and parts can be swapped (e.g. Auth0).
- Be explicit about how bounded contexts communicate.
- Use event storming/modeling to walk the full user experience before implementing — derive commands, queries, events, aggregates, and even front-end queries.

## Anti-patterns / mistakes called out
- Paying little thought to naming and organization when starting out.
- Letting generic domains (users/auth/notifications) or any problem area bleed into everything else (no boundaries).
- Treating domain modeling as back-end-only.

## Code discussed
None (examples only: pet clinic domain terms; Auth0 swap; GraphQL query for a screen before a command).

## Diagrams / visual models described
- Layered/stereotypical architecture with domain layer at the stable center.
- Context map: bounded domains (pet clinic core; users, auth, notifications, email as generic) with namespaced boundaries and connections.
- Event storming / event modeling timeline: screens/views → commands → events → state changes, mapping to vertical slices.

## Notable quotes
- "As a developer, you are primarily just working against mental models."
- "The language that we use to name our variables, name our folders, name our classes, name our functions. Those things also have the exact same effect."
- "If we can all be working upon a shared understanding, a shared mental model of the problem of the domain, then we're going to have a lot more high quality code."
- "They're probably not going to switch to selling hot dogs."
- "It allows us to see our system as inputs, outputs, and state changes. That's fundamentally all we're dealing with here."

## Cross-references
- Lesson 14 (Abstraction), Lesson 16 (Vertical Slicing — key developer use cases, operations), Lesson 17 (Horizontal Decoupling — domain layer), Lesson 21 (Value Identification — problem guess point), Lesson 23 (Strategic Design).
- Lessons 66–70 (FeedBook: subdomains, bounded contexts, event storming, process modeling), Lesson 28 (learning DDD as a code-first dev).
- People/techniques: Domain-Driven Design (Eric Evans, inferred), Event Storming (Alberto Brandolini, inferred), Event Modeling — Adam Dymitruk (transcript: "[Adam Dimitryek]"); Slack/Glitch pivot; Auth0; GraphQL.
- Phases: Pattern First (backend patterns from DDD — primary), guess points (problem/solution guess points), final project.

## Fluff skipped
Greeting, hot-dog joke aside, sign-off, trailing dots.

## AI-era relevance hint
- AI agents mirror the vocabulary you give them; a precise domain language in prompts and code keeps generated names and models coherent instead of generic.
- Boundaries/context maps limit an agent's blast radius and make it obvious where generated code belongs.
- Event modeling output (commands, events, views, state changes) is a near-direct spec agents can implement slice by slice.

## Coverage proof
- Lines read: 51 / 51
- Final line (verbatim): ". . . . . . . . . . . . . . . . . . ."
