# Lesson 61 — Discussion: Military Time Validator Review #2
- **Source file:** 61) Discussion Military Time Validator Review #2.txt
- **Category:** kata-review
- **Topics:** parameterized-tests, open-closed-principle, responsibility-specification, decomposition, levels-of-abstraction, fake-it, refactoring, class-based-solution, static-method, interfaces, commit-story

## Summary
Khalil reviews Kareel's [spelling uncertain] class-based Military Time Validator. The tests are parameterized and grouped under high-level responsibility specifications ("valid time", "invalid time because of hours", "…because of syntax"), which he calls "super open closed". The production code splits the problem into small responsibilities (`Time`/`TimeRange` interfaces, `isHourValid`, `isMinuteValid`, `isTimeValid`, start < end), and the top-level method reads like the algorithm: parse, validate start, validate end, check start < end. He walks the commits and praises fake-it at the start, the refactor that groups tests by validity, and helpers that later coalesce into one `isTimeValid`. Along the way he explains **levels of abstraction**, from explaining the problem out loud down to private helpers. He has no strong change requests and calls it exemplary.

## Core ideas
- Parameterized tests keep the suite open-closed: adding a new example means adding a row in the middle.
- Test structure: responsibility specification → examples, repeated for each category (valid, invalid, invalid because of syntax, invalid because of hours).
- A single non-parameterized example is fine when it's just one specific case.
- This problem is more complex, so you have to decompose it. Write it out on paper if you have to.
- Technique: **find all the responsibilities**, meaning all the little things you need to detect or know. Model each as a tiny function. If you can solve one small part, you can solve all of it by piecing them together. Lesson 60's functional approach showed the same thing.
- The top-level method should read like the steps you'd describe to someone solving it on paper.
- Responsibilities (doings and knowings) are functionally the requirements, e.g. "can detect valid time", "can detect invalid time because of hours".
- Refactorings that pull the highest level of production code into a simple object make the code read at the right level of abstraction.
- Levels of abstraction are a key topic. Development is a gradient-like movement from theoretical to physical.

## Named frameworks / mental models
- **Levels of abstraction (from explanation down to code)**
  - Purpose: know which layer you're writing at, and keep each layer readable at its own level.
  - Layers (highest → lowest):
    1. You explaining the problem out to someone.
    2. Writing the specifications.
    3. Writing the test code.
    4. The first level of production code: the object, static method or function called directly to kick off the system under test. It reads as the algorithm's steps.
    5. Encapsulated lower-level steps behind the scenes, which you only see if you "descend a layer deeper".
  - When: always. It's a "gradient-like movement from theoretical to physical".
- **Responsibility discovery → tiny functions → compose**
  - Steps: list every responsibility needed to detect or know something, implement each as a tiny function, then compose them at the top level.
- **Open-closed tests via parameterization**: see Lesson 60.

## Definitions
- **Responsibilities** — "the responsibilities of doings and knowings". Functionally the requirements, e.g. "can detect valid time".
- **First level of production code** — "the direct object or static method or function that gets called upon in order to kick off the system under test".

## Rules & heuristics
- Parameterize examples under a responsibility spec so new cases are additive.
- Group tests by category/validity in a refactor step, once the examples exist.
- Start with a basic valid example and fake it.
- Add the next example (a falsy one) to force real logic.
- Coalesce helpers when they turn out to be the same concept (hour and minute checks merge into `isTimeValid`).
- Keep the top-level function algorithmic: a few named steps.
- A static method is fine instead of instantiating a class ("not a huge deal").

## Anti-patterns / mistakes called out
- None significant. Only a minor note: the exported class has to be instantiated, and a static method would also work.

## Code discussed
**Submission:** Kareel's first attempt, 139 lines changed. Khalil read the final code first, then the commits.

**Tests (final):**
- Parameterized (`it.each`-style): "is a valid military time range".
- Responsibility specs: **valid time**, **invalid time**. One specific non-parameterized invalid example, then more specific invalid times "because of syntax" and "invalid time because of hours", each with many examples, covering "a lot of weird stuff".

**Production code (final):**
- Interfaces `Time` and `TimeRange`, plus splitting and parsing.
- A `time` file with `isHourValid`, `isMinuteValid`, `isTimeValid` and a start-time-less-than-end-time check.
- An exported class whose method does: parse the time range → is start valid → is end valid → is start < end. Khalil: "the algorithm really is those four things."

**Commit story:**
1. Basic valid example, faked.
2. A falsy example starting with hour `25`. Introduced `getTimeRangeParts` and `parseInt`, and checked end hour ≤ 24 as narrated.
3. Refactor: "group test by validity". Specs became something like "can detect valid time", "can detect invalid time because of hours", "can detect when things are not valid time ranges".
4. Checked start/end hours are ≥ 0 and < 24. Introduced an `isHourValid` helper, split and renamed, and parsed the values.
5. Added minute checks "just like that".
6. Refactor: removed `isHourValid` and merged everything into `isTimeValid`, used for both start and end, plus a `parseTimeRange`. `isTimeValid` now does the hour and minute checks.
7. Added a check that the number is finite, so non-numeric input can't pass (inferred: `Number.isFinite`).
8. Last step: start time must be less than end time. Several examples had to change.

```ts
// reconstructed from narration
// Names from narration; exact signatures and bodies are inferred.
interface Time { hours: number; minutes: number }
interface TimeRange { start: Time; end: Time }

export class MilitaryTimeValidator {
  isValidRange(input: string): boolean {
    const range = parseTimeRange(input);
    return isTimeValid(range.start)
      && isTimeValid(range.end)
      && isStartTimeLessThanEndTime(range);
  }
}
```

```ts
// reconstructed from narration
describe('military time validator', () => {
  describe('valid time', () => {
    it.each([/* ...valid ranges... */])('%s is a valid military time range', (input) => {
      expect(new MilitaryTimeValidator().isValidRange(input)).toBe(true);
    });
  });
  describe('invalid time because of syntax', () => { /* it.each([...]) */ });
  describe('invalid time because of hours', () => { /* it.each([...]) */ });
});
```

**Verdict:** "I don't really think I have any strong things I would change." Recommended as a reference: "walk through the commits".

## Diagrams / visual models described
- Verbal ladder of abstraction levels: explanation → specification → test code → first level of production code → encapsulated helpers.

## Notable quotes
- "Super open closed, which means you could just add another one of these right in the middle."
- "If you could just solve a small part of this you could solve all of it because you could piece them all together."
- "The simplest level of abstraction you're ever going to have is you explaining the problem out to someone."
- "At this highest level of abstraction we're looking at the steps."
- "We're doing that sort of gradient like movement from theoretical to physical."
- "I think this is an exemplary demonstration."

## Cross-references
- Lesson 60 (Military Time review #1, functional decomposition)
- Lesson 14 (Essential: Abstraction, layers of abstraction)
- Lesson 51 (AAA backwards / wishful thinking; top-down steps)
- Lesson 53 (verification types)

## Fluff skipped
Greeting and closing sign-off.

## AI-era relevance hint
- A top-level function that reads like the algorithm is the best review surface for AI-written code. Check the steps first, then descend only where needed.
- Responsibility lists (doings and knowings) make precise prompts and acceptance criteria for agents.
- Parameterized, category-grouped tests let you (or an agent) add edge cases cheaply without touching structure.

## Coverage proof
- Lines read: 56 / 56
- Final line (verbatim): "in the next one and as always to mastery you"
