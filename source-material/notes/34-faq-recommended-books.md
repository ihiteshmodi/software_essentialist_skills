# Lesson 34 — FAQ: Which Books Related to the Main Course Ideas Should I Read?
- **Source file:** 34)  FAQ Which Books Related to The Main Course Ideas Should I Read.txt
- **Category:** faq
- **Topics:** reading list, BDD, object design, continuous delivery, GOOS, DevOps, DDD, XP, functional programming, systems thinking, feedback loop, abstraction prism

## Summary
Khalil lists the books that most shaped the course and says which course concept each one feeds. BDD in Action is the source of the abstraction prism. Object Design was "the last book" he needed on design. GOOS gave him builders, the walking skeleton and the ideal developer workflow. Continuous Delivery, the DevOps Handbook and XP support the feedback loop essential. The DDD books led him to Pattern First. Scott Wlaschin's *Domain Modeling Made Functional* frames functional programming as composing steps and events from state A to state B.

## Core ideas
- BDD is "fundamentally what we're doing here". It drives code from a philosophical level of reasoning (role, goal, vision) all the way down to low-level code. This is the same as abstraction.
- The feedback loop (second metaphysical essential) is more than a mental model. It also covers continuous delivery, DevOps, and agile. All of these support the idea that "everything we're doing is a guess" and needs feedback loops.
- DevOps "is just a massive feedback loop".
- The DDD books help you avoid spaghetti in complex codebases and lead you to Pattern First, but they don't take you further. Read *Object Design* after them.
- Solving problems = steps and events that move you from state A to state B.
- Functional programming seen through **thinking backwards**: start from state B (the goal), then compose steps/events as functions into a slice. You feed data in and it produces the result.

## Named frameworks / mental models
- **Abstraction prism** (from *BDD in Action*): reasoning from role, goal and vision down to low-level code. Use it to drive code from intent.
- **Feedback loop** (metaphysical essential): continuous delivery, DevOps and agile are all feedback loops that validate guesses.
- **Ideal developer workflow** and **walking skeleton** (from GOOS): rigorous, test-driven way of delivering.
- **Thinking backwards / steps & events from state A to B**: FP = compose step functions into a slice that produces the end state.

## Definitions
- **Functional programming (as framed here)** — start from the desired state B and apply steps/events as compositional functions to build a slice. Data goes in and a result comes out.

## Rules & heuristics
- If you follow the DDD path, read *Object Design* afterwards to go past patterns.
- After the course, if you want to explore FP, start with *Domain Modeling Made Functional*.

## Anti-patterns / mistakes called out
- Complex code turning into "a big spaghetti mess". The DDD books helped Khalil solve this.

## Code discussed
None

## Diagrams / visual models described
- State A → (steps/events as composed functions) → State B. Described as a "slice" you put data into that "will spit out a result".

## Notable quotes
- "BDD is fundamentally what we're doing here."
- "I don't really see if there's much more to this thing of design other than object design."
- "Everything we're doing is a guess. And that's why we need all of these feedback loops."
- "The DevOps movement is just a massive feedback loop fundamentally."
- "We're just solving problems in their steps and events. We go through in order to get from state A to state B."

## Cross-references
Books (author names not stated in the transcript are marked inferred):
1. *BDD in Action* (John Ferguson Smart, inferred). Source of the abstraction prism.
2. *Object Design* (Rebecca Wirfs-Brock & Alan McKean, inferred). Foundational design book.
3. *Continuous Delivery* (Jez Humble & David Farley, inferred).
4. *Growing Object-Oriented Software, Guided by Tests*. Steve Freeman (named; co-author Nat Pryce, inferred). Taught builders, the walking skeleton and the ideal developer workflow.
5. *The DevOps Handbook*.
6. DDD "red book" (Vaughn Vernon, *Implementing DDD*, inferred) and "blue book" (Eric Evans, *Domain-Driven Design*, inferred).
7. *Extreme Programming Explained* (Kent Beck, inferred).
8. A dependency injection book ("dependency injection version book"; likely *Dependency Injection Principles, Practices, and Patterns*, inferred).
9. *Domain Modeling Made Functional*. Scott Wlaschin ("Scott Blossian" in the transcript).
10. A Systems Thinking book (exact title not stated).
- Course links: Lesson 14 (Abstraction / abstraction prism), Lesson 15 (Feedback Loop), Lesson 24 (Walking Skeleton), Lesson 26 (Ideal Developer Workflow), Lesson 9 (Systems Thinking), Lesson 75 (Thinking Backwards)

## Fluff skipped
Promise to put the list in the description.

## AI-era relevance hint
- These books teach judgment (design, feedback, delivery), which AI does not supply by default.
- "Everything is a guess" and "build feedback loops" apply even more when AI makes producing guesses (code) cheap.
- Thinking backwards from state B gives precise specs that AI agents can implement against.

## Coverage proof
- Lines read: 26 / 26
- Final line (verbatim): "because yeah, this is all about systems thinking too. So those are some of the books. I'll make sure that we have those in the description for the day."
