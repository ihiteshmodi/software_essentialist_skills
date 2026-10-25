# Lesson 37 — FAQ: Learning Clean Architecture and Layered Architectures
- **Source file:** 37) FAQ Learning Clean Architecture and Layered Architectures.txt
- **Category:** faq
- **Topics:** clean architecture, layered architecture, onion, hexagonal, ports and adapters, decoupling from DB, integration testing, event-based architecture, phases of craftship

## Summary
Khalil maps clean, layered, onion and hexagonal (ports and adapters) architecture onto the phases of craftship. Best Practice First gives the first taste, where you decouple from the database to integration test it and start carving out a layered architecture. Pattern First adds an adapter layer, and the core-vs-infrastructure decoupling turns it into hexagonal/clean architecture. Responsibility First mostly adds an event-based architecture.

## Core ideas
- Layered, onion, clean and hexagonal have "all sorts of names". Layered is slightly different, but they are essentially the same idea.
- Progression through the phases:
  1. **Best Practice First**: decouple from the database so you can integration test it, and move things around. This carves out a layered architecture.
  2. **Pattern First**: insert an **adapter layer**. Decoupling **core code** from **infrastructure code** makes it hexagonal / clean architecture. Most of the work on this happens here.
  3. **Responsibility First**: mostly introduces an **event-based architecture** on top.
- After the architecture is in place, a lot of testing and feature-building work is done within that layout.

## Named frameworks / mental models
- **Layered → Hexagonal/Clean progression**: layers first (for testability against the DB), then adapters to decouple core from infrastructure.

## Definitions
- **Hexagonal / Clean architecture (as framed here)** — layered architecture plus an adapter layer that decouples core code from infrastructure code.

## Rules & heuristics
- The first reason to layer is practical: decouple from the database so it can be integration tested.

## Anti-patterns / mistakes called out
None

## Code discussed
None

## Diagrams / visual models described
- (inferred) Concentric/layered picture: core in the centre, adapter layer, infrastructure on the outside.

## Notable quotes
- "Layered is actually a little bit different but it's the same thing."
- "That's when it becomes the hexagonal or the clean architecture is when there's a decoupling from core code to infrastructure code."

## Cross-references
- Lesson 17 (Horizontal Decoupling)
- Best Practice First, Pattern First, Responsibility First phases
- Lesson 88 (Office Hours: Decoupling From Infra)

## Fluff skipped
None substantial.

## AI-era relevance hint
- Clear core/infrastructure boundaries let you give an AI agent a bounded task (e.g., "write a Postgres adapter for this port") without it touching domain logic.
- Adapter seams let you swap AI-generated infrastructure code without rewriting the core.

## Coverage proof
- Lines read: 10 / 10
- Final line (verbatim): "the majority of that work you can be pattern first phase"
