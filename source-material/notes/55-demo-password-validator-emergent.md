# Lesson 55 — Demo: Password Validator, Part 2 (Emergent Design)
- **Source file:** 55) Demo Password Validator - Part 2 (Emergent Design).txt
- **Category:** kata-demo
- **Topics:** fa2str, emergent-design, specify-test-refine, think-backwards, arrange-act-assert, it.each, parameterization, nested-describe, commit-on-green, one-test-at-a-time, toContain, order-independent-assertions, levels-of-abstraction, password-validator

## Summary
Khalil does the emergent half (Specify, Test, Refine) of Password Validator. He writes each test backwards (assert → act → arrange), uses `PasswordValidator.validate` as a stateless static method, and from this section onward commits only on green or after a refactor, no longer on red. He builds the length feature with three examples, then refactors them into an `it.each` table (input, expected result, expected errors) nested under a `describe` that names the higher-level behavior. He repeats this for the "contains at least one digit" feature. He then adds a "detect multiple errors" feature and fixes an order-dependent assertion by checking that each returned error is contained in the expected list. He explains the layered-abstraction view of tests: specification → concrete examples → test code → production code.

## Core ideas
- Specify tests **backwards**: write the assert first. Then the act and arrange follow, and here they are the same line.
- Naming matters even for local variables: `result.result` read badly, so he renamed the variable to `output` (`output.result`, `output.errors`).
- Stateless class, so no `new PasswordValidator()`. The static call is both arrange and act.
- The first red failed for the wrong reason (nothing existed yet). The watcher sometimes needs a refresh when a new file is created.
- **No more committing on red** from this section on. The emergent-design section did red/green/refactor commits. Now commit on green (and after refactors).
- **One test at a time**: he pre-wrote the next three tests but commented them out and uncommented one at a time.
- Choose examples upfront that isolate one rule at a time. E.g., a digit example that also satisfies the length rule, so only the rule under test matters.
- Some new tests pass immediately because the current code already handles them (valid length, not yet checking digits). That's fine.
- Refine step: once a feature has several examples, make the **higher-level behavior visible** in the tests with `it.each` parameterization and a nested `describe`.
- **Levels of abstraction in tests**: specification (highest) → concrete examples → test code → production code (terminal level). "You always have a higher level of policy that's describing what is happening." At later guess points the production code itself gets more layers.
- **Read between the lines** for features. "Detect multiple errors" is only implied by the problem statement ("all errors in occurrence"). Focus on higher-level behavior, not implementation details.
- One example at a time is the default. Taking more examples at once is OK if you're confident, but it forces more complex transformations.
- Assertions shouldn't depend on implementation details like the order errors are pushed in. Write the expected errors in a different order on purpose to prove the test doesn't care.
- He stopped before the uppercase feature ("it's pretty much just typing"). Student solutions in later reviews are more complete.

## Named frameworks / mental models
- **FA²STR emergent half: Specify → Test → Refine**
  - Specify: write the test backwards (assert, act, arrange).
  - Test: make it pass with the simplest transformation, commit on green.
  - Refine: refactor tests/prod, e.g., parameterize with `it.each` and nest under a behavior `describe`. Commit.
- **Feature → Examples → Test code → Production** (levels of abstraction)
  - The spec/feature name is the policy. Examples make it concrete. Test code realizes the examples. Production code is the terminal realization.
- **Commit cadence (stateless section onward)**: red → green → commit, and refactor → commit.
- **One example at a time** as the default triangulation pace.

## Definitions
- **Parameterization** — expressing several examples of one behavior as a data table (`it.each`) run against one test body, with substitution (`%s`) in the name.
- **Higher-level behavior / feature** — what the system does (e.g., "detect multiple errors"), as opposed to how.
- **Strict equals** — the equality assertion he used for the errors array (`toStrictEqual`, inferred). It is order-sensitive.

## Rules & heuristics
- Write the assert first, then act, then arrange.
- Rename variables until the test reads well (`output.result`, not `result.result`).
- From the stateless section on, don't commit on red. Commit on green and on refactor.
- Write one test at a time. Comment out pre-written future tests.
- Pick examples that isolate the rule under test.
- Once a feature has multiple examples, refactor to `it.each` and nest under a `describe` that names the behavior.
- Include the expected errors in the example data (input, result, errors) so what varies lives in one place.
- Don't assert on order unless order is a requirement. Assert containment for each error.
- Features might only be implied. Learn to read between the lines.
- Default to one example at a time. More at once means more complex transformations.

## Anti-patterns / mistakes called out
- Test failing for the wrong reason (missing implementation or file) when first created.
- Forgetting to pass the input argument while writing the test, which showed up as errors.
- A copied test that kept the wrong expected `result` (truthy instead of `false`). Copy-paste errors in tests.
- Forgetting a commit. "Not the end of the world," so he folded it into the next commit.
- Order-dependent assertion (`toStrictEqual` on an errors array) coupling the test to push order in production code.

## Code discussed
**Test/implementation evolution (in order):**

1. **Spec 1, success (valid password).** Example string given as [Jamie] (probably a valid password, exact value unclear). Written backwards:
   - `const output = PasswordValidator.validate("<valid>")`. Variable renamed from `result` to `output`.
   - `expect(output.result).toBeTruthy()`, and errors empty (`toHaveLength(0)`, inferred).
   - Red, for the wrong reason at first. Green: `return { result: true, errors: [] }`. **Commit.**
2. **Spec 2, failure: invalid length.** Expect exactly one error, `output.errors[0]` equals "InvalidLength" [transcribed "Invalid way"]. No commit on red.
   - Green: pulled `errors` into its own array, added an "is between 5 and 15" conditional that pushes the error when not between, and returned `result: false` when there are errors. Found that he hadn't passed the input characters. **Commit.**
3. **Spec 3, failure: invalid length (another example).** Same behavior, passes. Committed ("submit").
4. **Refine:** parameterized the length examples with `it.each`: columns input string, expected `result` (true/false), expected `errors` array. `%s` substitution for the input and the true/false. Assertions on `output.errors` (length and content) and `output.result`. Then moved the behavior description into a nested `describe` so the output reads as behavior, then examples. **Commit** ("refactored the first feature, expressed it using parameterization instead").
5. Removed leftover stuff and committed. Pre-wrote the next three digit tests and commented them out.
6. **Spec 4, digit success ([little eight], e.g. a lowercase word with an 8, inferred).** Expect `result` true and no errors. Passes immediately because length is valid and digits aren't checked yet.
7. **Spec 5, digit failure.** Expected error "NoDigitIncluded", not invalid length. Fails (no error returned). Green:
   - Split password into chars, find one that is a number (logged to check: prints the digit or `undefined`), compare `!== undefined`.
   - `if (!hasDigits) errors.push("NoDigitIncluded")`.
   - The copied test still had truthy `result`. Fixed to `false`. **Commit** (includes the missed previous commit).
8. **Spec 6, digit failure ([Maxwell B], no digit).** Same shape as spec 5, passes. **Commit.**
9. **Refine:** same `it.each` + nested `describe` refactor for the digit feature (examples, result, errors array). Structure: feature → examples → test code → production.
10. **Feature: detect multiple errors.** Examples with both invalid length and no digit (uppercase skipped). Expected errors deliberately listed in a different order from the push order (e.g., `["NoDigitIncluded", "InvalidLength"]`). A long no-digit password as the second example.
    - Failed on `toStrictEqual` because of ordering.
    - Fix: `output.errors.forEach(error => expect(expectedErrors).toContain(error))`, making the assertion order-independent.
11. Stopped. Uppercase feature and the rest left to the student.

```ts
// reconstructed from narration
type PasswordError = "InvalidLength" | "NoDigitIncluded" | "MissingUppercase"; // names (inferred)

export class PasswordValidator {
  static validate(password: string) {
    const errors: PasswordError[] = [];
    const isBetween = password.length >= 5 && password.length <= 15;
    if (!isBetween) errors.push("InvalidLength");

    const hasDigits =
      password.split("").find((char) => !isNaN(Number(char))) !== undefined; // exact check (inferred)
    if (!hasDigits) errors.push("NoDigitIncluded");

    return { result: errors.length === 0, errors };
  }
}
```

```ts
// reconstructed from narration
describe("password validator", () => {
  describe("knows that passwords must be between 5 and 15 characters", () => { // wording (inferred)
    it.each([
      ["<valid>", true, []],
      ["<too short>", false, ["InvalidLength"]],
      ["<too long>", false, ["InvalidLength"]],
    ])("knows that '%s' should return %s", (input, result, errors) => {
      const output = PasswordValidator.validate(input);
      expect(output.result).toBe(result);
      expect(output.errors).toHaveLength(errors.length);
      expect(output.errors).toStrictEqual(errors);
    });
  });

  describe("can detect multiple errors", () => { // wording (inferred)
    it.each([
      ["<short no digit>", false, ["NoDigitIncluded", "InvalidLength"]],
      ["<long no digit>", false, ["NoDigitIncluded", "InvalidLength"]],
    ])("knows that '%s' has multiple errors", (input, result, expectedErrors) => {
      const output = PasswordValidator.validate(input);
      expect(output.result).toBe(result);
      output.errors.forEach((error) => expect(expectedErrors).toContain(error));
    });
  });
});
```

## Diagrams / visual models described
- Test runner output before and after nesting: flat "knows that…" lines vs. a nested behavior heading with examples underneath. He prefers the nested version.
- Verbal layer model: specification → concrete examples → test code → production code.

## Notable quotes
- "I'm specifying the test out and I'm doing it backwards."
- "I'm not going to commit on red because we're not going to do that anymore."
- "One thing I could do now to refine this is to make the higher level behavior actually evident in the test code."
- "You always have a higher level of policy that's describing what is happening."
- "You have to develop this ability to read between the lines and find the features themselves."
- "We always want to focus on that higher level behavior, not so much on the implementation details."
- "I don't really care about the order. I just care about the fact that these are getting returned in general."

## Cross-references
- Lesson 54 (Part 1, upfront design)
- Lesson 44 (commit cadence in red-green-refactor, now changed to commit on green)
- Lesson 45 (FizzBuzz `it.each` refactor)
- Lesson 51 (AAA backwards, wishful thinking)
- Lesson 14 (Essential abstraction, levels of abstraction)
- Lessons 56–57 (Password Validator reviews)

## Fluff skipped
Greeting, file-refresh fiddling, closing "to mastery" and trailing STT noise.

## AI-era relevance hint
- `it.each` tables with input, expected result and expected errors make a compact, reviewable spec that an agent can extend and a human can check at a glance.
- Order-independent assertions stop brittle tests that break when an agent restructures the implementation.
- The spec → examples → test → production layering gives a checklist for reviewing AI output top-down, starting at the "what."

## Coverage proof
- Lines read: 107 / 107
- Final line (verbatim): "I'll see you in the next video. , , . . . . . ."
