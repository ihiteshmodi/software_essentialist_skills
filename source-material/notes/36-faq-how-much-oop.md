# Lesson 36 — FAQ: How Much OOP Do I Need to Know?
- **Source file:** 36) FAQ How Much OOP Do I Need to Know.txt
- **Category:** faq
- **Topics:** OOP, functional vs object-oriented, abstraction, steps and events, encapsulation, information hiding, AI tools for learning

## Summary
You need very little prior OOP knowledge. Khalil gives a conceptual model: the highest level of abstraction is the high-level steps and events, whose subroutines must be carried out. With functions that means scripts talking to scripts. With classes it means a network of objects holding references to each other and collaborating. Objects are used from Best Practice First onward because they give expressiveness, control, encapsulation and information hiding.

## Core ideas
- Highest level of abstraction = high-level **steps and events**. Implementation = carrying out their subroutines.
- Two implementation styles:
  - **Functional**: "scripts talking to other scripts".
  - **Object-oriented**: "a network of objects that talk to each other that do work". Objects hold connections/references to other objects.
- Syntax is easy to pick up. Use AI tools to ask "what is this?" and "why did we do this?".
- Objects are introduced in Best Practice First and used mostly from then on. Khalil explains why as they come up.
- Why Khalil prefers objects: expressiveness, control, and good support for encapsulation and information hiding.

## Named frameworks / mental models
- **Functional vs OO conceptual model**: the same steps/events abstraction implemented as script-to-script calls vs an object network. Use it to see that the paradigm is an implementation choice under the same abstraction.

## Definitions
None

## Rules & heuristics
- Don't front-load OOP study. A quick crash course is optional and "probably not necessary".
- Use AI assistants to learn unfamiliar syntax on demand.

## Anti-patterns / mistakes called out
None

## Code discussed
None

## Diagrams / visual models described
- Functions: script → script → script chain.
- Objects: a graph/network of objects with references to one another, collaborating to do work.

## Notable quotes
- "The highest level of abstraction is just the high level steps and events."
- "It's going to be a network of objects that talk to each other that do work."
- "You don't actually need to know anything about object oriented programming."
- "I also think it does encapsulation and information hiding very well."

## Cross-references
- Lesson 14 (Abstraction), Lesson 19 (Composition)
- Best Practice First phase
- Lesson 38 (RDD, object network and roles), Lesson 79 (Abstraction & Levels of Realness)

## Fluff skipped
None substantial.

## AI-era relevance hint
- Syntax knowledge is commoditized by AI. The steps/events abstraction and choosing between an object network and a function pipeline are what the human decides.
- Encapsulation and information hiding limit how far an AI change can spread through the code.

## Coverage proof
- Lines read: 12 / 12
- Final line (verbatim): "on it. I don't think that would particularly be necessary."
