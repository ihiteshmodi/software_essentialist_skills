# Lesson 59 — Discussion: Stats Calculator Review #2
- **Source file:** 59) Discussion Stats Calculator Review #2.txt
- **Category:** kata-review
- **Topics:** code-review, stats-calculator, responsibility-specifications, knowing-and-doing, parameterization, it.each, what-vs-how, readability, over-refinement, api-design, domain-language

## Summary
Khalil reviews a second, partially finished Stats Calculator submission that already uses parameterization with three example sets. He'd bundle each input array with its expected values into one object instead of keeping separate arrays. He introduces the term **responsibility specification**: an `it` description naming a doing or a knowing (e.g., "it can calculate the minimum value"). A test spec has two parts: responsibility specs (abstract) and examples (as concrete as possible). The main critique is a test named after "returns an object" with its properties and arrays, which describes how. He'd rewrite it as "stats calculator returns a set of statistics for a list of integers." He also warns that you could refine examples forever. Don't over-invest, but never sacrifice readability.

## Core ideas
- The student parameterized with three examples. First element: input array. Second: expected result values. Khalil would **assemble them into one object** so they stay together.
- Partial work is still good enough to extract the lessons.
- **Responsibility specification**: any spec that names a doing or a knowing, e.g., "it can calculate the minimum value."
- Test specifications have two aspects:
  1. **Responsibility specifications**: name what the system knows or does. More abstract, no specific example.
  2. **Examples**: represent cases as concretely as possible.
- Guide your code with concrete examples and end up with abstract responsibility specs at the end.
- Parameterizing input data sets and running them against a responsibility spec makes sense. You can have several data sets.
- Three copies of the same pattern is duplication, a signal to refactor or refine.
- **Don't over-refine.** "You could spend so much time refactoring these examples." Focus on guiding the code and making it work. Collect the lessons, but know refinement can go on indefinitely.
- **Never sacrifice readability.** If responsibility specs lead, readers may need to dig into data sets a bit, but intent is clear upfront.
- A spec that says "returns an object" and lists result properties and arrays describes the how (technical). Rewrite to the what, and leave the how to the test body.
- Main lesson of this assignment: think through API design, work backwards, get clear on the what and then the how, then make it happen.
- Keep specs **domain-specific** and **responsibility-focused**. Reuse example sets throughout if duplicated.

## Named frameworks / mental models
- **Responsibility specification vs examples**
  - Purpose: structure tests so behavior (knowing/doing) is named abstractly and examples carry the concrete detail.
  - Components: responsibility spec (the `it`/`describe` title), example data sets (parameterized rows).
  - When: every test file. Lead with concrete examples, end with abstract responsibility specs.
- **What → how → make it happen**: the assignment's core sequence.
- **Refinement budget**: refine for readability, stop before endless polishing.

## Definitions
- **Responsibility specification** — a test description that names a doing or a knowing of the system (e.g., "it can calculate the minimum value"), without naming the specific example.

## Rules & heuristics
- Keep each example's input and expected outputs together in one object.
- Write `it` names as doings or knowings ("can calculate…", "knows…").
- Don't name return-object shapes, property names or data types in specs.
- Lead with concrete examples while driving, end with abstract responsibility specs.
- Refactor three-times duplication in examples.
- Don't sink excessive time into refining examples. Prioritize guiding the code, but never at the cost of readability.
- Use domain-specific language in specs.

## Anti-patterns / mistakes called out
- Separate parallel arrays for inputs and expected results instead of one object per example.
- Spec "returns an object… [result object with properties / arrays]": technical, describes how rather than what.
- Endless refactoring/refinement of examples (a trap to watch for).

## Code discussed
**Student's file:**
- `it.each` with three examples. Each row: input integer array, plus a separate structure holding the expected values (min/max/etc.).
- Specs: "it can calculate the minimum value" (praised as a responsibility spec in the right format), plus similar ones.
- One spec: "returns an object" / "returns a result object with [properties]… arrays". Criticized as how-focused.

**Rewrite (before → after):**
- "returns a result object with … properties" → "stats calculator returns a set of statistics for a list of integers".

**Suggested data shape (one object per example):**

```ts
// reconstructed from narration
const examples = [
  { input: [/* ints */], expected: { min: 0, max: 0 /* , ... */ } }, // fields (inferred)
  // ...
];

describe("stats calculator", () => {
  it.each(examples)("can calculate the minimum value", ({ input, expected }) => {
    expect(calculateStats(input).min).toBe(expected.min);
  });
});
```

Commits were not reviewed. Khalil considered the naming and API lesson more important.

## Diagrams / visual models described
None

## Notable quotes
- "Responsibility specifications are going to be anything that is a doing or a knowing."
- "If we're guiding our code, we want to end up with this at the very end. And we want to guide with more concrete examples."
- "You could spend so much time refactoring these examples."
- "One thing that I would never sacrifice on is just readability."
- "Stats calculator returns a set of statistics for a list of integers."
- "Keep this as domain specific as possible. Responsibility focused."

## Cross-references
- Lesson 58 (Stats Calculator Review #1, clarify before you verify)
- Lesson 56 (knowing/doing, decouple what from how)
- Lesson 55 (parameterization demo)
- Lesson 38 (RDD)

## Fluff skipped
Greeting, file navigation, repeated "Bye" at the end.

## AI-era relevance hint
- Agents readily write "returns an object with keys X, Y" specs. Rewriting them as responsibility specs keeps the suite stable when the agent changes representation.
- The "refinement budget" matters more with AI, since it is easy to over-polish generated tests. Stop at readable.
- Grouping each example's input and expectations in one object makes agent-added cases self-contained and reviewable.

## Coverage proof
- Lines read: 32 / 32
- Final line (verbatim): "mastery. Okay. Thank you. Bye. Bye. Bye. Bye. Bye. Bye. Bye. Bye."
