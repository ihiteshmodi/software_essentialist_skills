# Lesson 58 — Discussion: Stats Calculator Review #1
- **Source file:** 58) Discussion Stats Calculator Review #1.txt
- **Category:** kata-review
- **Topics:** code-review, stats-calculator, fa2str, clarify-before-you-verify, api-design, responsibilities, it.each, parameterization, encapsulate-what-varies, naming-examples, edge-cases, baby-steps, strict-typing

## Summary
Khalil reviews a Stats Calculator submission. The kata processes a sequence of integers and reports statistics on them. The challenge is that there are many ways to implement the how (return an object, a string or an array) for the same what. He adds a new FA²STR Find-step principle, **"clarify before you verify"**: get clear on the input/output shapes and how you'll verify each responsibility before coding. The student did this well, defining and strictly typing the return shape in the first commit. Main feedback: (1) parameterize with `it.each`, which he later added to the grading checklist as a key refinement; (2) replace names like "first input / second input / third input" with names that express the case ("input containing zeros", "input with negative numbers"); (3) encapsulate what varies instead of repeating stringly-represented examples in test names and data.

## Core ideas
- The kata's high-level functionality is the what. How to return it (object, string, series, array) is the how, and there are many valid choices. "That is a key distinction."
- Find step: identify **responsibilities** (what the system should know and do, taken from the description) plus examples.
- New principle: **clarify before you verify**. Get clear on what the objects look like (input and output) and how you'll verify the responsibilities. This is where you choose object vs string vs array.
- Upfront work can happen in your head in a split second, or you can take a moment before stepping into emergent tests.
- Working code is good. Following the grading checklist is what makes it exceptional.
- Good structure seen: **responsibility wrapping examples** (responsibility, example, example, responsibility, example, example).
- Commit history can't fully show backwards thinking or wishful thinking, but it can show **baby steps**, which is ideal.
- The student clarified before verifying: defined the return structure right away and strictly typed it (`calculateStats`, a function taking numbers and returning stats).
- **Encapsulate what varies**: example inputs repeated as strings in several places should be one thing, so a change is reflected everywhere. Parameterization does this.
- Ben's question: with cases for all-positive integers, integers including zero and all-negative integers, should the intent be stated explicitly? Khalil's answer: yes, through **names**. Name the example data sets after the edge case they represent.
- "Names are not something to be wasted. Names actually do a lot."
- Review videos aren't saying you did something wrong. There are always ways to take things further.

## Named frameworks / mental models
- **Clarify before you verify** (FA²STR Find step)
  - Purpose: settle the input/output shape and verification approach before writing tests.
  - Steps: list responsibilities, list examples, decide the output data structure (object/string/array), decide how each responsibility will be asserted.
  - When: at the start of any kata/feature, especially when many hows are possible.
- **What vs how**: the kata's reporting requirement vs. its representation.
- **Responsibility wraps examples**: `describe`/`it` per responsibility containing concrete examples.
- **Encapsulate what varies**: via `it.each` parameterization.

## Definitions
- **Responsibilities** — things the system should know and do, taken from the problem description.
- **Clarify before you verify** — get clear on the input/output objects and how you'll verify the responsibilities before verifying (testing) them.

## Rules & heuristics
- Decide the return representation upfront, then strictly type it.
- Wrap concrete examples in responsibility-named blocks.
- Parameterize repeated examples with `it.each`. This is now a grading-checklist refinement.
- Don't represent the same example as strings in several places. Keep it in one place.
- Name example data sets after the case they express (e.g., "assignment input", "input containing zeros", "input with negative numbers", "five numbers").
- Take baby steps.

## Anti-patterns / mistakes called out
- Generic names `firstInput`, `secondInput`, `thirdInput` that hide which edge case each represents.
- Stringly duplicated examples across test names and data. A change in one place won't propagate.
- Un-parameterized repeated tests for min and max.

## Code discussed
**Student's final file:**
- Example data: `firstInput`, `secondInput`, `thirdInput` (integer arrays).
- Responsibility blocks: "should return minimum value among passed [integers]", "should return maximum value among passed [integers]", each with examples beneath. Max tests assert only against `max`, although other stats could also be asserted.
- Feedback: parameterize each group ("parameterize these, parameterize these and parameterize those").

**Commit walk-through:**
1. Started from nothing and defined the output structure immediately, strictly typed as the return of `calculateStats` [transcribed "calculate stacks"], a function that takes numbers and returns stats. Praised as an example of clarify before you verify.
2. Next test used the three example inputs. Suggested refactor: encapsulate the examples into the test code via parameterization.

**Khalil's naming embellishment (before → after):**
- `firstInput` → assignment input (the standard input from the kata)
- `secondInput` → input containing zeros
- `thirdInput` → input with negative numbers / five numbers

```ts
// reconstructed from narration
const assignmentInput = [/* standard kata input */];
const inputContainingZeros = [/* ... */];
const inputWithNegativeNumbers = [/* ... */];

describe("stats calculator", () => {
  it.each([
    ["assignment input", assignmentInput, /* expected max */ 0],
    ["input containing zeros", inputContainingZeros, 0],
    ["input with negative numbers", inputWithNegativeNumbers, 0],
  ])("knows the maximum value for %s", (_name, input, expectedMax) => { // wording (inferred)
    expect(calculateStats(input).max).toBe(expectedMax);
  });
});
```

**Summary of feedback:** (1) parameterization, the main point; (2) meaningful case names instead of first/second/third input; (3) encapsulate what varies (the string representations of examples), which parameterization solves.

## Diagrams / visual models described
- FA²STR notes for the assignment showing the Find step with responsibilities, examples and the new "clarify before you verify" note.

## Notable quotes
- "This is the what, and there's a number of different ways we can implement the how. So that is a key distinction."
- "Clarify before you verify."
- "Of course, it's always going to be good if it works, but what's going to make this really great and exceptional is if we have followed the grading checklist."
- "Always look for how you can encapsulate what varies."
- "Names are not something to be wasted. Names actually do a lot."
- "These videos aren't really saying you're doing anything wrong. These are just ways that we could take things further."

## Cross-references
- Lesson 27 (FA²STR)
- Lessons 55–57 (Password Validator, `it.each`, encapsulate what varies)
- Lesson 59 (Stats Calculator Review #2)
- Lesson 53 (verification, "how to verify")

## Fluff skipped
Greeting, Discord navigation, reading pauses, sign-off.

## AI-era relevance hint
- "Clarify before you verify" is how to prompt an agent: fix the output contract and verification method first, and implementation choices stop drifting.
- Naming test data after edge cases makes gaps in AI-generated coverage obvious (e.g., no "input with negative numbers").
- Parameterized, named example sets are easy for both humans and agents to extend safely.

## Coverage proof
- Lines read: 61 / 61
- Final line (verbatim): "you."
