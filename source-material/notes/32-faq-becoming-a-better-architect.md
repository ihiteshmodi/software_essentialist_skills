# Lesson 32 — FAQ: How to Become a Better Architect (Using the 12 Essentials)
- **Source file:** 32) FAQ How to Become a Better Architect (using the 12 Essentials).txt
- **Category:** faq
- **Topics:** architecture, architect-role, stereotypical-architecture, CQS, event-based, temporal-decoupling, horizontal-decoupling, layers, dependency-rule, strategic-design, non-functional-requirements, tool-selection, storage-types

## Summary
An architect makes smart decisions at the start of a project — a skill from experience plus education. Education means knowing foundational styles and patterns, summarized as the **stereotypical architecture** (seen on front end, back end, desktop) with laws: CQS (read path and write path), event-based (temporal decoupling to scale features horizontally), layers of concerns (horizontal decoupling), and the dependency rule. Also keep learning platforms/tools (static sites, SSG, serverless, Docker, Kubernetes, event bus, MongoDB) and their functional/non-functional reasons. Strategic design = selecting platform, components, tools and services before the walking skeleton; ultimately it all comes down to responsibilities and picking the best tool for the non-functional task.

## Core ideas
- Architect = making decisions at the start of a project that are really smart to make; comes with experience plus education.
- Know the foundational architectural styles/patterns.
- **Stereotypical architecture** appears everywhere (front end, back end, desktop) with laws:
  - **CQS principle** — there must be a read path and a write path.
  - **Event-based** — lets features scale horizontally via temporal decoupling.
  - **Layers of concerns** (horizontal decoupling) — put responsibilities in correct abstractions, logically assign abstractions to layers, and have abstractions talk only to appropriate ones.
  - **Dependency rule** — e.g., an application-layer abstraction shouldn't directly know about an infrastructure concern.
- Keep educating yourself on platforms/tools/approaches (static sites, static site generation, serverless) — each has functional and non-functional reasons for use.
- Strategic design essential: select platform, architectural components, tools, external services -> build the baseline/foundation of the architecture before putting out the walking skeleton.
- You can only select tools based on your experiences and knowledge.
- Phases of craftship experience: 3- and 4-tier architecture, hexagonal architecture, event-based; responsibility-first — gluing pieces with object design once you understand the stereotypical architecture; guess points — view an architecture through systems thinking, decompose problems and route them into the correct systems/guess points.
- Try new tools on your own time (Docker, Kubernetes, event bus, MongoDB): know what they are, why they're beneficial non-functionally, and try plugging things together.
- "It all comes down to responsibilities": e.g., need very fast data retrieval -> key-value storage; alternatives: document storage, relational storage.
- Large part of architecture = choosing the best tool for the non-functional task.

## Named frameworks / mental models
- **Stereotypical Architecture**
  - Purpose: a universal baseline architecture for any platform.
  - Components/laws: CQS (read path + write path); event-based (temporal decoupling); layers of concerns (horizontal decoupling); dependency rule.
  - When to use: as the default mental template when architecting any app.
- **How to become a better architect (Khalil's path)**
  1. Go through the phases of craftship; note the styles, patterns, and tools used.
  2. Learn foundational styles (3/4-tier, hexagonal, event-based) and the stereotypical architecture.
  3. Learn object design (responsibility-first) to glue pieces.
  4. Use guess points + systems thinking to decompose problems into systems.
  5. Keep educating yourself and experimenting with new tools.
- **Responsibility-based tool selection** — map required responsibility/non-functional need -> tool (fast retrieval -> key-value store; else document or relational).

## Definitions
- **Architect** — someone making the smart decisions at the start of a project.
- **CQS principle** — there has to be a read path and a write path.
- **Dependency rule** — abstractions in a layer (e.g., application) shouldn't directly know about infrastructure concerns.
- **Strategic design essential** — selecting platform, architectural components, tools, external services to build the architecture's foundation before the walking skeleton.

## Rules & heuristics
- Separate read and write paths.
- Make the architecture event-based to decouple features temporally.
- Assign responsibilities to correct abstractions and abstractions to correct layers; respect the dependency rule.
- Know the functional and non-functional reasons for each platform/tool.
- Choose tools by required responsibility and non-functional need.
- Experiment with unfamiliar tools outside work.

## Anti-patterns / mistakes called out
- Application-layer code directly depending on infrastructure concerns (violates the dependency rule).
- Choosing tools without knowing why they're beneficial non-functionally (inferred).

## Code discussed
None.

## Diagrams / visual models described
- Stereotypical architecture: layered (horizontal) with separate read path and write path, events connecting features, dependencies pointing inward/away from infrastructure (inferred direction from "dependency rule").
- Storage choice map: fast retrieval -> key-value; document storage; relational storage.

## Notable quotes
- "What is an architect really? It's about making the decisions at the start of a project that are going to be really smart to make."
- "There has to be a read path and a write path."
- "We could scale features horizontally because we could just temporally decouple features."
- "An abstraction inside of the application layer is not necessarily supposed to know about directly an infrastructure concern. That's called the dependency rule."
- "At the end of the day, it all comes down to responsibilities."
- "A large part is choosing the best tool for the non-functional task that you need to accomplish."

## Cross-references
- Lesson 17 (Horizontal Decoupling), Lesson 18 (Temporal Decoupling), Lesson 23 (Strategic Design), Lesson 24 (Walking Skeleton), Lesson 37 (Clean/Layered Architectures), Lesson 38 (RDD).
- CQS (Bertrand Meyer — inferred, not named); hexagonal architecture; 3/4-tier architectures.
- Tools: Docker, Kubernetes, event bus, MongoDB, serverless, SSG.

## Fluff skipped
Repeated "craftship" filler and garbled speech-to-text tail (last ~2 lines).

## AI-era relevance hint
- Agents readily violate the dependency rule or mix read/write paths unless constrained; knowing the stereotypical architecture lets you enforce and review it.
- Early, hard-to-reverse decisions (platform, storage type) are the highest-leverage human calls; code generation is cheap, rework of architecture isn't.
- Responsibility-based tool selection gives crisp criteria to evaluate AI-suggested stacks.

## Coverage proof
- Lines read: 31 / 31
- Final line (verbatim): "core hardware. And then I'm going to tiny cart Carolyn get a big, I'm going to Mainly run the four heaven out of the 대"
