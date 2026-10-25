# Lesson 67 — Discussion: Bounded Contexts, Cohesion & Category Theory
- **Source file:** 67) Discussion Bounded Contexts, Cohesion & Category Theory.txt
- **Category:** theoretical-ddd
- **Topics:** bounded-contexts, subdomains, ubiquitous-language, cohesion, coupling, category-theory, abstraction, responsibility-driven-design, Aristotle, class-design

## Summary
A short Q&A between the FeedBook subdomain and bounded-context demos. Khalil says experienced designers can skip subdomains and go straight to bounded contexts, which he usually does. A bounded context comes from combining subdomains that use the **same language**. You "act like Aristotle" and categorize. The same activity is **coupling and cohesion applied at the problem level**, and the same principle applies all the way down to classes. He illustrates cohesion with lettuce belonging to a burger creator rather than a job scheduler, and with a `User` class that has an out-of-place method. He gives a rough coupling example involving an injected dependency, which he admits isn't a great example.

## Core ideas
- Q: Should we find subdomains first or go straight to bounded contexts? A: Going straight is fine if you're good at it. Khalil usually does because he's done it many times.
- Next step after subdomains: look at them and **combine the ones that can be combined**.
- "Act like you're Aristotle": "ah, this is actually part of this topic", and so on.
- You create the major domains so that the **language used within each one is the same**.
- Example: book feedback and emoji management use the same language, so combine them and call the result **Feedback**.
- Q (Bashman): does this algorithm apply to a whole project, or at smaller scale like FA²STR? A: It's **coupling and cohesion at the problem level**. "We're doing coupling and cohesion everywhere."
- Coupling and cohesion are "two major overarching principles of what makes software just really hard to get right." If they're unfamiliar, look them up.
- Khalil files coupling, cohesion, responsibility-driven design, and category theory under one essential ([transcript: "finally an active cohesion"], unclear). He calls all of it **"abstraction design"**: "what belongs together, what doesn't belong together."
- **Cohesion** example: categories `JobScheduler` and `BurgerCreator`. Lettuce belongs with `BurgerCreator` because it's more cohesive there.
- The same applies at class level (see Code discussed).
- **Coupling**: when a thing refers to something it isn't related to. Example: `User` gets an injected `SpinnyHatCounter` dependency. Coupling is about **relatedness** and **tightness to what it relates to**. Khalil calls it a nuanced topic and says the spinny-hat example isn't the best coupling example. He may revisit it later.

## Named frameworks / mental models
- **"Be Aristotle" categorization**
  - Purpose: consolidate subdomains into bounded contexts.
  - Steps: look at each subdomain → ask "is this actually part of that topic?" → group those sharing the same language → name the group.
  - When: moving from problem space (subdomains) to solution space (bounded contexts).
- **Coupling & cohesion at every level**: the same principle applies at problem level (bounded contexts) and class level (methods and dependencies).
- **Abstraction design** (Khalil's umbrella): coupling, cohesion, RDD, and category theory all ask "what belongs together, what doesn't."

## Definitions
- **Bounded context** — a major domain formed by combining subdomains, inside which the same language is used.
- **Cohesion** — how well things belong together, i.e. which category something is more cohesive with.
- **Coupling** — a thing referring to or depending on something it isn't related to. It's about relatedness and tightness to what it relates to.

## Rules & heuristics
- Skipping subdomains is fine once you're experienced.
- Combine subdomains that use the same language (book feedback + emoji management → Feedback).
- To test cohesion, ask which category an item is more cohesive with.
- If a class method obviously doesn't fit (e.g. spinny hats on `User`), cohesion is broken. Move it out.

## Anti-patterns / mistakes called out
- A class with an unrelated method (`getNumberOfSpinnyHatsWornInPastWeek` on `User`) breaks cohesion.
- Injecting an unrelated dependency (a spinny hat counter into `User`) is coupling to something it isn't related to.

## Code discussed
Class-level cohesion and coupling illustration, described verbally:
```ts
// reconstructed from narration
class User {
  constructor(private spinnyHatCounter: SpinnyHatCounter) {} // coupling to an unrelated dependency

  getEmail() {}          // fine
  changePassword() {}    // fine
  getNumberOfSpinnyHatsWornInPastWeek() {} // breaks cohesion
}
```
Category example: `JobScheduler` vs `BurgerCreator`; the item `Lettuce` goes to `BurgerCreator`.

## Diagrams / visual models described
- Quick sketch of three boxes: "job scheduler", "burger creator", "lettuce". Lettuce gets drawn toward burger creator.
- `User` class box listing `getEmail`, `changePassword`, and `getNumberOfSpinnyHatsWornInPastWeek`, with the last one flagged. A `SpinnyHatCounter` dependency is shown injected.

## Notable quotes
- "It's where you're going to act like you're Aristotle a little bit."
- "The language that you're going to use within that domain… is going to be the same language."
- "This is just coupling and cohesion at the problem level. We're doing coupling and cohesion everywhere."
- "It's what belongs together. What doesn't belong together?"
- "It's just really about a relatedness and it's about tightness to what it relates to."

## Cross-references
- Lesson 66 (subdomain brainstorm), the input to this step.
- Lesson 68 (consolidating subdomains into bounded contexts), which applies this in the demo.
- Lesson 14 (Abstraction), Lesson 17 (Horizontal Decoupling), Lesson 19 (Composition), Lesson 38 (RDD).

## Fluff skipped
Khalil remarks that it's late for him, plus some filler interjections.

## AI-era relevance hint
- Agents readily add unrelated methods or dependencies to existing classes. Reviewers need a strong cohesion sense to catch the "spinny hats" additions.
- Grouping by shared language gives agents clear module boundaries and naming scopes, which reduces cross-context bleed in generated code.

## Coverage proof
- Lines read: 28 / 28
- Final line (verbatim): "task at hand, right? Okay, great. I just want to make sure we're going to. Cool. Ballet."
