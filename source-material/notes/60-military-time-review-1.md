# Lesson 60 — Discussion: Military Time Validator Review #1
- **Source file:** 60) Discussion Military Time Validator Review #1.txt
- **Category:** kata-review
- **Topics:** transformation-priority-premise, tpp, simplest-transformation, fake-it, decomposition, functional-approach, co-location, encapsulation, responsibility-specification, concrete-examples, parameterized-tests, open-closed-principle, commit-story, comments

## Summary
Khalil starts by restating the Military Time Validator assignment. You get a string that may be a valid or invalid military time range, and you write a function or stateless class that detects which. The skill this assignment (and the next one, the Boolean Calculator) trains is choosing the simplest transformation with the Transformation Priority Premise (TPP) table. He explains how to rank transformations and where TPP gets applied in FA²STR. He then reviews Loki's functional-style submission commit by commit. He calls it exemplary: it decomposes the problem into tiny range checks, composes them upward into `isMilitaryTime`, and has "some of the most readable commits in a story of commits" he's seen. His only suggestions are to delete the comments and parameterize the duplicated examples (open-closed).

## Core ideas
- Assignment: given a string like `"01:12 - 14:32"`, detect whether it's a valid military time range. The example format is inferred; the narration only says "a string of times" and shows a valid and an invalid range.
- Main focus for this assignment and the next: **prefer the simplest transformations**, using the TPP table.
- Transformations are ranked by complexity:
  1. return nothing (nil). Fake it can start here, so the first test fails for the right reason while on red.
  2. return a constant.
  3. combine constants (e.g., add two constants).
  4. scalars / use arguments.
  5. a single statement, i.e. a functional expression that calls methods/functions/"service providers" like `min` and `max`.
  6. multiple statements: a conditional then a return.
  7. more conditionals and more statements.
- If you feel you need to add a variable or mutate something, question that transformation. Ask whether one of the simpler ones would do.
- TPP applies in **two places**: the **Test** step of FA²STR, where you keep your obvious implementation to the simplest option on the list every time, and the **Refine/refactor** step.
- The Boolean Calculator has "one other aspect" that makes it more complex (not elaborated here).
- Good test files end up as responsibility specification → examples, repeated. Concrete examples lead the code through commits, especially when starting from scratch.
- Decomposition strategy (praised): find the smallest responsibility (is a value in range?), build on it (hour in range, minute in range), combine (valid time), then combine again (valid time range).
- Functional vs OOP co-location. In the functional approach, state and behavior that belong together sit in the same file ("co-location"). In OOP they're encapsulated together in a class, because the behavior and the data it operates on belong to the same concept.
- In the functional approach, **not exporting** internal helpers is how you encapsulate.

## Named frameworks / mental models
- **Transformation Priority Premise (TPP) table**
  - Purpose: rank the code transformations used to get from red to green (and during refactoring) by complexity, so you always pick the simplest.
  - Components (in order): nil → constant → combine constants → scalars/arguments → single statement / functional expression → conditional + return → multiple conditionals/statements (variables and mutation are high on the list).
  - When: at the FA²STR Test step when writing production code, and at the Refine step.
- **Responsibility specification → examples** test layout
  - Purpose: readable tests. A high-level behavior description, then concrete examples under it.
  - When: this is where you end up after refactoring tests that started as concrete examples.
- **Bottom-up decomposition into building blocks**
  - Purpose: solve a multi-rule problem by finding the tiniest responsibility and composing upward.
  - Steps (Loki's version): `isInRange` → `isHourInRange` / `isMinuteInRange` → `isValidTime` → `isMilitaryTime`, then add format checks (`hasValidTimeFormat`, `hasValidTimeRangeFormat`).
- **Co-location (functional) vs class encapsulation (OOP)**: two ways to keep state and behavior together.
- **Open-closed principle (applied to tests)**: parameterize examples so a new case means adding a row, not duplicating a test.

## Definitions
- **Transformation Priority Premise** — a table ranking transformations from simplest (return nil, return a constant) to most complex (multiple statements, conditionals, variables/mutation). Used to limit how much code you write per step.
- **Co-location** — in the functional approach, keeping state and behavior together in the same file/place.
- **Class** — in OOP, the concept that encapsulates behavior together with the data it operates on.
- **Open-closed principle** — "express your code in such a way that if you need to add something new, all you have to do is add on top of it. And you're not duplicating it either."

## Rules & heuristics
- Every time, keep your obvious implementation to the simplest transformation available.
- Needing a variable or mutation is a signal to question your transformation.
- Use TPP both when writing production code and when refactoring.
- Start from concrete examples, then end up with responsibility specification + examples.
- Name tests in a domain-driven way ("should return true if time range is valid").
- Break the problem into the tiniest responsibility and use those as building blocks.
- Don't export what isn't needed (functional encapsulation).
- Regex is fine, but the problem can be solved without it.
- Parameterizing tests is optional ("a technique"), but good practice.

## Anti-patterns / mistakes called out
- Jumping to complex transformations (variables, mutation) when a simpler one would do.
- Comments that aren't needed. Khalil asks, "do we really need comments? I wouldn't say we do."
- Duplicated test examples that could be parameterized.

## Code discussed
**Submission:** Loki's first attempt, a functional approach "focusing on creating modular, readable, easily testable code". Commits were labelled red/green/refactor. It was submitted before Khalil's advice to use PRs, so he walked through the commits and the final code.

**Test file (final):**
- `describe`/responsibility specs: "should return true if time range is valid" (success cases), failure cases, and "should return false if time range is not in format" (format failures).
- Khalil called the names clear, domain-driven and easy to read: responsibility specification plus concrete examples.

**Commit story (in order):**
1. Setup/config.
2. `isInRange`. Test: "should determine true if is in range". Examples: `isInRange(5, 0, 10)` → true, `isInRange(5, 6, 10)` → false.
3. `isHourInRange`: 5 → true, 25 → false.
4. `isMinuteInRange`: 5 → true, 61 → false. Minutes must be 0–59.
5. `isValidTime`: `time.split(':')`, `map` the parts to numbers, true if hour and minute are both in range.
6. `isMilitaryTime` ("implement is military time range"): splits into start and end and validates both. Tests are split into success and failure cases.
7. `hasValidTimeFormat`: introduces a time-format regex (colon, two digits) and tests it piece by piece.
8. Refactor `isValidTime` to use `hasValidTimeFormat(time)`.
9. `hasValidTimeRangeFormat`: "should return true [if] time range has valid format". An invalid example is missing the separator between the two times (separator character inferred to be `-`).
10. Refactor: splice `hasValidTimeRangeFormat` into `isMilitaryTime`.
11. "Extract time pattern into separate constant" (transcript: "Strat"). The pattern moves up to a module-level constant and is used for both sides of the range and for each time individually.
12. "Revise index file for clarification", which added comments. Khalil said they weren't needed.
13. "Move exports": removed exports that weren't needed. This is the practical encapsulation mechanism here.

```ts
// reconstructed from narration
// Exact regex, hour upper bound and separator are inferred.
const TIME_PATTERN = /^\d{2}:\d{2}$/;

const isInRange = (value: number, min: number, max: number): boolean =>
  value >= min && value <= max;

const isHourInRange = (hour: number) => isInRange(hour, 0, 23);
const isMinuteInRange = (minute: number) => isInRange(minute, 0, 59);

const hasValidTimeFormat = (time: string) => TIME_PATTERN.test(time);

const isValidTime = (time: string): boolean => {
  if (!hasValidTimeFormat(time)) return false;
  const [hour, minute] = time.split(':').map(Number);
  return isHourInRange(hour) && isMinuteInRange(minute);
};

// "time pattern being met on both sides"
const hasValidTimeRangeFormat = (range: string): boolean => {
  const parts = range.split(' - ');
  return parts.length === 2 && parts.every(hasValidTimeFormat);
};

export const isMilitaryTime = (range: string): boolean => {
  if (!hasValidTimeRangeFormat(range)) return false;
  const [start, end] = range.split(' - ');
  return isValidTime(start) && isValidTime(end);
};
```

**Khalil's improvement suggestions:**
- Delete the comments.
- Parameterize the duplicated examples (e.g., `it.each`) to remove duplication and make adding a case open-closed.
- Production code: "looks great". Unlike most students, who used classes, this solution encapsulates by not exporting helpers.

## Diagrams / visual models described
- TPP table, read top (simplest: nil, constant) to bottom (conditionals, multiple statements), with examples like `min`/`max` as a single functional-expression statement.

## Notable quotes
- "Some transformations are simpler than others."
- "If you feel like you need to add a variable or you think you need to do some mutations, question your transformation."
- "Using concrete examples to lead your code through your commits is always best."
- "You decomposed it all the way down from the smallest, tiniest responsibility."
- "It is some of the most readable commits in a story of commits that I've seen so far."
- "So do we really need comments? I wouldn't say we do."

## Cross-references
- Lesson 27 / 52 (FA²STR; Test and Refine steps where TPP applies)
- Lesson 48 (Don't write comments)
- Lessons 62–63 (Boolean Calculator, the next TPP assignment)
- Lesson 61 (Military Time Validator review #2, class-based decomposition)
- Lesson 36 (how much OOP; classes vs functions)

## Fluff skipped
Greeting, searching the community for submissions, sign-off.

## AI-era relevance hint
- AI agents tend to jump straight to the most complex transformation. TPP gives you a vocabulary for asking for, and reviewing, minimal diffs.
- A commit history that reads as a story (tiny responsibilities composed upward) makes AI-generated changes reviewable. A monolithic diff doesn't.
- Deciding what to export, and so what the encapsulation boundary is, stays a human design call even when an agent writes the helpers.

## Coverage proof
- Lines read: 78 / 78
- Final line (verbatim): "video and always to master."
