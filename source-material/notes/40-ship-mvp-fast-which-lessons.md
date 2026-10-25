# Lesson 40 — How to Ship an MVP as Quickly as Possible Using the Course Methodology (Which Lessons to Watch)
- **Source file:** 40) How to ship an MVP a quick as possible using the course methodology Which lessons to watch.txt
- **Category:** workflow
- **Topics:** MVP, ideal developer workflow, mental models, 12 essentials, theoretical guess points, problem/solution/architecture, process modelling, testing strategy, acceptance tests, outer/inner loop, walking skeleton, vertical slice, deployment, E2E, high-value integration tests, abstraction prism, BDD

## Summary
Answering Aaron (who has designs ready), Khalil lays out a path for shipping an MVP fast. First learn the mental models (metaphysics and the 12 essentials), then follow the ideal developer workflow. The workflow's steps are the same for an MVP and for a feature on a mature product; only the effort per step and the quality of your guesses change. The sequence is: get clarity on the theoretical guesses (problem, solution, architecture), choose a testing strategy (outer-loop acceptance tests plus inner-loop developer tests), then build a walking skeleton. That means drawing the architecture, building one vertical slice from UI to DB, and deploying it. For an unvalidated MVP, getting real answers from customers matters more than heavy testing or polish, but it should still rest on a good foundation of guesses.

## Core ideas
- **Step 0: learn the mental models.** They work "like landmines and the opposite of landmines": they tell you what to avoid and what to move toward. Watch the metaphysics (short modules), at least the **12 essentials**.
- **Watch the Ideal Developer Workflow.** Khalil pieced it together from the experts (Steve Freeman's GOOS, Continuous Delivery, Clean Architecture, DDD, BDD).
- **The workflow is invariant.** It is the same steps whether you're shipping an MVP or adding a feature to an existing product. What varies:
  1. how much time you have
  2. how much effort you're willing to put in
  3. the quality of the guesses you've made
- **Unvalidated MVP**: priority is to ship and get solid answers to your theoretical guesses (customers, people using the app, proof it's valuable). Heavy testing and top quality are not critical, but it's "still good to do things on a good foundation of guesses".
- Everything is split into **theoretical** and **physical**, with the **testing strategy** in between.

### Theoretical: clarity on guesses (systems thinking guess points)
1. **Problem guess point**: do you have clarity on the problem?
2. **Solution**: do you know how you'll solve it, and the **boundaries** around the domains that must come together? Use a DDD technique such as **process modelling** for the one or two user stories you most want to build first.
3. **Architecture guess point**: decide the **patterns**, **tools** and architectural components you'll use. (Content was thin at the time. Partly covered in the Strategic Design theoretical essential.)

### Testing strategy (the bridge)
- It must accomplish two things:
  1. **Outer loop / acceptance tests**: turn user stories into tests that validate "this is what the customer wants".
  2. **Inner loop tests**: developer-focused tests that validate internals and technical aspects: **unit tests**, **incoming** and **outgoing contract tests**. You don't need all of them; choosing is the "strategy" part.

### Physical: MVP recommendation, the walking skeleton
1. **Draw out the architecture**, with clarity on all patterns and how you'll architect it.
2. Take one user story and build a **vertical slice** that cuts all the way to the database (frontend: UI → DB). Decide the project structure.
3. **Deploy** the walking skeleton. Expect it to be messy (scripting, lots of setup) and to take time. It's worth it because it sets up the **initial testing strategy** for both test types for the whole product.
- Recommended MVP tests: start with **either end-to-end tests or a high-value integration test**. E2E is demonstrated in Best Practice First; **high-value integration testing** comes later in Pattern First. Either way you need:
  - some **acceptance test** validating correctness for the customer, plus
  - a **configuration of tests** validating the internals.

### Recommended viewing (as of recording)
- Metaphysics + 12 essentials (mental models)
- Ideal developer workflow
- Theoretical guess points. At minimum, see how they map as **inputs and outputs** and build a **checklist** from them.
- Abstraction video → **abstraction prism** as a roadmap to know you have everything before moving into code ("This is also just BDD").
- Best Practice First testing basics (if new to tests)
- Best Practice First modules: **"acceptance testing a walking skeleton from UI to DB"**. This is the top recommendation.
- **Frontend Architecture 2 Q&A**: builders, how to use an application interface, how to piece things together. A shortcut to later structured content.
- Value First testing strategy video.

## Named frameworks / mental models
- **Ideal developer workflow**: fixed sequence of steps. Only effort per step changes with context. Use it for every project (MVP or mature).
- **Theoretical → Testing strategy → Physical**: order of concerns for shipping.
- **Theoretical guess points (problem, solution, architecture)**: get clarity before coding. Treat their inputs/outputs as a checklist.
- **Outer loop vs inner loop tests**: acceptance (customer) vs developer (internals). Use them to design a test strategy.
- **Walking skeleton**: architecture drawn → one vertical slice UI→DB → deployed. Use it at the start of any product.
- **Abstraction prism**: roadmap for readiness to code (equivalent to BDD).
- **Mental models as landmines / anti-landmines**: what to avoid and what to move toward.

## Definitions
- **Acceptance tests / outer loop tests** — tests derived from user stories that validate what the customer wants.
- **Inner loop tests** — developer-focused tests validating internals: unit tests, incoming/outgoing contract tests.
- **Walking skeleton** — drawn architecture plus a deployed vertical slice of one user story, cutting from UI to database.

## Rules & heuristics
- Same workflow, variable effort. Don't invent a different process for MVPs.
- Unvalidated MVP: optimize for getting answers on theoretical guesses, and go lighter on testing and polish.
- Pick one or two user stories and process-model them to find domain boundaries.
- Deploy the skeleton early even though it's messy, because it establishes the test strategy for the whole product.
- Always have at least one acceptance test for customer correctness, plus tests for internals.
- Ask questions in the community when content gaps exist.

## Anti-patterns / mistakes called out
- Heavy testing / maximum quality on an unvalidated MVP (implied as poor effort allocation).
- Skipping clarity on guesses before building.

## Code discussed
None

## Diagrams / visual models described
- Khalil's guide doc: mental models → ideal developer workflow → theoretical (problem, solution, architecture guess points) → testing strategy (outer loop acceptance, inner loop unit/contract) → physical (walking skeleton: architecture drawing, vertical slice UI→DB, deploy).
- Theoretical guess points shown as inputs/outputs mapping.

## Notable quotes
- "Those are pretty much going to act as like landmines and the opposite of landmines too."
- "Those steps are going to be the same, regardless of if you're shipping an MVP or you're going to be developing a new feature on an existing product."
- "The only thing that's really going to change is how much time you have on your side and how much effort you're willing to put in and the quality of the guesses that you have made."
- "You take a user story and you turn your user story into tests. And those tests are going to be acceptance tests."
- "Expect for that to take a little bit of time, but it's really important because you're developing out your initial testing strategy."
- "This is also just BDD."

## Cross-references
- Lessons 7–15 (Metaphysics), Lesson 13 (12 Essentials), Lesson 14 (Abstraction prism), Lesson 15 (Feedback Loop / guess points)
- Lesson 16 (Vertical Slicing), Lesson 23 (Strategic Design), Lesson 24 (Walking Skeleton), Lesson 25 (Deployment & Delivery), Lesson 26 (Ideal Developer Workflow)
- Lesson 64 (Value-First Testing Strategies for Integration Testing), Lesson 65 (Theoretical Guess Points), Lesson 69 (Event Storming / process modelling), Lesson 92 (Frontend Architecture 2)
- GOOS (Steve Freeman), Continuous Delivery, Clean Architecture, DDD, BDD

## Fluff skipped
Greeting/thanks to Aaron, notes about unfinished course sections, sign-off.

## AI-era relevance hint
- AI shrinks the physical build time, so the bottleneck moves to the quality of theoretical guesses and to acceptance tests that define "done" for the agent.
- Acceptance tests generated from user stories are a strong contract for AI agents: they act as outer-loop guardrails.
- A deployed walking skeleton gives agents a working, tested frame to extend slice by slice instead of generating a whole system at once.

## Coverage proof
- Lines read: 76 / 76
- Final line (verbatim): "this. All right. So with that being said, I'll leave the video right there. Thanks for the question. I'll see you in there. As always, to mastery. Thank you."
