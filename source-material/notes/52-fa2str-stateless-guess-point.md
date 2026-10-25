# Lesson 52 — How to Use FA²STR: TDD's Upfront & Emergent Design @ The Stateless Guess Point
- **Source file:** 52) How to Use FAВІSTR TDD_s Upfront & Emergent Design @ The Stateless Guess Point.txt
- **Category:** workflow
- **Topics:** fa2str, upfront-design, emergent-design, stateless-guess-point, responsibility-driven-design, doing-knowing, examples, system-under-test, automate, arrange-act-assert, fake-it, obvious-implementation, rule-of-three, password-validator

## Summary
After drilling the emergent mechanics (red-green-refactor, the three laws of TDD) on FizzBuzz and Palindrome, the course now adds FA²STR's **upfront** design part at the stateless guess point, using the Password Validator. Khalil walks through each FA²STR step's inputs and outputs. **Find** turns a problem statement into responsibilities (doing/knowing) and concrete examples, and also determines the starting guess point. **Architect** decides the subject under test (a function or static method at the stateless level). **Automate** establishes how you'll test it. **Specify / Test** go example by example with AAA, subject verification, and fake it or obvious implementation, committing as you go. **Refine** refactors with the rule of three, commits, and loops. At the stateless level this can all happen in your head, but you should build the metacognitive habit because higher guess points will demand it on paper.

## Core ideas
- FA²STR has two parts: upfront (theoretical design) and emergent (the physical mechanics: red-green-refactor, three laws of TDD). They're hard to learn together, so the course taught emergent first.
- FA²STR is the design method used across the program to solve problems at every guess point in a consistent way. The stateless guess point is the first feedback-loop level.
- Stateless problems are just inputs, outputs and maybe processing, so you can solve them in your head. Complex problems need upfront design on paper, a whiteboard, or the three-step responsibility-driven design process (covered later).
- Higher levels are harder: the application level is "quite involved". End-to-end examples include a scraper, browser automation and a Chrome extension.
- **Responsibilities** (from Responsibility-Driven Design) are either **doing** or **knowing**. Example: a `User` class `setName` (doing) and `getName` (knowing). All requirements are either things done or things known.
- Password Validator example of Find:
  - Doing: *validate password*.
  - Knowing: passwords between 5 and 15 characters are valid, so outside that range is invalid. Passwords without at least one digit are invalid. And so on.
  - It's one doing with many knowings, and the knowings are most of the tests you'll write.
- **Determine the starting guess point from the problem statement.** It hints at the system under test (what we're testing, which components). Later assignments won't say which guess point to start at. You'll find it by elimination and by mapping the statement to a subject under test. The same problem could be tackled at end-to-end, application or stateful points.
- **Examples** are concrete instances of responsibilities (e.g., "mom" is/isn't …, "55555" [as transcribed: "mom and then five, five, five"]).
- **Working memory limit:** "the mind can only hold up to, I think like four pieces of information at a time". Collaborating objects and relationships exceed that. Examples: designing autosuggestion in a text editor, or logic assigning a skin to a weapon in CS:GO. Relationships imply collaborations, which mean more moving parts.
- Build **metacognition**: be aware of the upfront steps even when you do them mentally.
- **Automate** means knowing how you'll test before writing code. Sometimes it's genuinely unclear, e.g., cross-system integrations, web scrapers, browser automation, Chrome extensions. In this course the starter project already provides the scripts.

## Named frameworks / mental models
- **FA²STR** (Find, Architect, Automate, Specify, Test, Refine), a loop:
  1. **Find**. In: problem statement / design story / rough description / vague example. Out: responsibilities (doing/knowing) plus concrete examples, and the starting guess point (system under test).
  2. **Architect**. In: responsibilities plus examples. Out: subject under test (stateless → function or static method), carried forward with responsibilities and examples.
  3. **Automate**. In: responsibilities, examples, SUT. Out: a clear picture of how to test it (test harness/scripts).
  4. **Specify**. Pick one example and write the test specification.
  5. **Test**. Write test and production code using arrange-act-assert and subject verification. Pass via fake it or obvious implementation. Commit.
  6. **Refine**. The refactor step: remove duplication by the rule of three (only if seen three times), commit, then line up the next test. Loop back to Specify.
  - When: every problem at every guess point. Upfront steps can be mental at the stateless level.
- **Responsibility-Driven Design: doing vs knowing** — classify every requirement as a behavior (doing) or a piece of knowledge (knowing).
- **Upfront vs emergent design** — upfront covers Find, Architect and Automate (theory). Emergent covers Specify, Test and Refine (the red-green-refactor mechanics).

## Definitions
- **Responsibility** — something an object/function does or knows.
- **Doing** — an action, e.g., `setName`, `validatePassword`.
- **Knowing** — knowledge implied by a rule, e.g., `getName`, "knows passwords without a digit are invalid".
- **System (subject) under test** — what you're actually testing and which components are needed. At the stateless point, a function or static method.
- **Stateless guess point** — the first feedback-loop level: data in, data out.
- **Examples** — concrete input/output instances of responsibilities.

## Rules & heuristics
- Start with Find: derive responsibilities and examples from the problem statement, and determine the guess point first.
- Keep "doings" few and "knowings" many. Knowings map to tests.
- Know how you'll test (Automate) before writing code.
- Emergent loop: one example → specify → AAA → fake it / obvious → commit → refactor with rule of three → commit → next.
- Practise metacognition on simple problems so the process scales.

## Anti-patterns / mistakes called out
- Jumping straight to code on complex problems (collaborating objects) without upfront design.
- Starting to code without knowing how the thing will be tested.
- Refactoring without having seen duplication three times.

## Code discussed
Find step applied to the Password Validator. Khalil jotted this in a file (possibly a todo file, "[to view] file" in transcript):

```ts
// reconstructed from narration — Find-step notes (responsibilities & examples)
// Doing:
//   - validate password
// Knowing:
//   - knows passwords between 5 and 15 characters long are valid
//   - knows passwords outside 5–15 characters are not valid
//   - knows passwords without at least one digit are not valid
//   - ... (remaining criteria from the problem statement)
// Architect: subject under test = a function or static method (stateless guess point)
```

- `User` illustration: `setName` = doing, `getName` = knowing.

## Diagrams / visual models described
- **FA²STR loop diagram** showing the inputs and outputs of each step (Find → Architect → Automate → Specify → Test → Refine → loop). The emergent part (red-green-refactor, three laws of TDD) is at the bottom of the diagram.
- The problem statement on screen for the Password Validator.

## Notable quotes
- "There's two parts to this. There's the upfront and there's the emergent."
- "All of your requirements ever are going to be things that are done or they're going to be things that are known."
- "It is just one thing we're doing and we have all of these different knowings. And this is really going to be the majority of the tests that we're writing."
- "It's super important for you to be able to have at least a picture of that… before you begin to write your code."
- "Relationships… implies collaborations, which implies that they're going to be more complex and there's more moving parts."
- "Use the rule of three to remove duplication… only… if you've seen duplication three times."

## Cross-references
- Lesson 27 (FA²STR overview)
- Lesson 38 (Responsibility-Driven Design)
- Lesson 51 (AAA backwards, programming by wishful thinking)
- Lesson 53 (Subject verification: result, state, communication)
- Lessons 54–55 (Password Validator: upfront, then emergent)
- Lesson 15 (Feedback loop, guess points)
- Lesson 9 (Systems thinking)
- Transformation priority premise (upcoming in this module)

## Fluff skipped
Greeting, recap of prior modules, sign-off.

## AI-era relevance hint
- The upfront FA²STR steps (Find, Architect, Automate) are what you hand to an AI agent: responsibilities, concrete examples, SUT and a test harness make a strong spec.
- Doing/knowing decomposition turns vague tickets into enumerable test cases that agents can implement one at a time.
- Picking the right guess point (unit vs application vs E2E) is a judgment call agents usually get wrong without guidance.

## Coverage proof
- Lines read: 85 / 85
- Final line (verbatim): "the state and stuff. So go ahead, do the assignments, move through the modules. With that said, as always to mastery."
