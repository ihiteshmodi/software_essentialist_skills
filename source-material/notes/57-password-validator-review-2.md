# Lesson 57 — Discussion: Password Validator Review #2
- **Source file:** 57) Discussion Password Validator Review #2.txt
- **Category:** kata-review
- **Topics:** code-review, password-validator, toContain, fake-it, triangulation, it.each, parameterization, encapsulate-what-varies, typescript-interfaces, roles, union-types, function-vs-static-method, one-test-at-a-time, rule-of-three

## Summary
Khalil reviews Tim's Password Validator. He likes it overall: behavior-focused test names without concrete examples in the names (fine, because the functionality is well expressed), `toContain` for error assertions, a plain function, a fake-it first commit and very small transformations. He explains two triangulation styles. Tim chose one example per feature and moved breadth-first through features, instead of stacking many examples on one feature. He praises the strictly typed response interface, which turns the return object into a **role** with a union-typed `errors` array. The main next step is to refactor the duplicated tests into `it.each` parameterization that encapsulates what varies (input data + resulting errors), then add many more examples.

## Core ideas
- Test names without concrete examples are acceptable when the functionality is well expressed, e.g., if you're doing several examples at once.
- `toContain` is a very good API for error assertions. Khalil wonders whether his demo could have been simpler with it, then concludes his mapping approach was probably the only way for his case.
- Duplication in test code counts too. Once you see it three times, refactor to `it.each` so the higher-level functionality is expressed more tersely.
- Leading with separate tests of examples is a great way to **begin**. Refactor afterwards.
- A fake-it first commit is ideal.
- Choosing a **function** keeps the solution "as close to the essential complexity as required" because there's no instance to create. With a class you'd use a static method.
- **Classes have two purposes**. One is to act as a **service provider**, a place to run behavior. (The other is not stated here.)
- **Triangulation**, two ways:
  1. One concrete example per responsibility/feature, then move to the next feature (breadth-first). Tim chose this.
  2. One feature, then more and more examples to strengthen it (depth).
  - "Responsibility," "feature" and "behavior" are synonyms here.
- Adding more examples will create lots of duplication, which pushes you toward `it.each`.
- **Strictly typed response interface** = making a **role** out of the return object's structure. If the function doesn't return that shape, it's invalid. This makes code more stable and minimizes the surface area for mistakes.
- Interfaces can be composed from smaller parts (e.g., an `errors` type that is a union like `InvalidLength | MissingDigit`, used as an array).
- `interface` or `type` both work. That's a TypeScript detail.
- Commit evidence showed one test at a time: the new uppercase test forced Tim to update older test inputs (add uppercase letters) so they kept passing.
- The final multi-error test name could be more precise: "missing digit and missing uppercase letter."

## Named frameworks / mental models
- **Triangulation strategies**
  - Breadth: one example per feature, then next feature.
  - Depth: one feature, many examples.
  - When: either is valid. Breadth fleshes out responsibilities fast. Depth strengthens one abstraction.
- **Encapsulate what varies (in tests)**: tie input data and expected errors together as rows in an array for `it.each`.
- **Types/interfaces as roles**: a type describes the role an object plays and constrains what the function may return.
- **Two purposes of classes**: one is service provider (static methods).
- **Rule of three in tests**: refactor duplicated tests after three occurrences.

## Definitions
- **Triangulation** — using examples to drive out behavior, either one per feature across many features or many per feature.
- **Role** — an abstract description (interface/type) of the shape an object must conform to.
- **Service provider** — a class used just as a place to run behavior (static methods), no instance state.

## Rules & heuristics
- Prefer a function or static method for stateless work. Don't instantiate.
- Start with a fake-it commit and keep transformations tiny.
- Use `toContain` to assert on errors in a collection.
- When the same test shape appears three times, refactor to `it.each`.
- Put inputs and expected errors together in the parameter rows.
- Strictly type the response object (interface or type). Compose it from smaller types (union error types in an array).
- Name multi-error tests after the exact error combination.
- After refactoring, add many more examples to cover every combination "in a more organized clear way."

## Anti-patterns / mistakes called out
- Many near-duplicate standalone tests left un-parameterized. Not wrong, but the next refactor is needed.
- Slightly vague multi-error test naming ("without a digit or an uppercase letter" vs "missing digit and missing uppercase letter").

## Code discussed
**Tim's test names (final file):**
- "returns error for short password"
- "returns error for long password"
- "returns true for password between 5 and 15 characters containing a digit and an uppercase letter"
- "returns error for password without a digit"
- "returns error for password without an uppercase letter"
- "returns errors for long password without a digit or an uppercase letter" (multiple)
- "returns errors for long password with a digit without an uppercase letter" (more examples)
- Assertions use `toContain` for error types: invalid length, missing digit, missing uppercase.

**Commit walk-through:**
1. Fake it: simple hard-coded return. Praised.
2. "returns an error for a long password": the object shape (result + errors) was already sculpted, maybe from the demo or from thinking backwards.
3. "returns true for password between 5 and 15": no example in the name, which is OK. Expects `true` and no errors. Transformation: check length, return one object or the other.
4. "returns an error for password without a digit".
5. Response type strictly typed via an `interface`, with `errors` as an array of union error types.
6. "returns error for password without an uppercase letter" + an updated "returns true…" test. Older tests' inputs were modified to include uppercase letters so they still pass. Error union extended. A simple helper function checks uppercase.
7. Final: multi-error tests.

```ts
// reconstructed from narration
type PasswordError = "InvalidLength" | "MissingDigit" | "MissingUppercase"; // names (inferred)

interface PasswordValidationResult { // interface name (inferred)
  result: boolean;
  errors: PasswordError[];
}

export function validatePassword(password: string): PasswordValidationResult { // function name (inferred)
  // ...
}
```

**Suggested refactor (from Khalil's demo):**

```ts
// reconstructed from narration
it.each([
  ["<long no digit no upper>", ["InvalidLength", "MissingDigit", "MissingUppercase"]],
  ["<no uppercase>", ["MissingUppercase"]],
])("returns errors for '%s'", (input, expectedErrors) => {
  const output = validatePassword(input);
  expectedErrors.forEach((e) => expect(output.errors).toContain(e));
});
```

## Diagrams / visual models described
- PR files-changed and per-commit diffs. No diagrams.

## Notable quotes
- "There is not concrete examples in here. However, I'm not mad at that because the functionality is well expressed."
- "To contain is a very good API, by the way."
- "Just a very simple fake it. We like to start out with those."
- "Classes have two purposes. And one of those purposes is to act as a service provider."
- "You've just created a role out of that."
- "You can minimize the surface area for making mistakes by doing this type of thing."
- "Encapsulate what varies, and what varies is the input data and the resulting errors."

## Cross-references
- Lesson 55 (Password Validator emergent demo, `it.each` refactor)
- Lesson 56 (Password Validator Review #1)
- Lesson 45 (fake it, rule of three)
- Lesson 79 (interfaces, abstract classes, concretions)
- Lesson 38 (RDD, roles)

## Fluff skipped
Greeting, "I like this stuff" reactions, sign-off and STT noise at end.

## AI-era relevance hint
- Strict return types act as guardrails. Agent-generated code that drifts from the contract fails at compile time.
- Knowing breadth vs depth triangulation helps you ask an agent for the right next test instead of a big batch.
- Refactoring duplicated agent-written tests into parameterized tables keeps suites maintainable as coverage grows.

## Coverage proof
- Lines read: 78 / 78
- Final line (verbatim): "right here. And let's jump into the next ones. 잘못. We'll see you next time. n 3 1 Thank you."
