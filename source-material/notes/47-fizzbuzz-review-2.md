# Lesson 47 — Discussion: FizzBuzz Review #2
- **Source file:** 47) Discussion FizzBuzz Review #2.txt
- **Category:** kata-review
- **Topics:** code-review, fizzbuzz, obvious-implementation, fake-it, avoid-else, one-it-one-expect, concrete-examples, nested-describe, test-naming, commit-messages, toThrow, it.each, rule-of-three

## Summary
Khalil reviews a FizzBuzz PR that includes the grading checklist. It is strong overall, and the end result uses `it.each` well. The main feedback covers several points. Avoid `else`/`else if` and prefer early-returning `if`s. Never put more than one example (`expect`) in a single `it`, so the rule is "one it, one expect". Put concrete example values (15, 7, 43, 102) in test names and commit messages instead of abstract behavior statements, and move abstract behavior descriptions into nested `describe` blocks. He also answers a question about handling non-number inputs in TypeScript: extending an assignment is allowed as long as tests express the extra behavior.

## Core ideas
- **Extending assignments:** you may add requirements (e.g., non-number inputs) if tests cover them. First make sure you meet what the assignment actually asks for.
- **Obvious implementation vs fake it:** the student jumped straight to the real implementation. That's fine when you're confident and saves time. On more complex assignments you'll sometimes want to fake it.
- **Avoid `else`:** each conditional creates more code paths. Prefer early returns or plain `if`s. Having an `else` or not gives the same behavior here, so drop it. Khalil also likes one-line `if`s.
- **One example at a time:** adding several examples at once means that if one fails, you don't have a clean, specific reason.
- **Concrete over abstract:** as problems get more complex, keep concrete examples front and center in `it` names. Abstract behavior belongs in a nested `describe`.
- **Abstract tests lead to smells:** doing things twice in the same test and putting multiple examples in one test.
- **Commit messages must be understandable:** "handle when the input is not divisible by three and five" doesn't say what should happen. Better: "when given 43, returns '43'".
- **Testing throws:** the call has to be wrapped in a function (`expect(() => fizzBuzz(102)).toThrow()`), otherwise it won't be caught.
- **Review tactic:** Khalil now looks at the end result first, then walks back through the commits.
- **Rules can bend:** "Rules are meant to be broken as well, especially if it helps you go faster", as long as you end up in the right place. In this section, though, the point is building the muscle.

## Named frameworks / mental models
- **One it, one expect** (rule)
  - Purpose: each test case maps to exactly one concrete input/output example, so failures are unambiguous.
  - When: always. It matters most as use cases get complex.
- **Abstract describe / concrete it** (test structure)
  - Nested `describe` states the abstract behavior ("returns FizzBuzz when divisible by both 3 and 5").
  - Inner `it`s are concrete examples ("returns 'FizzBuzz' for 15").
- **Five tips to name your tests** (referenced module): structure tests like sentences, use examples to avoid abstract technical language, and use a single example per test case.

## Definitions
- **Obvious implementation** — writing the real logic immediately instead of faking it.
- **Code path** — each branch introduced by a conditional. More branches mean more paths.

## Rules & heuristics
- One `it`, one `expect`. No more.
- Put the concrete value in the test name (e.g., "…for 15", "…for 7", "…for 102").
- Put abstract behavior descriptions in `describe` blocks, not in `it` names.
- Add only one example at a time unless you're very confident.
- Avoid `else` / `else if`. Use early returns and plain `if`s.
- Commit messages should say concretely what happens ("when given 43 returns '43'").
- Wrap throwing calls in a function inside `expect`.
- You can extend assignments if tests express the extension.

## Anti-patterns / mistakes called out
- `if / else if / else` chains that create extra code paths.
- Two or three examples in one `it` (15 and 45 together, then three in another). One test ends up with several ways to fail.
- Abstract test names like "should return FizzBuzz when input is divisible by both three and five" with no concrete value.
- Vague test/commit wording: "handle when the input is not divisible by three and five".
- Adding many examples at once.

## Code discussed
**Student PR walk-through (in order):**
1. **Red:** `describe FizzBuzz` → "should return Fizz when input is divisible by three". The implementation existed but returned nothing, so it failed for the right reason and compiled. Good.
2. **Green:** obvious implementation of divisible-by-three. Fine.
3. **Refactor:** skipped. Nothing to refactor yet.
4. **Red/Green:** "should return Buzz when divisible by five", implemented with `else if`. Feedback: avoid `else`, return early.
5. **Red/Green:** "should return FizzBuzz when input is divisible by both three and five". Now three branches (both / three / five). Two examples (15, 45) sit in one `it`. Feedback: split them into separate `it`s. Use 15 in the name. Optionally nest under a `describe`.
6. Another test with three examples in one `it`. Same feedback: pull them out.
7. "handle when the input is not divisible by three and five" returns the number as a string. Feedback: say what happens. Use 7 or 43 in the name, e.g. "when given 43 returns '43'".
8. **Refactor:** "merge duplication of checking divisibility by … into its own variable" (`isDivisibleBy…` variables). Good, readable, an improvement. Still suggests removing `if/else if`, which behave the same without `else`, and putting them on one line.
9. "should return the number as a string when not divisible by three and five". Same feedback: use a concrete example (7).
10. "should throw number out of range when input is greater than 100". Good behavior description, but put it in a `describe` with inner `it`s like "throws number out of range for 102". Implementation throws a new error, which is fine. The student correctly wrapped the call in a function for the throw assertion.
11. The opposite bound (below range), with the same feedback.
12. **End result:** refactored to `it.each` groups (prompted by the checklist asking for `it.each`). Khalil: "I want to see tests looking more like this."

```ts
// reconstructed from narration — Khalil's suggested structure
describe("fizzBuzz", () => {
  describe("returns 'FizzBuzz' when divisible by both three and five", () => {
    it("returns 'FizzBuzz' for 15", () => {
      expect(fizzBuzz(15)).toBe("FizzBuzz");
    });
    it("returns 'FizzBuzz' for 45", () => {
      expect(fizzBuzz(45)).toBe("FizzBuzz");
    });
  });

  it("returns '43' for 43", () => {
    expect(fizzBuzz(43)).toBe("43");
  });

  describe("throws number out of range when greater than 100", () => {
    it("throws number out of range for 102", () => {
      expect(() => fizzBuzz(102)).toThrow();
    });
  });
});
```

```ts
// reconstructed from narration — avoid else: early-return ifs
export function fizzBuzz(num: number): string {
  if (num > 100) throw new Error("Number out of range"); // message (inferred)
  const isDivisibleByThree = num % 3 === 0;
  const isDivisibleByFive = num % 5 === 0;
  if (isDivisibleByThree && isDivisibleByFive) return "FizzBuzz";
  if (isDivisibleByThree) return "Fizz";
  if (isDivisibleByFive) return "Buzz";
  return String(num);
}
```

## Diagrams / visual models described
- The PR description contained the grading checklist with items checked off ("really nice, clean UX").

## Notable quotes
- "I always try to avoid else statements as much as possible."
- "When we introduce conditionals like this, we create more code paths."
- "One it, one expect. No more. One it, one expect. And that's the rule."
- "You want to use examples to avoid abstract technical language."
- "Abstract tests lead to you doing things twice in the same test."
- "Rules are meant to be broken as well, especially if it helps you go faster."

## Cross-references
- Lesson 45 (FizzBuzz demo: fake it, `it.each`)
- Lesson 46 (FizzBuzz review #1)
- "Five tips to name your tests" module (referenced, earlier in the course)
- Lesson 44 (commit messages per phase)

## Fluff skipped
Greeting, sign-off, reading the PR header.

## AI-era relevance hint
- AI-generated tests often pack several asserts into one test with abstract names. "One it, one expect" plus concrete names makes failures traceable.
- Asking agents for guard-clause style (no `else`) keeps generated code paths flat and easier to review.

## Coverage proof
- Lines read: 80 / 80
- Final line (verbatim): "Right. Now that's it. So next video, as always to mastery."
