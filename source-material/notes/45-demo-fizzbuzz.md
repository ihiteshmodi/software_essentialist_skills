# Lesson 45 — Demo: FizzBuzz
- **Source file:** 45) Demo FizzBuzz.txt
- **Category:** kata-demo
- **Topics:** tdd, red-green-refactor, fake-it, obvious-implementation, rule-of-three, commit-per-phase, it.each, test-refactoring, emergent-design, upfront-design, stateless-guess-point

## Summary
Khalil demonstrates the FizzBuzz kata live with strict red-green-refactor, committing on every phase shift (red, green, refactor). He deliberately uses the "fake it" strategy for every test (hard-coding return values and `num === N` checks) until he sees the same duplication three times, and only then refactors to an `isMultipleOfThree` abstraction using modulo. He shows that refactoring applies to tests too: three separate "Fizz" tests (3, 6, 9) get merged into one `it.each` that states the higher-level behavior "returns Fizz for multiples of three". He stops partway through and leaves the rest (Buzz multiples, FizzBuzz for both, other checklist items) for the student.

## Core ideas
- Skills this assignment checks: red-green-refactor, spotting duplication and refactoring it away, choosing fake it vs obvious implementation to transform code, and committing on red, green and refactor.
- Use the grading checklist as your spec. Khalil suggests copying it straight into the test file to get started.
- Red has to fail **for the right reason**. A missing function or missing import is a compilation failure, not a logical one. Create the exported function stub and import it first, so the test fails on logic.
- To get to green, always pick the **simplest transformation** that works. For the first test that means just returning `"Fizz"`.
- Keep faking until faking stops working, meaning until duplication shows up three times. Khalil says he is "pretty strict" about this.
- Ignore duplication while in red or green. You only deal with it in the refactor phase.
- After each green, go into the refactor phase and ask: "Do I see anything three times?" If not, move on to the next test.
- Upfront vs emergent design: some upfront knowledge ("Fizz for multiples of 3, Buzz for multiples of 5, FizzBuzz for both") can shape which abstraction you pick when you finally refactor. Developers sometimes get stuck here.
- If a simple transformation works (moving the `15` check above the multiple-of-3 check), accept it. If you want the functionality fleshed out more, write more tests. Many examples "stress the abstraction" and force it to be good.
- Refactor tests as well as production code.
- Khalil prefers starting from concrete examples and letting functionality emerge. He wraps them into a higher-level description later, during refactor. The other option is to start with the high-level `describe`/`it.each` and fill in examples.
- Don't add new examples during a refactor step. He resisted adding `12` to the `it.each` for this reason. Adding `6` happened while green, before the refactor (see Code discussed).

## Named frameworks / mental models
- **Red-Green-Refactor with commit-per-phase**
  - Purpose: build the mechanical TDD muscle for the emergent-design section.
  - Steps: write one failing test that fails for a logical reason, commit ("red: …"). Make it pass with the simplest transformation, commit ("green: …"). Look for duplication three times, refactor if found, commit ("refactor: …").
  - When: all emergent-design section assignments (FizzBuzz, Palindrome).
- **Fake it vs Obvious implementation** (transformation strategies)
  - Fake it: return the hard-coded expected value or add a hard-coded conditional.
  - Obvious implementation: write the real logic directly when you're confident.
  - When: fake it while you can, especially on more complex problems.
- **Rule of three**: refactor only once the same duplication appears three times.
- **Upfront design vs emergent design**: upfront knowledge of the problem guides which abstraction to pick. Emergent design lets that abstraction fall out of the tests.

## Definitions
- **Fake it** — the simplest transformation: return exactly what the test asks for (e.g., `return "Fizz"`) or add a hard-coded branch.
- **Refactor phase** — the phase after green where you look for duplication (three occurrences) and turn it into an abstraction, for both production code and tests.
- **Failing for the right reason** — failing because the logic is wrong, not because of a compilation or import error.

## Rules & heuristics
- Commit on every phase shift: red, green, refactor.
- Before committing red, make sure the failure is logical, not a compile error. Create the export stub and import first.
- Choose the simplest possible transformation to get to green.
- Keep faking until you see duplication three times.
- Don't worry about duplication in red or green phases.
- Don't add new examples during a refactor step.
- Group related examples under a name that states the higher-level behavior (`it.each` with a behavior description).
- All outputs must be strings (the assignment requires string return values).

## Anti-patterns / mistakes called out
- Committing red when the test only fails because the function doesn't exist or isn't imported.
- Refactoring before duplication appears three times.
- Adding examples in the refactor step.
- Getting stuck at the refactor step for lack of upfront understanding of the problem's concepts (implied).

## Code discussed
**Setup:** `git checkout -b` with a FizzBuzz demo branch, `npm install`, run tests in watch mode.

**Test / implementation evolution (in order):**
1. **Red:** test "returns Fizz for 3". It first failed for the wrong reason (function missing), so Khalil created `export function fizzBuzz(input)` and imported it into the spec. The watcher needed a restart. Once it failed logically: commit `red: returns Fizz for 3`. He noted the checklist wants string returns and added "returns a string" to the description (inferred wording).
2. **Green:** fake it with `return "Fizz"`. Commit `green: returns Fizz for 3`.
3. **Red:** "returns Buzz for 5". Commit.
4. **Green:** `if (num === 3) return "Fizz"; return "Buzz";`. Commit. In refactor phase, no duplication yet.
5. **Red:** "returns FizzBuzz for 15" (copied an existing test and noticed test duplication, but ignored it for now). Commit.
6. **Green:** `if (num === 15) return "FizzBuzz";`. Khalil calls this completely fine because it's fake it. Commit. In refactor phase, each conditional appears only once or twice, so he leaves it.
7. **Red:** "returns Fizz for 9". Commit.
8. **Green:** `if (num === 9) return "Fizz";`. Commit.
9. **Refactor (first real one):** he now sees three occurrences of the `num === …` pattern and extracts the concept of "multiple of three":
   - `const isMultipleOfThree = num % 3 === 0;` He temporarily `console.log`s it to check the outputs (true for 3, false for 5, true for 15, true for 9), then removes the log.
   - Replaced the `3` and `9` checks with `if (isMultipleOfThree) return "Fizz";`.
   - Bug: 15 now returned "Fizz" because the multiple-of-three check ran first. Simplest fix was to move the `15` check above it. Green. Commit as refactor ("added isMultipleOfThree").
10. **Test refactor:** the next checklist examples were 43, 42, 45. Instead, Khalil grouped the "Fizz" tests, added a "returns Fizz for 6" test (passed while green), then merged 3, 6 and 9 into one `it.each([3, 6, 9])` titled "returns Fizz for multiples of three". He commented out the old tests and then deleted them. He did not add `12` because he was in refactor. Commit as refactor.
11. **Stopped.** Left for the student: Buzz multiples of five, the "both" concept, `it.each` for the rest, remaining checklist items.

```ts
// reconstructed from narration
export function fizzBuzz(num: number): string {
  const isMultipleOfThree = num % 3 === 0;
  if (num === 15) return "FizzBuzz"; // moved above to fix 15 -> "Fizz"
  if (isMultipleOfThree) return "Fizz";
  return "Buzz";
}
```

```ts
// reconstructed from narration
import { fizzBuzz } from "./fizzbuzz"; // path (inferred)

describe("fizzbuzz", () => { // describe title (inferred)
  it.each([3, 6, 9])("returns 'Fizz' for multiples of three", (num) => {
    expect(fizzBuzz(num)).toBe("Fizz");
  });

  it("returns 'Buzz' for 5", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  });

  it("returns 'FizzBuzz' for 15", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });
});
```

## Diagrams / visual models described
- Grading checklist on screen, used as a spec (copied into the test file).

## Notable quotes
- "It's not failing for a compilation error. It's failing because of a logical reason. So that's good."
- "What is the simplest possible transformation I could do here? That's going to be to merely fake it."
- "We can continue to fake it for some time until we see duplication three times. And I'm going to be pretty strict about that."
- "I'm going to temporarily ignore that. Because I'm not in the phase where I should be concerned about duplications."
- "If you want more fleshed out functionality, we write more tests."
- "We can also refactor our tests as well. It's not just the production code."
- "Because we're in the refactor step, I shouldn't be adding more examples."

## Cross-references
- Lesson 44 (How & when to commit in red-green-refactor)
- Lesson 43 (Getting started with testing assignments)
- Lessons 46–47 (FizzBuzz reviews)
- Lesson 52 (FA²STR upfront + emergent design at the stateless guess point)
- Transformation priority premise (mentioned later in this module)

## Fluff skipped
Greeting, npm and branch setup chatter, repeated "thanks for listening" sign-off.

## AI-era relevance hint
- AI agents tend to jump straight to the obvious implementation. Knowing when to fake it and grow the code through tiny steps helps you steer them toward small, verifiable diffs.
- A commit per phase gives a readable audit trail that makes AI-generated changes reviewable.
- "Fails for the right reason" is a quick check that AI-written tests actually test logic and aren't just failing on compile errors.

## Coverage proof
- Lines read: 86 / 86
- Final line (verbatim): "as always, Tim Asu. Thanks for listening. Thanks for listening. Thanks for listening."
