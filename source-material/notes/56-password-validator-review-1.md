# Lesson 56 — Discussion: Password Validator Review #1
- **Source file:** 56) Discussion Password Validator Review #1.txt
- **Category:** kata-review
- **Topics:** code-review, password-validator, fa2str, test-naming, decouple-what-from-how, responsibilities, rdd, knowing-and-doing, encapsulate-what-varies, it.each, static-method, strict-typing, commit-on-green, concrete-examples-first

## Summary
Khalil reviews a Password Validator pull request. He restates the assignment's three focus areas: think through the solution with FA²STR, work backwards (AAA backwards), and design an easy API with program-by-wishful-thinking. The student's features at the top of the tests are really **responsibilities** (a term from Responsibility-Driven Design). The main feedback is test naming. Names like "sets result to true and error to null when…" are too technical and describe how, not what. They should read like "can detect valid passwords" or "knows that…". Other feedback: no need to instantiate a stateless class, praise for strictly typing `ValidationResult` on the fly, a bug where "too long" tests still say "too short" (fix: encapsulate what varies by putting the error reason in the `it.each` data), and lead with one concrete example before refactoring to `it.each`.

## Core ideas
- Assignment focus: FA²STR (upfront + emergent), think backwards, program by wishful thinking. Function or stateless class with a static method.
- Doing it purely emergently from the grading checklist is fine. Just be aware you can do it upfront too.
- In Find, you find **responsibilities** and **examples that exhaust those responsibilities**. Khalil also calls them "higher-level behavior" or "features," but prefers "responsibilities" from Responsibility-Driven Design, "the most influential design method in the object-oriented world."
- **Decouple the what from the how.** The test spec (theoretical, "what needs to happen," from BDD) shouldn't contain implementation details (physical, "what actually gets done"). The how can change while the what stays the same.
- Commit cadence from the stateless section on: red → green → (refactor) → commit. No more committing on red.
- **Create a type on the fly**: once you notice you've invented a concept or data structure, strictly type it instead of returning loose data.
- Naming smell: `validator.validate`, `lineReader.readLine`. People mock OO programmers for this. It usually means the abstraction could be a **service provider**, a stateless object.
- **Encapsulate what varies**: the validation message varies between examples, so put it into the input data. Hard-coded strings in names and assertions invite mismatches like "too short" appearing in "too long" tests.
- Test name format "knows that…" / "does…". Responsibilities are **knowing and doing**.
- Lead each new responsibility (e.g., multiple errors) with **one concrete example**. It forces the test to express what the responsibility is. Add and refactor more later.
- Different implementations are fine if the what is expressed. The student joined errors into a single string. Khalil used an array. "Who's is better, mine or yours? It doesn't actually matter" because both do the high-level job. This is why separating what from how matters.

## Named frameworks / mental models
- **Responsibilities (RDD): knowing & doing**
  - Purpose: name the high-level capabilities of the system and phrase test specs around them.
  - Format: "knows that…", "can…", "does…".
  - When: Find step, and whenever you name tests/describes.
- **Decouple the what from the how**
  - What: behavior/spec (theoretical). How: implementation (physical).
  - When: naming tests, commits, specs.
- **Encapsulate what varies**
  - Put the parts that vary per example (password + reason/error) together in the data table, then substitute into names and assertions.
- **Concrete examples first → then `it.each`**
  - Start with one concrete example per responsibility, refactor to parameterization once duplication appears. If you start with `it.each`, the spec name must carry the responsibility.

## Definitions
- **Responsibility** — something the system knows or does. A high-level feature of the stateless system.
- **Service provider** — a stateless object (class with static methods) that exists just to run behavior. Suggested when names like `validator.validate` appear.
- **What vs how** — the behavior the spec promises vs. the implementation details that realize it.

## Rules & heuristics
- Don't instantiate a class for stateless work. Use a static method or a function.
- Name tests in human language, without technical internals (keys, null, flags).
- Specs describe the what. The how belongs in the test body.
- Use the "knows that… / does…" format.
- Strictly type data structures you invent (e.g., `ValidationResult`).
- Put the varying expectation (error reason) into the example data. Use substitution (`%s`) in names.
- Lead with one concrete example per responsibility. Refactor to `it.each` later.
- If you use `it.each` from the start, the test name must state the responsibility clearly.
- Optionally wrap `it.each` blocks in a `describe` per responsibility.
- Make commit messages express behavior too ("valid password…"), not "result true, error null".

## Anti-patterns / mistakes called out
- `new PasswordValidator()` for a stateless assignment.
- Technical test names: "sets result to true and error to null when password is …" is hard to read and couples the spec to implementation.
- "sets result to false and error to too short when password is less than five characters": mentions the `error` key and the `false` flag.
- Low-level commit message: "return result as true and error as null on valid password."
- Copy-paste bug: "too long" tests still named/asserting "too short". Caused by hard-coded, un-encapsulated messages.
- "sets result to false and error to needs an uppercase character when password does not contain an uppercase character": includes irrelevant how (the `false`).
- `x.validate`-style redundant naming (a mild smell).

## Code discussed
**Student PR, final test file:**
- A list of features/responsibilities at the top.
- Tests create `new PasswordValidator()`. Feedback: unnecessary, use a static method.
- `validate` returns a strictly typed `ValidationResult` with `result` and `error` keys. Praised.

**Test name rewrites (before → after):**
- "sets result to true and error to null when password is {…}" → "can detect valid passwords", with examples and `%s` substitution.
- "sets result to false and error to too short when password is less than five characters" → "fails with a too short error when less than five characters".
- "sets result to false and error to needs an uppercase character when password does not contain an uppercase character" → "knows that it needs an uppercase character when not included".
- Multiple-errors test "knows when multiple validation errors are included". Praised as a good expression.

**Commit walk-through:**
1. "add validate functionality that returns an object with result and error keys". Started with a function, gave it a type. OK.
2. "return result as true and error as null on valid password". Too low level. Suggest naming a concrete example, e.g., "valid password [X] returns…".
3. `ValidationResult` type introduced. Good practice.
4. Transformation for too short: `result` defaults to `true`, set to `false` with error "too short". "Ultimately your transformations are good." More test cases for too short.
5. Too long: many examples, but the message still said "too short" (bug).
6. Uppercase and multiple errors. Student joined multiple errors into a **single string**, not an array. Acceptable.

**Khalil's PR comment suggestion (encapsulate what varies):**

```ts
// reconstructed from narration
it.each([
  { password: "abc", reason: "too short" },       // example values (inferred)
  { password: "abcdefghijklmnop1A", reason: "too long" },
])("knows that '$password' is invalid because it is $reason", ({ password, reason }) => {
  const output = PasswordValidator.validate(password);
  expect(output.result).toBe(false);
  expect(output.error).toContain(reason); // exact API (inferred; Khalil unsure of exact syntax)
});
```

## Diagrams / visual models described
- Assignment page: problem description, examples and grading checklist on screen.
- PR "files changed" view and commit-by-commit diffs.

## Notable quotes
- "Responsibilities comes from responsibility-driven design, which is the most influential design method in the object-oriented world."
- "You want to decouple the how from the what. That's huge."
- "Because the how could change. But you still want the what to stay exactly the same."
- "Create a type on the fly once you start to notice that you've just invented some sort of abstraction."
- "You want to encapsulate what varies."
- "Responsibilities are just for doing and knowing."
- "Start with one concrete example, because it's going to force the way that you write this to be more expressive."

## Cross-references
- Lesson 38 (How to learn Responsibility-Driven Design)
- Lesson 44 (commit cadence)
- Lesson 51 (AAA backwards, wishful thinking)
- Lessons 54–55 (Password Validator demo)
- Lesson 57 (Password Validator Review #2)
- Lesson 79 (abstraction and levels of realness)

## Fluff skipped
Greeting, Discord/PR navigation chatter, "thanks for the PR", sign-off.

## AI-era relevance hint
- AI-written tests often have implementation-flavored names ("sets X to null…"). Rewriting them as responsibilities is a quick, high-value review step.
- "Encapsulate what varies" in test tables prevents the copy-paste mismatches agents often produce.
- Separating what from how lets you accept several valid AI implementations as long as the responsibility-level specs pass.

## Coverage proof
- Lines read: 102 / 102
- Final line (verbatim): "I'll see you in the next one to mastery as always, my friends."
